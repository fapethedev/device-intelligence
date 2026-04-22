import {MetadataRoute} from "next";
import { getPathname } from "@/i18n/navigation"

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
            alternates: {
                languages: {
                    en: BASE_URL + (getPathname({ locale: "en", href: "/" })),
                    fr: BASE_URL + (getPathname({ locale: "fr", href: "/" }))
                }
            }
        },
        {
            url: `${BASE_URL}/scanner`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
            alternates: {
                languages: {
                    en: BASE_URL + (getPathname({ locale: "en", href: "/scanner" })),
                    fr: BASE_URL + (getPathname({ locale: "fr", href: "/scanner" }))
                }
            }
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
            alternates: {
                languages: {
                    en: BASE_URL + (getPathname({ locale: "en", href: "/about" })),
                    fr: BASE_URL + (getPathname({ locale: "fr", href: "/about" }))
                }
            }
        },
    ]
}
