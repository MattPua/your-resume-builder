import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "../components/ThemeProvider";
import { TooltipProvider } from "../components/ui/tooltip";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Your Resume Builder | Open Source & Private | 100% Local & Secure",
			},
			{
				name: "description",
				content: "Create a professional resume with total privacy using Your Resume Builder. An open source, 100% local tool where nothing is uploaded and all data stays in your browser. Free, fast, and secure with high-quality PDF export.",
			},
			{
				name: "keywords",
				content: "Your Resume Builder, open source resume builder, private resume builder, local resume creator, secure CV maker, free resume builder, no upload resume, professional resume, PDF resume, markdown resume",
			},
			{
				property: "og:title",
				content: "Your Resume Builder | Open Source & Private",
			},
			{
				property: "og:description",
				content: "Build a professional resume with total privacy using Your Resume Builder. 100% local, secure, and free. No data ever leaves your browser.",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:image",
				content: "https://your-resume-builder.com/og-image.jpeg",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "Your Resume Builder | Private & Free",
			},
			{
				name: "twitter:description",
				content: "100% local and private resume builder. Create a professional CV in minutes without uploading any personal data with Your Resume Builder.",
			},
			{
				name: "twitter:image",
				content: "https://your-resume-builder.com/og-image.jpeg",
			},
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
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		"name": "Your Resume Builder",
		"description": "Create a professional resume with total privacy using Your Resume Builder. An open source, 100% local, secure, and free tool. No data ever leaves your browser.",
		"applicationCategory": "DesignApplication",
		"operatingSystem": "All",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		},
		"featureList": [
			"Open Source",
			"100% Private & Local",
			"High-quality PDF Export",
			"Multi-page Support",
			"Auto-saving in Browser",
			"Backup & Transfer via JSON",
			"No Account Required"
		]
	};

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
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
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
