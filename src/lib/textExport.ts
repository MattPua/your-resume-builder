import type { ResumeData, ExperienceEntry, EducationEntry, SideProjectEntry } from "../types/resume";

export const convertToPlainText = (data: ResumeData): string => {
  const lines: string[] = [];

  // Header
  if (data.name) {
    lines.push(data.name.toUpperCase());
    lines.push("=".repeat(data.name.length));
  }
  
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
        const title = data.sectionTitles?.experience || "EXPERIENCE";
        lines.push(title.toUpperCase());
        lines.push("-".repeat(title.length));
        visibleItems.forEach((item: ExperienceEntry) => {
          lines.push(`${item.title}${item.company ? ` @ ${item.company}` : ""}`);
          lines.push(`${item.startDate} - ${item.endDate}`);
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
        const title = data.sectionTitles?.background || "EDUCATION & SKILLS";
        lines.push(title.toUpperCase());
        lines.push("-".repeat(title.length));
        
        if (hasEducation) {
          data.education.filter(item => item.visible !== false).forEach((item: EducationEntry) => {
            lines.push(`${item.degree}${item.institution ? ` @ ${item.institution}` : ""}`);
            lines.push(`${item.startDate} - ${item.endDate}`);
            if (item.bulletPoints) {
              lines.push("");
              lines.push(item.bulletPoints);
            }
            lines.push("");
          });
        }

        if (hasSkills) {
          lines.push(`SKILLS: ${data.skills}`);
          lines.push("");
        }
      }
    }

    if (sectionId === "sideProjects") {
      const visibleItems = data.sideProjects.filter(item => item.visible !== false);
      if (visibleItems.length > 0) {
        const title = data.sectionTitles?.sideProjects || "SIDE PROJECTS";
        lines.push(title.toUpperCase());
        lines.push("-".repeat(title.length));
        visibleItems.forEach((item: SideProjectEntry) => {
          lines.push(item.title);
          lines.push(`${item.startDate} - ${item.endDate}`);
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
        const title = data.sectionTitles?.personal || "PERSONAL";
        lines.push(title.toUpperCase());
        lines.push("-".repeat(title.length));
        lines.push(data.personal.bulletPoints);
        lines.push("");
      }
    }
  });

  return lines.join("\n");
};
