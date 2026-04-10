import React from "react";

import HomeHero from "@/components/home-hero";
import HomeContent from "@/components/home-content";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HomeHero/>
      <HomeContent/>
    </div>
  );
}
