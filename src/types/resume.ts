export interface ExperienceEntry {
	title: string;
	company: string;
	companyUrl?: string;
	startDate: string;
	endDate: string;
	bulletPoints: string;
	bulletPointsDraft?: string;
	notes?: string;
	visible?: boolean;
}

export interface EducationEntry {
	degree: string;
	institution: string;
	institutionUrl?: string;
	startDate: string;
	endDate: string;
	bulletPoints: string;
	bulletPointsDraft?: string;
	notes?: string;
	visible?: boolean;
}

export interface SideProjectEntry {
	title: string;
	titleUrl?: string;
	description: string;
	startDate: string;
	endDate: string;
	bulletPoints: string;
	bulletPointsDraft?: string;
	notes?: string;
	visible?: boolean;
}

export interface ResumeData {
	name: string;
	email: string;
	phone: string;
	website: string;
	github: string;
	experience: ExperienceEntry[];
	education: EducationEntry[];
	sideProjects: SideProjectEntry[];
	personal?: {
		bulletPoints: string;
		bulletPointsDraft?: string;
		visible?: boolean;
	};
	skills: string;
	skillsDraft?: string;
	sectionsVisible?: {
		header?: boolean;
		experience?: boolean;
		education?: boolean;
		sideProjects?: boolean;
		personal?: boolean;
		skills?: boolean;
	};
	sectionTitles?: {
		header?: string;
		experience?: string;
		education?: string;
		sideProjects?: string;
		personal?: string;
		skills?: string;
		background?: string;
	};
	sectionOrder?: ("experience" | "background" | "sideProjects" | "personal")[];
	sectionHeaderBackgroundColor?: string;
	sectionHeaderTextColor?: string;
	fontFamily?: string;
}
