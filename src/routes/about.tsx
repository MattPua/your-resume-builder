import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	Database,
	Github,
	Lock,
	ShieldCheck,
	Zap,
} from "lucide-react";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Button } from "../components/ui/button";
import { createSeo } from "../lib/seo";

export const Route = createFileRoute("/about")({
	head: () =>
		createSeo({
			title: "Privacy-First Resume Builder (No Account Required)",
			description:
				"Learn more about Your Resume Builder - a privacy-first, ATS-friendly resume builder where your data never leaves your device.",
		}),
	component: AboutPage,
});

function AboutPage() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
			<SiteHeader />

			<main className="flex-1 max-w-4xl mx-auto px-4 py-8 lg:py-12">
				<div className="space-y-12">
					{/* Header */}
					<div className="space-y-4 text-left">
						<Link
							to="/build"
							className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-4"
						>
							<ArrowLeft className="size-4" />
							Back to Builder
						</Link>
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl leading-tight">
							Your Resume Data Stays on Your Device
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
							A free, privacy-first resume builder that works entirely in your
							browser — no signup, no subscriptions, no compromises.
						</p>
					</div>

					{/* Features Grid */}
					<div className="grid gap-8 sm:grid-cols-2">
						<div className="space-y-3">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
								<Lock className="size-6" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								No Account Required
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								Start immediately. No email, no login, no tracking. We believe
								you should be able to build a resume without giving away your
								personal data.
							</p>
						</div>

						<div className="space-y-3">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
								<Zap className="size-6" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								100% Free Forever
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								Build, edit, and export your resume with no hidden costs,
								subscriptions, or watermarks. This is an open-source tool for
								everyone.
							</p>
						</div>

						<div className="space-y-3">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
								<ShieldCheck className="size-6" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								ATS-Friendly Templates
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								Our layouts are designed to pass applicant tracking systems
								(ATS) used by major employers, ensuring your resume actually
								gets read.
							</p>
						</div>

						<div className="space-y-3">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
								<Database className="size-6" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								Local-First Architecture
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								Your resume data is stored in your browser's local storage. We
								never upload your personal information to any server.
							</p>
						</div>
					</div>

					{/* Why Build This? */}
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
							<ShieldCheck className="size-6 text-green-600" />
							Why Build This?
						</h3>
						<div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
							<p>
								Most online resume builders require an account, charge a
								subscription, or track your data. We believe your professional
								history is personal and shouldn't be a product.
							</p>
							<p>
								We grew tired of the "MS Word formatting nightmare"—wrestling
								with custom table layouts and fragile positioning just to get
								everything "just right," only for it to break when moving
								between Google Docs and MS Word.
							</p>
							<p>
								We built this because we just wanted to write our content and
								have a professional resume ready to go. No bells and whistles,
								no fighting with margins, and no broken layouts.
							</p>
							<p>
								Privacy was also a major driver. We wanted a tool where our
								sensitive professional data wouldn't be fed into an AI or LLM,
								yet still allowed for full personal control over the content.
							</p>
							<p>
								By using a local-first approach with JSON and Markdown support,
								this builder works seamlessly across devices without ever
								requiring an account, ensuring you maintain absolute data
								sovereignty.
							</p>
						</div>
						<div className="pt-4">
							<Button asChild variant="outline">
								<a
									href="https://github.com/MattPua/resume-builder"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2"
								>
									<Github className="size-4" />
									View on GitHub
								</a>
							</Button>
						</div>
					</div>

					{/* Community Blurb */}
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
							Did you use this to build your resume?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
							We'd love to hear from you! If this tool helped you land a job or
							simply made your life easier, let us know by sharing your story or
							leaving a star on GitHub. Your feedback helps us keep improving
							the builder for everyone.
						</p>
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
