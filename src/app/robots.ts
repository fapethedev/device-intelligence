import {MetadataRoute} from "next";


export default function robots(): MetadataRoute.Robots {
    const url = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    
    return {
        rules: [
            {
                userAgent: ["Googlebot", "AhrefsBot", "Applebot", "Bingbot"],
                allow: ["/"],
                disallow: ["/public/", "/private/", "/api/", "/admin/"],
            },
        ],
        sitemap: `${url}/sitemap.xml`,
    }
}