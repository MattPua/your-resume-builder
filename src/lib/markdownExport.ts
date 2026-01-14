import type { ResumeData, ExperienceEntry, EducationEntry, SideProjectEntry } from "../types/resume";

export const convertToMarkdown = (data: ResumeData): string => {
  const lines: string[] = [];

  // Header
  if (data.name) lines.push(`# ${data.name}`);
  
  const contactInfo = [
    data.email,
    data.phone,
    data.website,
    data.github
  ].filter(Boolean);
  
  if (contactInfo.length > 0) {
    lines.push(contactInfo.join(" | "));
  }
  lines.push("");

  const sectionOrder = data.sectionOrder || ["experience", "background", "sideProjects", "personal"];

  sectionOrder.forEach((sectionId) => {
    if (sectionId === "experience") {
      const visibleItems = data.experience.filter(item => item.visible !== false);
      if (visibleItems.length > 0) {
        lines.push(`## ${data.sectionTitles?.experience || "Experience"}`);
        visibleItems.forEach((item: ExperienceEntry) => {
          lines.push(`### ${item.title}${item.company ? ` @ ${item.company}` : ""}`);
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
      const hasEducation = data.education.some(item => item.visible !== false);
      const hasSkills = data.sectionsVisible?.skills !== false && data.skills;

      if (hasEducation || hasSkills) {
        lines.push(`## ${data.sectionTitles?.background || "Education & Skills"}`);
        
        if (hasEducation) {
          data.education.filter(item => item.visible !== false).forEach((item: EducationEntry) => {
            lines.push(`### ${item.degree}${item.institution ? ` @ ${item.institution}` : ""}`);
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
      const visibleItems = data.sideProjects.filter(item => item.visible !== false);
      if (visibleItems.length > 0) {
        lines.push(`## ${data.sectionTitles?.sideProjects || "Side Projects"}`);
        visibleItems.forEach((item: SideProjectEntry) => {
          lines.push(`### ${item.title}`);
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
      if (data.sectionsVisible?.personal !== false && data.personal?.bulletPoints) {
        lines.push(`## ${data.sectionTitles?.personal || "Personal"}`);
        lines.push(data.personal.bulletPoints);
        lines.push("");
      }
    }
  });

  return lines.join("\n");
};
