import type {
	EducationEntry,
	ExperienceEntry,
	ResumeData,
	SideProjectEntry,
	VolunteeringEntry,
} from "../types/resume";

export const convertToMarkdown = (data: ResumeData): string => {
	const lines: string[] = [];

	// Header
	if (data.name) lines.push(`# ${data.name}`);

	const contactInfo = [
		data.email,
		data.phone,
		data.website,
		data.github,
	].filter(Boolean);

	if (contactInfo.length > 0) {
		lines.push(contactInfo.join(" | "));
	}
	lines.push("");

	const sectionOrder = data.sectionOrder || [
		"experience",
		"background",
		"sideProjects",
		"personal",
	];

	sectionOrder.forEach((sectionId) => {
		if (sectionId === "experience") {
			const visibleItems = data.experience.filter(
				(item) => item.visible !== false,
			);
			if (visibleItems.length > 0) {
				lines.push(`## ${data.sectionTitles?.experience || "Experience"}`);
				visibleItems.forEach((item: ExperienceEntry) => {
					const companyDisplay = item.companyUrl
						? `[${item.company}](${item.companyUrl})`
						: item.company;
					lines.push(
						`### ${item.title}${companyDisplay ? ` @ ${companyDisplay}` : ""}`,
					);
					lines.push(`${item.startDate} — ${item.endDate}`);
					if (item.bulletPoints) {
						lines.push("");
						lines.push(item.bulletPoints);
					}
					lines.push("");
				});
			}
		}

		if (sectionId === "background") {
			const hasEducation = data.education.some(
				(item) => item.visible !== false,
			);
			const hasSkills = data.sectionsVisible?.skills !== false && data.skills;

			if (hasEducation || hasSkills) {
				lines.push(`## ${data.sectionTitles?.background || "Background"}`);

				if (hasEducation) {
					data.education
						.filter((item) => item.visible !== false)
						.forEach((item: EducationEntry) => {
							const institutionDisplay = item.institutionUrl
								? `[${item.institution}](${item.institutionUrl})`
								: item.institution;
							lines.push(
								`### ${item.degree}${institutionDisplay ? ` @ ${institutionDisplay}` : ""}`,
							);
							lines.push(`${item.startDate} — ${item.endDate}`);
							if (item.bulletPoints) {
								lines.push("");
								lines.push(item.bulletPoints);
							}
							lines.push("");
						});
				}

				if (hasSkills) {
					lines.push(`**Skills:** ${data.skills}`);
					lines.push("");
				}
			}
		}

		if (sectionId === "sideProjects") {
			const visibleItems = data.sideProjects.filter(
				(item) => item.visible !== false,
			);
			if (visibleItems.length > 0) {
				lines.push(`## ${data.sectionTitles?.sideProjects || "Side Projects"}`);
				visibleItems.forEach((item: SideProjectEntry) => {
					const titleDisplay = item.titleUrl
						? `[${item.title}](${item.titleUrl})`
						: item.title;
					lines.push(`### ${titleDisplay}`);
					lines.push(`${item.startDate} — ${item.endDate}`);
					if (item.description) {
						lines.push("");
						lines.push(item.description);
					}
					if (item.bulletPoints) {
						lines.push("");
						lines.push(item.bulletPoints);
					}
					lines.push("");
				});
			}
		}

		if (sectionId === "volunteering") {
			const visibleItems = data.volunteering.filter(
				(item) => item.visible !== false,
			);
			if (visibleItems.length > 0) {
				lines.push(`## ${data.sectionTitles?.volunteering || "Volunteering"}`);
				visibleItems.forEach((item: VolunteeringEntry) => {
					const organizationDisplay = item.organizationUrl
						? `[${item.organization}](${item.organizationUrl})`
						: item.organization;
					lines.push(
						`### ${item.role}${organizationDisplay ? ` @ ${organizationDisplay}` : ""}`,
					);
					lines.push(`${item.startDate} — ${item.endDate}`);
					if (item.bulletPoints) {
						lines.push("");
						lines.push(item.bulletPoints);
					}
					lines.push("");
				});
			}
		}

		if (sectionId === "personal") {
			if (
				data.sectionsVisible?.personal !== false &&
				data.personal?.bulletPoints
			) {
				lines.push(`## ${data.sectionTitles?.personal || "Personal"}`);
				lines.push(data.personal.bulletPoints);
				lines.push("");
			}
		}
	});

	return lines.join("\n");
};
