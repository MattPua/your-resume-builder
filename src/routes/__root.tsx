import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../components/ThemeProvider";
import { TooltipProvider } from "../components/ui/tooltip";
import { NotFound } from "../components/NotFound";
import { createSeo } from "../lib/seo";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => {
		const seo = createSeo({
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "WebApplication",
				name: "Your Resume Builder",
				description:
					"Build a professional, ATS-friendly resume online for free. No signup, no tracking. Your data stays on your device.",
				applicationCategory: "BusinessApplication",
				operatingSystem: "Web",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				featureList: [
					"Open Source",
					"100% Private & Local",
					"High-quality PDF Export",
					"Multi-page Support",
					"Auto-saving in Browser",
					"Backup & Transfer via JSON",
					"No Account Required",
				],
			},
		});

		return {
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				...seo.meta,
			],
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
				{
					rel: "icon",
					href: "/favicon.ico",
				},
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/logo192.png",
				},
				{
					rel: "manifest",
					href: "/manifest.json",
				},
			],
			scripts: seo.scripts,
		};
	},
	notFoundComponent: () => <NotFound />,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider defaultTheme="light" storageKey="resume-builder-theme">
					<TooltipProvider>
						{children}
						<TanStackDevtools
							config={{
								position: "bottom-right",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
							]}
						/>
						<Scripts />
						<Analytics />
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
