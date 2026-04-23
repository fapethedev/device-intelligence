import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ClientJsExplorer from "@/components/clientjs-explorer";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Scanner.metadata");
  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function ScannerPage() {
  const t = await getTranslations("Scanner.hero");

  return (
    <div className="flex flex-col items-center">
      <div className="container py-24 space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="font-heading text-4xl font-black tracking-tighter sm:text-6xl uppercase">
            {t.rich("title", {
              span: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t.rich("description", {
              code: (chunks) => <code className="bg-muted px-1 rounded-2xl">{chunks}</code>
            })}
          </p>
        </div>

        <ClientJsExplorer />
      </div>
    </div>
  );
}
