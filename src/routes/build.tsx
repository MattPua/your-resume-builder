import { createFileRoute } from "@tanstack/react-router";
import { ResumeBuilder } from "../components/ResumeBuilder";
import { createSeo } from "../lib/seo";

export const Route = createFileRoute("/build")({
	head: () =>
		createSeo({
			title: "Build Your Resume",
			description:
				"Create and edit your professional resume with absolute privacy. No data ever leaves your device.",
		}),
	component: BuildPage,
});

function BuildPage() {
	return <ResumeBuilder />;
}
