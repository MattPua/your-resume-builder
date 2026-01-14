import type { ResumeData, ExperienceEntry, EducationEntry, SideProjectEntry } from "../types/resume";

export const parseMarkdownToResumeData = (markdown: string): Partial<ResumeData> => {
  const lines = markdown.split("\n");
  const data: Partial<ResumeData> = {
    experience: [],
    education: [],
    sideProjects: [],
    sectionsVisible: {},
    sectionTitles: {},
    name: "",
    email: "",
    phone: "",
    website: "",
    github: "",
    skills: "",
  };

  let currentSection: "experience" | "background" | "sideProjects" | "personal" | null = null;
  let currentItem: ExperienceEntry | EducationEntry | SideProjectEntry | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line && currentSection !== "personal" && !currentItem) continue;

    // Parse Name (# Name)
    if (line.startsWith("# ") && !currentSection) {
      data.name = line.replace("# ", "").trim();
      continue;
    }

    // Parse Contact Info (Email | Phone | Website | GitHub)
    if (!currentSection && line.includes(" | ")) {
      const parts = line.split("|").map(p => p.trim());
      for (const part of parts) {
        if (part.includes("@") && !data.email) {
          data.email = part;
        } else if ((part.includes("github.com") || part.toLowerCase().includes("github")) && !data.github) {
          data.github = part;
        } else if ((part.includes("http") || part.includes("www")) && !data.website) {
          data.website = part;
        } else if (/[0-9]/.test(part) && !data.phone) {
          data.phone = part;
        }
      }
      continue;
    }

    // Parse Sections (## Section Name)
    if (line.startsWith("## ")) {
      const title = line.replace("## ", "").trim();
      const lowerTitle = title.toLowerCase();

      if (lowerTitle.includes("experience")) {
        currentSection = "experience";
        currentItem = null;
      } else if (lowerTitle.includes("education") || lowerTitle.includes("skills") || lowerTitle.includes("background")) {
        currentSection = "background";
        currentItem = null;
      } else if (lowerTitle.includes("side projects")) {
        currentSection = "sideProjects";
        currentItem = null;
      } else if (lowerTitle.includes("personal")) {
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
        const [title, company] = titleLine.split("@").map(s => s.trim());
        const newItem: ExperienceEntry = { 
          title: title || "", 
          company: company || "", 
          startDate: "", 
          endDate: "", 
          bulletPoints: "",
          visible: true
        };
        data.experience.push(newItem);
        currentItem = newItem;
      } else if (currentSection === "background" && data.education) {
        const [degree, institution] = titleLine.split("@").map(s => s.trim());
        const newItem: EducationEntry = { 
          degree: degree || "", 
          institution: institution || "", 
          startDate: "", 
          endDate: "", 
          bulletPoints: "",
          visible: true
        };
        data.education.push(newItem);
        currentItem = newItem;
      } else if (currentSection === "sideProjects" && data.sideProjects) {
        const newItem: SideProjectEntry = { 
          title: titleLine, 
          description: "",
          startDate: "", 
          endDate: "", 
          bulletPoints: "",
          visible: true
        };
        data.sideProjects.push(newItem);
        currentItem = newItem;
      }
      continue;
    }

    // Parse Dates (StartDate — EndDate)
    if (currentItem && (line.includes(" — ") || line.includes(" - "))) {
      const separator = line.includes(" — ") ? " — " : " - ";
      const [start, end] = line.split(separator).map(s => s.trim());
      // Only treat as dates if it looks like dates (e.g. contains numbers or month names)
      if (/[0-9]/.test(start) || /[0-9]/.test(end)) {
        currentItem.startDate = start;
        currentItem.endDate = end || "";
        continue;
      }
    }

    // Parse Skills in Background Section
    if (currentSection === "background" && line.startsWith("**Skills:**")) {
      data.skills = line.replace("**Skills:**", "").trim();
      continue;
    }

    // Parse Personal Section or Bullet Points
    if (currentSection === "personal" && data.personal) {
      data.personal.bulletPoints += (data.personal.bulletPoints ? "\n" : "") + line;
    } else if (currentItem) {
      if (line.startsWith("- ") || line.startsWith("* ")) {
        currentItem.bulletPoints += (currentItem.bulletPoints ? "\n" : "") + line;
      } else if (line) {
        currentItem.bulletPoints += (currentItem.bulletPoints ? "\n" : "") + line;
      }
    }
  }

  // Cleanup bullet points (remove leading/trailing newlines)
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
    }
  }
  if (data.personal) {
    data.personal.bulletPoints = data.personal.bulletPoints.trim();
  }

  return data;
};
