import {MetadataRoute} from "next";
import {getTranslations} from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = "en";

  const t = await getTranslations({
    namespace: "Manifest",
    locale
  });

	return {
		id : "di-fingerprinter",
		name: t("title"),
		short_name: "DI",
    description: t("description"),
		start_url: "/",
		display: "standalone",
		display_override: ["window-controls-overlay"],
		background_color: "#fff",
		theme_color: "#00786f",
		orientation: "portrait-primary",
		lang: "fr",
		dir: "ltr",
		prefer_related_applications: false,
		icons: [
			{
				src: "/favicon.ico",
				sizes: "48x48",
				type: "image/x-icon",
			},
			{
				src: "/icon.png",
				sizes: "96x96",
				type: "image/x-icon",
			},
			{
				src: "/apple-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
			{
				src: "/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icon-maskable-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/icon-maskable-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
		categories: [
				"news",
				"business",
		],
		shortcuts: [
			{
				name: t("shortcuts.scanner.name"),
				short_name: t("shortcuts.scanner.shortName"),
				description: t("shortcuts.scanner.description"),
				url: "/scanner",
				icons: [
					{
						src: "/shortcuts-icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
				]
			}
		],
		screenshots: [
			{
				src: "/screenshot-narrow-1.png",
				type: "image/png",
				sizes: "850x1542",
				form_factor: "narrow"
			},
			{
				src: "/screenshot-wide-1.png",
				type: "image/jpg",
				sizes: "1908x884",
				form_factor: "wide"
			},
		],
	}
}
