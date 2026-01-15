import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export const exportToPDF = async (
	element: HTMLElement,
	filename = "resume.pdf",
) => {
	try {
		// 1. Setup PDF and constants
		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "mm",
			format: "a4",
			compress: true,
		});

		const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
		const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
		const pxToMm = 0.264583;

		// Determine the current scale of the preview (due to zoom/auto-scale)
		// This is critical for accurate link positioning
		const currentScale =
			element.getBoundingClientRect().width / element.offsetWidth;

		// Use a consistent internal scale for high-quality capture
		const captureScale = 2;
		const paddingMm = 8; // ~30px padding

		// 2. Identify and capture elements
		const headerElement = element.querySelector(
			"[data-pdf-header]",
		) as HTMLElement;
		const sectionsContainer = element.querySelector(
			"[data-pdf-sections-container]",
		) as HTMLElement;

		if (!sectionsContainer) {
			throw new Error("Could not find resume content to export");
		}

		// Capture Header
		let headerCanvas: HTMLCanvasElement | null = null;
		let headerHeightMm = 0;
		if (headerElement) {
			headerCanvas = await html2canvas(headerElement, {
				scale: captureScale,
				useCORS: true,
				backgroundColor: "#ffffff",
				logging: false,
			});
			headerHeightMm = (headerCanvas.height / captureScale) * pxToMm;
		}

		// Capture all content at once (much more stable than section-by-section)
		const contentCanvas = await html2canvas(sectionsContainer, {
			scale: captureScale,
			useCORS: true,
			backgroundColor: "#ffffff",
			logging: false,
		});
		const contentHeightMm = (contentCanvas.height / captureScale) * pxToMm;

		// 3. Helper for adding links
		const addLinks = (
			el: HTMLElement,
			pageYOffset: number,
			pageNum: number,
		) => {
			const links = el.querySelectorAll("a[href]");
			const elRect = el.getBoundingClientRect();

			for (const link of Array.from(links)) {
				const href = (link as HTMLAnchorElement).href;
				if (!href) continue;

				const linkRect = link.getBoundingClientRect();

				// Calculate position relative to the element, then adjust for scale and padding
				// We divide by currentScale because getBoundingClientRect() is already scaled by the browser
				const relX = (linkRect.left - elRect.left) / currentScale;
				const relY = (linkRect.top - elRect.top) / currentScale;

				const x = paddingMm + relX * pxToMm;
				const y = pageYOffset + relY * pxToMm;
				const w = (linkRect.width / currentScale) * pxToMm;
				const h = (linkRect.height / currentScale) * pxToMm;

				// Check if the link is actually visible on the current page
				if (y >= 0 && y < pdfHeight - paddingMm) {
					pdf.setPage(pageNum);
					pdf.link(x, y, w, h, { url: href });
				}
			}
		};

		// 4. Multi-page orchestration
		let heightRemaining = contentHeightMm;
		let canvasOffsetMm = 0;
		let pageNum = 1;

		const _availablePageHeight =
			pdfHeight - 2 * paddingMm - (headerHeightMm > 0 ? headerHeightMm + 4 : 0);

		while (heightRemaining > 0 || pageNum === 1) {
			if (pageNum > 1) {
				pdf.addPage();
			}

			let currentY = paddingMm;

			// Add Header to every page
			if (headerCanvas) {
				const headerImg = headerCanvas.toDataURL("image/jpeg", 0.95);
				pdf.addImage(
					headerImg,
					"JPEG",
					paddingMm,
					currentY,
					pdfWidth - 2 * paddingMm,
					headerHeightMm,
				);
				addLinks(headerElement, currentY, pageNum);
				currentY += headerHeightMm + 4; // Gap after header
			}

			// Calculate how much content fits on this page
			const sliceHeightMm = Math.min(
				heightRemaining,
				pdfHeight - paddingMm - currentY,
			);

			if (sliceHeightMm > 0) {
				// Create a slice of the content canvas
				const sliceCanvas = document.createElement("canvas");
				sliceCanvas.width = contentCanvas.width;
				sliceCanvas.height = (sliceHeightMm / pxToMm) * captureScale;

				const ctx = sliceCanvas.getContext("2d");
				if (ctx) {
					ctx.drawImage(
						contentCanvas,
						0,
						(canvasOffsetMm / pxToMm) * captureScale,
						contentCanvas.width,
						sliceCanvas.height,
						0,
						0,
						sliceCanvas.width,
						sliceCanvas.height,
					);

					const sliceImg = sliceCanvas.toDataURL("image/jpeg", 0.95);
					pdf.addImage(
						sliceImg,
						"JPEG",
						paddingMm,
						currentY,
						pdfWidth - 2 * paddingMm,
						sliceHeightMm,
					);

					// Approximate link positioning for the content slice
					// Since we captured the whole contentContainer, we can use it to find all links
					// and filter by the current vertical window
					const containerRect = sectionsContainer.getBoundingClientRect();
					const contentLinks = sectionsContainer.querySelectorAll("a[href]");

					for (const link of Array.from(contentLinks)) {
						const href = (link as HTMLAnchorElement).href;
						const linkRect = link.getBoundingClientRect();

						// Vertical position relative to the container, in mm
						const relYMm =
							((linkRect.top - containerRect.top) / currentScale) * pxToMm;

						// Check if this link falls within the current slice
						if (
							relYMm >= canvasOffsetMm - 1 &&
							relYMm < canvasOffsetMm + sliceHeightMm
						) {
							const relXMm =
								((linkRect.left - containerRect.left) / currentScale) * pxToMm;
							const linkWMm = (linkRect.width / currentScale) * pxToMm;
							const linkHMm = (linkRect.height / currentScale) * pxToMm;

							const x = paddingMm + relXMm;
							const y = currentY + (relYMm - canvasOffsetMm);

							pdf.setPage(pageNum);
							pdf.link(x, y, linkWMm, linkHMm, { url: href });
						}
					}
				}

				heightRemaining -= sliceHeightMm;
				canvasOffsetMm += sliceHeightMm;
			}

			pageNum++;

			// Safety break for extremely long content
			if (pageNum > 20) break;
		}

		pdf.save(filename);
	} catch (error) {
		console.error("Failed to export PDF:", error);
		throw error;
	}
};
