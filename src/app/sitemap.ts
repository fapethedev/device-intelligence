import {MetadataRoute} from "next";


export default function sitemap(): MetadataRoute.Sitemap {
    const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/scanner`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
    ]
}
