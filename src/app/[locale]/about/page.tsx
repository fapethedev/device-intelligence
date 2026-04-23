import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import AboutHero from "@/components/about/about-hero";
import AboutContent from "@/components/about/about-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About.metadata");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: "Device Intelligence",
      title: t("title"),
      description: t("description"),
      images: [{
        url: "/meta/about.png"
      }]
    },
    twitter: {
      title: t("title"),
      description: t("description"),
      images: {
        url: "/meta/about.png"
      }
    }
  };
}

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="container px-6 py-24 space-y-24">
        <AboutHero />
        <AboutContent />
      </div>
    </div>
  );
}
