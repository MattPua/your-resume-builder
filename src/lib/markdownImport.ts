import type {
	EducationEntry,
	ExperienceEntry,
	ResumeData,
	SideProjectEntry,
	VolunteeringEntry,
} from "../types/resume";

const parseMarkdownLink = (text: string): { text: string; url: string } => {
	const match = text.match(/\[([^\]]+)\]\(([^)]+)\)/);
	if (match) {
		return { text: match[1], url: match[2] };
	}
	return { text, url: "" };
};

export const parseMarkdownToResumeData = (
	markdown: string,
): Partial<ResumeData> => {
	const lines = markdown.split("\n");
	const data: Partial<ResumeData> = {
		experience: [],
		education: [],
		sideProjects: [],
		volunteering: [],
		sectionsVisible: {},
		sectionTitles: {},
		name: "",
		email: "",
		phone: "",
		website: "",
		github: "",
		skills: "",
	};

	let currentSection:
		| "experience"
		| "background"
		| "sideProjects"
		| "volunteering"
		| "personal"
		| null = null;
	let currentItem:
		| ExperienceEntry
		| EducationEntry
		| SideProjectEntry
		| VolunteeringEntry
		| null = null;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (!line && currentSection !== "personal" && !currentItem) continue;

		// Parse Name (# Name)
		if (line.startsWith("# ") && !currentSection) {
			data.name = line.replace("# ", "").trim();
			continue;
		}

		// Parse Contact Info (Email | Phone | Website | GitHub)
		if (
			!currentSection &&
			(line.includes(" | ") ||
				line.includes("@") ||
				line.includes("http") ||
				line.includes("www") ||
				/[0-9]{3,}/.test(line))
		) {
			// If it looks like contact info but isn't a header
			if (!line.startsWith("#")) {
				const parts = line.includes(" | ")
					? line.split("|").map((p) => p.trim())
					: [line];
				for (const part of parts) {
					if (part.includes("@") && !data.email) {
						data.email = part;
					} else if (
						(part.includes("github.com") ||
							part.toLowerCase().includes("github")) &&
						!data.github
					) {
						data.github = part;
					} else if (
						(part.includes("http") || part.includes("www")) &&
						!data.website
					) {
						data.website = part;
					} else if (/[0-9]/.test(part) && !data.phone && part.length >= 7) {
						data.phone = part;
					}
				}
				if (line.includes(" | ")) continue; // If it was a multi-part line, we're done with it
			}
		}

		// Parse Sections (## Section Name)
		if (line.startsWith("## ")) {
			const title = line.replace("## ", "").trim();
			const lowerTitle = title.toLowerCase();

			if (
				lowerTitle.includes("experience") ||
				lowerTitle.includes("work") ||
				lowerTitle.includes("employment")
			) {
				currentSection = "experience";
				currentItem = null;
			} else if (
				lowerTitle.includes("education") ||
				lowerTitle.includes("skills") ||
				lowerTitle.includes("background") ||
				lowerTitle.includes("academic")
			) {
				currentSection = "background";
				currentItem = null;
			} else if (
				lowerTitle.includes("side projects") ||
				lowerTitle.includes("projects")
			) {
				currentSection = "sideProjects";
				currentItem = null;
			} else if (
				lowerTitle.includes("volunteering") ||
				lowerTitle.includes("volunteer")
			) {
				currentSection = "volunteering";
				currentItem = null;
			} else if (
				lowerTitle.includes("personal") ||
				lowerTitle.includes("about") ||
				lowerTitle.includes("interests")
			) {
				currentSection = "personal";
				currentItem = null;
				data.personal = { bulletPoints: "" };
			} else {
				currentSection = null;
				currentItem = null;
			}
			continue;
		}

		// Parse Items within Sections (### Title @ Company)
		if (line.startsWith("### ")) {
			const titleLine = line.replace("### ", "").trim();

			if (currentSection === "experience" && data.experience) {
				const [rawTitle, rawCompany] = titleLine
					.split("@")
					.map((s) => s.trim());
				const { text: company, url: companyUrl } = parseMarkdownLink(
					rawCompany || "",
				);

				const newItem: ExperienceEntry = {
					title: rawTitle || "",
					company: company || "",
					companyUrl,
					startDate: "",
					endDate: "",
					bulletPoints: "",
					visible: true,
				};
				data.experience.push(newItem);
				currentItem = newItem;
			} else if (currentSection === "background" && data.education) {
				const [rawDegree, rawInstitution] = titleLine
					.split("@")
					.map((s) => s.trim());
				const { text: institution, url: institutionUrl } = parseMarkdownLink(
					rawInstitution || "",
				);

				const newItem: EducationEntry = {
					degree: rawDegree || "",
					institution: institution || "",
					institutionUrl,
					startDate: "",
					endDate: "",
					bulletPoints: "",
					visible: true,
				};
				data.education.push(newItem);
				currentItem = newItem;
			} else if (currentSection === "sideProjects" && data.sideProjects) {
				const { text: title, url: titleUrl } = parseMarkdownLink(titleLine);
				const newItem: SideProjectEntry = {
					title,
					titleUrl,
					description: "",
					startDate: "",
					endDate: "",
					bulletPoints: "",
					visible: true,
				};
				data.sideProjects.push(newItem);
				currentItem = newItem;
			} else if (currentSection === "volunteering" && data.volunteering) {
				const [rawRole, rawOrganization] = titleLine
					.split("@")
					.map((s) => s.trim());
				const { text: organization, url: organizationUrl } = parseMarkdownLink(
					rawOrganization || "",
				);

				const newItem: VolunteeringEntry = {
					role: rawRole || "",
					organization: organization || "",
					organizationUrl,
					startDate: "",
					endDate: "",
					bulletPoints: "",
					visible: true,
				};
				data.volunteering.push(newItem);
				currentItem = newItem;
			}
			continue;
		}

		// Parse Dates (StartDate — EndDate)
		if (currentItem && (line.includes(" — ") || line.includes(" - "))) {
			const separator = line.includes(" — ") ? " — " : " - ";
			const parts = line.split(separator).map((s) => s.trim());
			if (parts.length >= 1) {
				const start = parts[0];
				const end = parts[1] || "";
				// Only treat as dates if it looks like dates (e.g. contains numbers or month names or 'Now'/'Present')
				const isDate = (s: string) =>
					/[0-9]/.test(s) ||
					/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|now|present/i.test(
						s,
					);
				if (isDate(start) || isDate(end)) {
					currentItem.startDate = start;
					currentItem.endDate = end;
					continue;
				}
			}
		}

		// Parse Skills in Background Section
		if (
			currentSection === "background" &&
			line.toLowerCase().includes("skills:")
		) {
			const skillsContent = line
				.replace(/\*\*Skills:\*\*/i, "")
				.replace(/Skills:/i, "")
				.trim();
			data.skills = skillsContent;
			continue;
		}

		// Parse Personal Section or Bullet Points or Side Project Description
		if (currentSection === "personal" && data.personal) {
			data.personal.bulletPoints +=
				(data.personal.bulletPoints ? "\n" : "") + line;
		} else if (currentItem) {
			if (line.startsWith("- ") || line.startsWith("* ")) {
				currentItem.bulletPoints +=
					(currentItem.bulletPoints ? "\n" : "") + line;
			} else if (line) {
				// For Side Projects, if no bullet points yet, it might be the description
				if (
					currentSection === "sideProjects" &&
					"description" in currentItem &&
					!currentItem.bulletPoints &&
					!currentItem.description
				) {
					currentItem.description = line;
				} else {
					currentItem.bulletPoints +=
						(currentItem.bulletPoints ? "\n" : "") + line;
				}
			}
		}
	}

	// Cleanup strings (remove leading/trailing newlines)
	if (data.experience) {
		for (const item of data.experience) {
			item.bulletPoints = item.bulletPoints.trim();
		}
	}
	if (data.education) {
		for (const item of data.education) {
			item.bulletPoints = item.bulletPoints.trim();
		}
	}
	if (data.sideProjects) {
		for (const item of data.sideProjects) {
			item.bulletPoints = item.bulletPoints.trim();
			item.description = item.description.trim();
		}
	}
	if (data.volunteering) {
		for (const item of data.volunteering) {
			item.bulletPoints = item.bulletPoints.trim();
		}
	}
	if (data.personal) {
		data.personal.bulletPoints = data.personal.bulletPoints.trim();
	}

	return data;
};
