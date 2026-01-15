import { useEffect, useState } from "react";
import type { ResumeData } from "../types/resume";

const STORAGE_KEY = "resume-builder-data";

const isLocalStorageAvailable = () => {
	try {
		const testKey = "__test__";
		localStorage.setItem(testKey, testKey);
		localStorage.removeItem(testKey);
		return true;
	} catch (_e) {
		return false;
	}
};

const migrateSectionOrder = (
	order?: (
		| "experience"
		| "education"
		| "sideProjects"
		| "skills"
		| "background"
		| "personal"
		| "volunteering"
	)[],
):
	| (
			| "experience"
			| "background"
			| "sideProjects"
			| "volunteering"
			| "personal"
	  )[]
	| undefined => {
	if (!order) return undefined;
	// Convert old format with education/skills to new format with background
	const hasEducation = order.includes("education");
	const hasSkills = order.includes("skills");
	const hasBackground = order.includes("background");

	if (hasBackground) {
		// Already migrated, just filter out education and skills
		return order.filter(
			(
				id,
			): id is
				| "experience"
				| "background"
				| "sideProjects"
				| "volunteering"
				| "personal" => id !== "education" && id !== "skills",
		) as (
			| "experience"
			| "background"
			| "sideProjects"
			| "volunteering"
			| "personal"
		)[];
	}

	if (hasEducation || hasSkills) {
		// Need to migrate: replace education and/or skills with background
		const migrated = order
			.map((id) => {
				if (id === "education" || id === "skills") {
					return "background";
				}
				return id;
			})
			.filter(
				(
					id,
				): id is
					| "experience"
					| "background"
					| "sideProjects"
					| "volunteering"
					| "personal" =>
					id === "experience" ||
					id === "background" ||
					id === "sideProjects" ||
					id === "volunteering" ||
					id === "personal",
			);
		// Remove duplicates (in case both education and skills were present)
		return Array.from(new Set(migrated)) as (
			| "experience"
			| "background"
			| "sideProjects"
			| "volunteering"
			| "personal"
		)[];
	}

	// No migration needed, just filter
	return order.filter(
		(
			id,
		): id is
			| "experience"
			| "background"
			| "sideProjects"
			| "volunteering"
			| "personal" =>
			id === "experience" ||
			id === "background" ||
			id === "sideProjects" ||
			id === "volunteering" ||
			id === "personal",
	) as (
		| "experience"
		| "background"
		| "sideProjects"
		| "volunteering"
		| "personal"
	)[];
};

const defaultResumeData: ResumeData = {
	name: "",
	email: "",
	phone: "",
	website: "",
	github: "",
	experience: [],
	education: [],
	sideProjects: [],
	volunteering: [],
	personal: {
		bulletPoints: "",
		visible: true,
	},
	skills: "",
	sectionsVisible: {
		header: true,
		experience: true,
		education: true,
		sideProjects: true,
		volunteering: true,
		personal: true,
		skills: true,
	},
	sectionOrder: [
		"experience",
		"background",
		"sideProjects",
		"volunteering",
		"personal",
	],
	sectionHeaderBackgroundColor: "#3b82f6",
	sectionHeaderTextColor: "#ffffff",
	fontFamily: "'Inter Variable', sans-serif",
	layoutMode: "default",
};

const sampleResumeData: ResumeData = {
	name: "John Doe",
	email: "john.doe@example.com",
	phone: "+1 (555) 000-0000",
	website: "https://johndoe.com",
	github: "https://github.com/johndoe",
	experience: [
		{
			title: "Senior Software Engineer",
			company: "Tech Corp",
			companyUrl: "https://techcorp.com",
			startDate: "2020",
			endDate: "Now",
			bulletPoints:
				"- Led a team of 5 developers to build a high-scale e-commerce platform\n- Reduced system latency by 40% through code optimization and caching strategies\n- Mentored junior developers and improved team productivity by 25%",
			visible: true,
		},
		{
			title: "Software Engineer",
			company: "Startup Inc",
			companyUrl: "https://startupinc.io",
			startDate: "2018",
			endDate: "2020",
			bulletPoints:
				"- Built and maintained the company's main web application using React and Node.js\n- Implemented real-time features using WebSockets\n- Collaborated with UX designers to improve user engagement by 15%",
			visible: true,
		},
	],
	education: [
		{
			degree: "B.S. in Computer Science",
			institution: "University of Technology",
			institutionUrl: "https://utech.edu",
			startDate: "2014",
			endDate: "2018",
			bulletPoints:
				"- Specialized in Distributed Systems and Machine Learning\n- Graduated with Honors",
			visible: true,
		},
	],
	sideProjects: [
		{
			title: "Open Source Project",
			titleUrl: "https://github.com/johndoe/project",
			startDate: "2021",
			endDate: "Now",
			description: "A popular open-source tool for developers.",
			bulletPoints:
				"- Fixed critical bugs and implemented new features\n- Improved project documentation for better onboarding",
			visible: true,
		},
	],
	volunteering: [
		{
			role: "Volunteer Developer",
			organization: "Code for Good",
			organizationUrl: "https://codeforgood.org",
			startDate: "2019",
			endDate: "Present",
			bulletPoints:
				"- Contributing to various non-profit projects\n- Helping build accessible web tools for local communities",
			visible: true,
		},
	],
	personal: {
		bulletPoints:
			"- Passionate about clean code and software architecture\n- Enjoys mentoring and sharing knowledge with the community\n- Avid traveler and landscape photographer",
		visible: true,
	},
	skills:
		"JavaScript, TypeScript, React, Node.js, Tailwind CSS, PostgreSQL, Docker, AWS",
	sectionsVisible: {
		header: true,
		experience: true,
		education: true,
		sideProjects: true,
		volunteering: true,
		personal: true,
		skills: true,
	},
	sectionTitles: {
		experience: "Professional Experience",
		education: "Education",
		sideProjects: "Projects",
		volunteering: "Volunteering",
		personal: "About Me",
		background: "Background",
	},
	sectionOrder: [
		"experience",
		"background",
		"sideProjects",
		"volunteering",
		"personal",
	],
	sectionHeaderBackgroundColor: "#3b82f6",
	sectionHeaderTextColor: "#ffffff",
	fontFamily: "'Inter Variable', sans-serif",
	layoutMode: "default",
};

export const useLocalStorage = () => {
	const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isLocalStorageAvailable()) {
			setIsLoading(false);
			return;
		}

		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored) as Partial<ResumeData> & {
					header?: string;
					experience?: string | ResumeData["experience"];
				};
				// ... (existing migration logic)
				// Migrate old data structure
				if (parsed.header && !parsed.name) {
					const migrated: ResumeData = {
						name: "",
						email: "",
						phone: "",
						website: "",
						github: "",
						experience: [],
						education: [],
						sideProjects: [],
						volunteering: [],
						personal: {
							bulletPoints: "",
							visible: true,
						},
						skills: parsed.skills || "",
						sectionsVisible: {
							header: true,
							experience: true,
							education: true,
							sideProjects: true,
							personal: true,
							skills: true,
						},
					};
					setResumeData(migrated);
					localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
				} else {
					// Handle migration from string experience/education to array
					const migrated: ResumeData = {
						...defaultResumeData,
						...parsed,
						experience: Array.isArray(parsed.experience)
							? parsed.experience.map((e) => ({
									...e,
									visible: e.visible ?? true,
								}))
							: typeof parsed.experience === "string"
								? []
								: [],
						education: Array.isArray(parsed.education)
							? parsed.education.map((e) => ({
									...e,
									visible: e.visible ?? true,
								}))
							: typeof parsed.education === "string"
								? []
								: [],
						sideProjects: Array.isArray(parsed.sideProjects)
							? parsed.sideProjects.map((e) => ({
									...e,
									visible: e.visible ?? true,
								}))
							: typeof parsed.sideProjects === "string"
								? []
								: [],
						volunteering: Array.isArray(parsed.volunteering)
							? parsed.volunteering.map((e) => ({
									...e,
									visible: e.visible ?? true,
								}))
							: [],
						personal: (() => {
							// Migrate from array to single object
							if (Array.isArray(parsed.personal)) {
								// If it's an array, take the first entry or create default
								const firstEntry = parsed.personal[0];
								if (firstEntry) {
									return {
										bulletPoints: firstEntry.bulletPoints || "",
										bulletPointsDraft: firstEntry.bulletPointsDraft,
										visible: firstEntry.visible ?? true,
									};
								}
							}
							// If it's already an object, use it
							if (
								parsed.personal &&
								typeof parsed.personal === "object" &&
								!Array.isArray(parsed.personal)
							) {
								return {
									bulletPoints: parsed.personal.bulletPoints || "",
									bulletPointsDraft: parsed.personal.bulletPointsDraft,
									visible: parsed.personal.visible ?? true,
								};
							}
							// Default
							return {
								bulletPoints: "",
								visible: true,
							};
						})(),
						sectionsVisible:
							parsed.sectionsVisible || defaultResumeData.sectionsVisible,
						sectionOrder: (() => {
							const migratedOrder = migrateSectionOrder(
								parsed.sectionOrder,
							) || [
								"experience",
								"background",
								"sideProjects",
								"volunteering",
								"personal",
							];
							// Ensure "personal" is in the section order if it's missing
							if (!migratedOrder.includes("personal")) {
								migratedOrder.push("personal");
							}
							// Ensure "volunteering" is in the section order if it's missing
							if (!migratedOrder.includes("volunteering")) {
								const sideProjectsIndex = migratedOrder.indexOf("sideProjects");
								if (sideProjectsIndex !== -1) {
									migratedOrder.splice(
										sideProjectsIndex + 1,
										0,
										"volunteering",
									);
								} else {
									migratedOrder.push("volunteering");
								}
							}
							return migratedOrder as (
								| "experience"
								| "background"
								| "sideProjects"
								| "volunteering"
								| "personal"
							)[];
						})(),
					};
					setResumeData(migrated);
					// Save migrated data if it was changed
					const originalOrder = parsed.sectionOrder || [];
					const needsSave =
						typeof parsed.experience === "string" ||
						typeof parsed.education === "string" ||
						typeof parsed.sideProjects === "string" ||
						(Array.isArray(originalOrder) &&
							!originalOrder.includes("personal"));
					if (needsSave) {
						localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
					}
				}
			}
		} catch (error) {
			console.error("Failed to load resume data from localStorage:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const updateResumeData = (updates: Partial<ResumeData>) => {
		setResumeData((prev) => {
			const updated = { ...prev, ...updates };
			try {
				if (typeof window !== "undefined" && isLocalStorageAvailable()) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				}
			} catch (error) {
				console.error("Failed to save resume data to localStorage:", error);
			}
			return updated;
		});
	};

	const resetResumeData = () => {
		setResumeData(defaultResumeData);
		try {
			if (typeof window !== "undefined" && isLocalStorageAvailable()) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultResumeData));
			}
		} catch (error) {
			console.error("Failed to reset resume data in localStorage:", error);
		}
	};

	const loadSampleData = () => {
		setResumeData(sampleResumeData);
		try {
			if (typeof window !== "undefined" && isLocalStorageAvailable()) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleResumeData));
			}
		} catch (error) {
			console.error(
				"Failed to load sample resume data in localStorage:",
				error,
			);
		}
	};

	const importResumeData = (data: ResumeData | Partial<ResumeData>) => {
		// Validate and migrate imported data
		const migrated: ResumeData = {
			...defaultResumeData,
			...data,
			experience: Array.isArray(data.experience)
				? data.experience.map((e) => ({ ...e, visible: e.visible ?? true }))
				: typeof data.experience === "string"
					? []
					: [],
			education: Array.isArray(data.education)
				? data.education.map((e) => ({ ...e, visible: e.visible ?? true }))
				: typeof data.education === "string"
					? []
					: [],
			sideProjects: Array.isArray(data.sideProjects)
				? data.sideProjects.map((e) => ({ ...e, visible: e.visible ?? true }))
				: typeof data.sideProjects === "string"
					? []
					: [],
			volunteering: Array.isArray(data.volunteering)
				? data.volunteering.map((e) => ({ ...e, visible: e.visible ?? true }))
				: [],
			personal: (() => {
				// Migrate from array to single object
				if (Array.isArray(data.personal)) {
					const firstEntry = data.personal[0];
					if (firstEntry) {
						return {
							bulletPoints: firstEntry.bulletPoints || "",
							bulletPointsDraft: firstEntry.bulletPointsDraft,
							visible: firstEntry.visible ?? true,
						};
					}
				}
				if (
					data.personal &&
					typeof data.personal === "object" &&
					!Array.isArray(data.personal)
				) {
					return {
						bulletPoints: data.personal.bulletPoints || "",
						bulletPointsDraft: data.personal.bulletPointsDraft,
						visible: data.personal.visible ?? true,
					};
				}
				return {
					bulletPoints: "",
					visible: true,
				};
			})(),
			sectionsVisible:
				data.sectionsVisible || defaultResumeData.sectionsVisible,
			sectionOrder: (() => {
				const migratedOrder = migrateSectionOrder(data.sectionOrder) || [
					"experience",
					"background",
					"sideProjects",
					"volunteering",
					"personal",
				];
				// Ensure "personal" is in the section order if it's missing
				if (!migratedOrder.includes("personal")) {
					migratedOrder.push("personal");
				}
				// Ensure "volunteering" is in the section order if it's missing
				if (!migratedOrder.includes("volunteering")) {
					const sideProjectsIndex = migratedOrder.indexOf("sideProjects");
					if (sideProjectsIndex !== -1) {
						migratedOrder.splice(sideProjectsIndex + 1, 0, "volunteering");
					} else {
						migratedOrder.push("volunteering");
					}
				}
				return migratedOrder as (
					| "experience"
					| "background"
					| "sideProjects"
					| "volunteering"
					| "personal"
				)[];
			})(),
		};
		setResumeData(migrated);
		try {
			if (typeof window !== "undefined" && isLocalStorageAvailable()) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
			}
		} catch (error) {
			console.error(
				"Failed to save imported resume data to localStorage:",
				error,
			);
		}
	};

	return {
		resumeData,
		updateResumeData,
		resetResumeData,
		loadSampleData,
		importResumeData,
		isLoading,
	};
};
