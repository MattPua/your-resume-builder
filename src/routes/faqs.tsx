import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	Database,
	FileText,
	HelpCircle,
	Lock,
	ShieldCheck,
	Zap,
} from "lucide-react";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { createSeo } from "../lib/seo";

const FAQ_GROUPS = [
	{
		title: "Pricing & Access",
		items: [
			{
				question: "Is this resume builder really free?",
				answer:
					"Yes, it's 100% free with no hidden fees, subscriptions, or watermarks. It is an open-source project built for everyone.",
				icon: <HelpCircle className="size-5 text-pink-600" />,
			},
			{
				question: "Do I need to create an account?",
				answer:
					"No, no account or sign-up is required. You can start building your resume immediately without providing an email address.",
				icon: <Lock className="size-5 text-gray-600" />,
			},
			{
				question: "Are there any limits on usage?",
				answer:
					"No, you can create, export, and manage as many resumes as you need without any restrictions or paywalls.",
				icon: <Zap className="size-5 text-amber-600" />,
			},
			{
				question: "Do I need a credit card to use it?",
				answer:
					"No, we don't ask for any payment information, credit card details, or subscriptions. It is completely free for all users.",
				icon: <HelpCircle className="size-5 text-rose-600" />,
			},
		],
	},
	{
		title: "Privacy & Security",
		items: [
			{
				question: "Where is my resume data stored?",
				answer:
					"Your data is stored locally in your browser's storage. We never upload your personal information to any server.",
				icon: <Database className="size-5 text-blue-600" />,
			},
			{
				question: "Is it safe to use this builder?",
				answer:
					"Yes, it's privacy-first and open-source. Since your data never leaves your device, it's the most secure way to build a resume.",
				icon: <ShieldCheck className="size-5 text-green-600" />,
			},
			{
				question: "Who owns my resume data?",
				answer:
					"You do. Your data stays on your device and is never shared with us or any third parties. You have total control.",
				icon: <Lock className="size-5 text-indigo-600" />,
			},
			{
				question: "Does the site track my data?",
				answer:
					"No, we don't track your personal info or use cookies for advertising. We only use basic site traffic analytics.",
				icon: <ShieldCheck className="size-5 text-emerald-600" />,
			},
		],
	},
	{
		title: "Quality & ATS",
		items: [
			{
				question: "Are the resumes ATS-friendly?",
				answer:
					"Yes, we use standard professional formatting and high-quality PDF generation that is easily readable by applicant tracking systems.",
				icon: <FileText className="size-5 text-purple-600" />,
			},
			{
				question: "Does it add watermarks or branding?",
				answer:
					"No, your exported resume will never have any watermarks, builder branding, or forced footers of any kind.",
				icon: <ShieldCheck className="size-5 text-cyan-600" />,
			},
			{
				question: "Can I customize colors and fonts?",
				answer:
					"Yes, you can adjust spacing, professional fonts, and accent colors while maintaining a clean, ATS-compliant layout.",
				icon: <Zap className="size-5 text-orange-600" />,
			},
			{
				question: "Are the templates professional?",
				answer:
					"We focus on high-impact, recruiter-approved layouts that prioritize your content and clarity over flashy designs.",
				icon: <FileText className="size-5 text-sky-600" />,
			},
		],
	},
	{
		title: "Features & Workflow",
		items: [
			{
				question: "Which file formats can I export in?",
				answer:
					"You can export as PDF for job applications, and JSON for portable backups and cross-device editing.",
				icon: <FileText className="size-5 text-emerald-600" />,
			},
			{
				question: "Can I edit my resume later?",
				answer:
					"Yes, return to the site on the same browser, or export a JSON backup to import and edit later on any device.",
				icon: <Database className="size-5 text-cyan-600" />,
			},
			{
				question: "How do I move data to another device?",
				answer:
					"Use the 'Export to JSON' feature to save a backup, then use 'Import from JSON' on your other device to continue.",
				icon: <Zap className="size-5 text-orange-600" />,
			},
			{
				question: "Can I import an existing resume?",
				answer:
					"Yes, you can import data via JSON files or paste Markdown text to quickly populate your professional history.",
				icon: <FileText className="size-5 text-purple-600" />,
			},
		],
	},
];

export const Route = createFileRoute("/faqs")({
	head: () => {
		const allItems = FAQ_GROUPS.flatMap((group) => group.items);
		return createSeo({
			title: "Free Resume Builder FAQs – Privacy, ATS, and More",
			description:
				"Frequently asked questions about the best free resume builder. Learn about ATS-friendly templates, privacy, and how to build a resume without an account.",
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: allItems.map((faq) => ({
					"@type": "Question",
					name: faq.question,
					acceptedAnswer: {
						"@type": "Answer",
						text: faq.answer,
					},
				})),
			},
		});
	},
	component: FaqsPage,
});

function FaqsPage() {
	const leftGroups = FAQ_GROUPS.filter((_, i) => i % 2 === 0);
	const rightGroups = FAQ_GROUPS.filter((_, i) => i % 2 !== 0);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
			<SiteHeader />

			<main className="flex-1 max-w-4xl mx-auto px-4 py-8 lg:py-12">
				<div className="space-y-12">
					<div className="space-y-4 text-left">
						<Link
							to="/build"
							className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-4"
						>
							<ArrowLeft className="size-4" />
							Back to Builder
						</Link>
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
							Frequently Asked Questions
						</h1>
					</div>

					{/* FAQ Accordion Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
						{/* Left Column */}
						<div className="space-y-8">
							{leftGroups.map((group) => (
								<div key={group.title} className="space-y-4">
									<h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70 pl-2">
										{group.title}
									</h2>
									<div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden text-left h-fit">
										<Accordion type="single" collapsible className="w-full">
											{group.items.map((faq) => (
												<AccordionItem
													key={faq.question}
													value={faq.question}
													className="last:border-0 w-full"
												>
													<AccordionTrigger className="hover:no-underline py-5 px-6">
														<div className="flex items-center gap-3 w-full min-w-0">
															<div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shrink-0">
																{faq.icon}
															</div>
															<span className="text-left font-semibold text-gray-900 dark:text-white">
																{faq.question}
															</span>
														</div>
													</AccordionTrigger>
													<AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed px-6 pl-11 pb-6">
														{faq.answer}
													</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</div>
								</div>
							))}
						</div>

						{/* Right Column */}
						<div className="space-y-8">
							{rightGroups.map((group) => (
								<div key={group.title} className="space-y-4">
									<h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70 pl-2">
										{group.title}
									</h2>
									<div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden text-left h-fit">
										<Accordion type="single" collapsible className="w-full">
											{group.items.map((faq) => (
												<AccordionItem
													key={faq.question}
													value={faq.question}
													className="last:border-0 w-full"
												>
													<AccordionTrigger className="hover:no-underline py-5 px-6">
														<div className="flex items-center gap-3 w-full min-w-0">
															<div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shrink-0">
																{faq.icon}
															</div>
															<span className="text-left font-semibold text-gray-900 dark:text-white">
																{faq.question}
															</span>
														</div>
													</AccordionTrigger>
													<AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed px-6 pl-11 pb-6">
														{faq.answer}
													</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Support / GitHub */}
					<div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 space-y-4 text-center">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white">
							Still have questions?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
							If you've found a bug or have a feature request, please feel free
							to open an issue on our GitHub repository.
						</p>
						<div className="pt-4">
							<Button asChild variant="outline">
								<a
									href="https://github.com/MattPua/resume-builder"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2"
								>
									<HelpCircle className="size-4" />
									View on GitHub
								</a>
							</Button>
						</div>
					</div>

					{/* Call to Action */}
					<div className="text-center pt-8">
						<Button asChild size="lg" className="px-8 py-6 text-lg">
							<Link to="/">Start Building Your Resume</Link>
						</Button>
					</div>
				</div>
			</main>

			<SiteFooter />
		</div>
	);
}
