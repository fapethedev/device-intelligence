import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ShieldCheck } from "lucide-react";

import { FingerprintTester } from "@/components/fingerprint/fingerprint-tester";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Fingerprint.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function FingerprintPage() {
  const t = await getTranslations("Fingerprint.hero");

  return (
    <div className="flex flex-col items-center">
      <div className="container px-6 py-24 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary py-1 px-3 text-xs tracking-wider uppercase font-semibold gap-1.5"
          >
            <ShieldCheck className="size-3.5" />
            {t("badge")}
          </Badge>

          <h1 className="font-heading text-4xl font-black tracking-tighter sm:text-6xl uppercase">
            {t.rich("title", {
              span: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg">
            {t("description")}
          </p>
        </div>

        <FingerprintTester />
      </div>
    </div>
  );
}
