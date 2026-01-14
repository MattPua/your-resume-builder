import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export const exportToPDF = async (
	element: HTMLElement,
	filename = "resume.pdf",
) => {
	try {
		const canvas = await html2canvas(element, {
			scale: 1.5,
			useCORS: true,
			logging: false,
			backgroundColor: "#ffffff",
			width: element.offsetWidth,
			height: element.offsetHeight,
		});

		// Use JPEG with quality 0.85 for better compression
		const imgData = canvas.toDataURL("image/jpeg", 0.85);
		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "mm",
			format: "a4",
			compress: true,
		});

		const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
		const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

		// Convert canvas dimensions to mm
		// At 96 DPI: 1px = 0.264583mm, but canvas is scaled by 1.5
		// So actual element size in mm = canvas size / 1.5 * 0.264583
		const pxToMm = 0.264583;
		const actualWidthMm = (canvas.width / 1.5) * pxToMm;
		const actualHeightMm = (canvas.height / 1.5) * pxToMm;

		// Scale to fit PDF width (should be exact since preview is A4 width)
		const widthRatio = pdfWidth / actualWidthMm;
		const imgWidthMm = pdfWidth;
		const imgHeightMm = actualHeightMm * widthRatio;

		let heightLeft = imgHeightMm;
		let position = 0;

		// Add first page
		pdf.addImage(imgData, "JPEG", 0, position, imgWidthMm, imgHeightMm);
		
		// Add clickable links
		const links = element.querySelectorAll("a[href]");
		const elementRect = element.getBoundingClientRect();
		
		links.forEach((link) => {
			const href = (link as HTMLAnchorElement).href;
			if (!href) return;
			
			const linkRect = link.getBoundingClientRect();
			// Get position relative to element
			const relativeX = linkRect.left - elementRect.left;
			const relativeY = linkRect.top - elementRect.top;
			const linkWidth = linkRect.width;
			const linkHeight = linkRect.height;
			
			// Convert to mm (accounting for canvas scale)
			const xMm = (relativeX * pxToMm) * widthRatio;
			const yMm = (relativeY * pxToMm) * widthRatio;
			const widthMm = (linkWidth * pxToMm) * widthRatio;
			const heightMm = (linkHeight * pxToMm) * widthRatio;
			
			// Check which page(s) this link is on
			const linkTop = yMm;
			const linkBottom = yMm + heightMm;
			
			// Add link to first page if it's visible
			if (linkTop < pdfHeight) {
				pdf.link(xMm, linkTop, widthMm, Math.min(heightMm, pdfHeight - linkTop), {
					url: href,
				});
			}
		});
		
		heightLeft -= pdfHeight;

		// Add additional pages only if content actually exceeds one page
		// Use a small threshold (1mm) to avoid rounding errors creating extra pages
		let pageNumber = 1;
		while (heightLeft > 1) {
			position = -(imgHeightMm - heightLeft);
			pdf.addPage();
			pdf.addImage(imgData, "JPEG", 0, position, imgWidthMm, imgHeightMm);
			
			// Add links for this page
			links.forEach((link) => {
				const href = (link as HTMLAnchorElement).href;
				if (!href) return;
				
				const linkRect = link.getBoundingClientRect();
				const relativeX = linkRect.left - elementRect.left;
				const relativeY = linkRect.top - elementRect.top;
				const linkWidth = linkRect.width;
				const linkHeight = linkRect.height;
				
				const xMm = (relativeX * pxToMm) * widthRatio;
				const yMm = (relativeY * pxToMm) * widthRatio;
				const widthMm = (linkWidth * pxToMm) * widthRatio;
				const heightMm = (linkHeight * pxToMm) * widthRatio;
				
				// Calculate link position on this page
				const linkTopOnPage = yMm + position;
				const linkBottomOnPage = linkTopOnPage + heightMm;
				
				// Only add link if it's visible on this page
				if (linkTopOnPage >= 0 && linkTopOnPage < pdfHeight) {
					pdf.link(xMm, linkTopOnPage, widthMm, Math.min(heightMm, pdfHeight - linkTopOnPage), {
						url: href,
					});
				}
			});
			
			heightLeft -= pdfHeight;
			pageNumber++;
		}

		pdf.save(filename);
	} catch (error) {
		console.error("Failed to export PDF:", error);
		throw error;
	}
};
