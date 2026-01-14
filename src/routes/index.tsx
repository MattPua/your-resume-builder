import { createFileRoute } from "@tanstack/react-router";
import { ResumeBuilder } from "../components/ResumeBuilder";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return <ResumeBuilder />;
}
