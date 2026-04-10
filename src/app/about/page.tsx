import React from "react";
import { Metadata } from "next";

import AboutHero from "@/components/about/about-hero";
import AboutContent from "@/components/about/about-content";


export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez l'histoire de Fingerprinter et apprenez en un peu plus sur son développeur",
  openGraph: {
    type: "website",
    siteName: "Device Intelligence",
    title: "À propos",
    description:  "Découvrez l'histoire de Fingerprinter et apprenez en un peu plus sur son développeur",
    images: [{
      url: "/meta/about.png"
    }]
  },
  twitter: {
    title: "À propos",
    description: "Découvrez l'histoire de Fingerprinter et apprenez en un peu plus sur son développeur",
    images: {
      url: "/meta/about.png"
    }
  }
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
