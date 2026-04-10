import React from "react";
import ClientJsExplorer from "@/components/clientjs-explorer";

export default async function TestClientJsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {


  return (
    <div className="container py-24 space-y-8">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tighter sm:text-6xl uppercase">
          Device <span className="text-primary">Intelligence</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          This page demonstrates the power of <code className="bg-muted px-1 rounded">ClientJS</code> for
          deep-level device fingerprinting and browser metadata extraction.
          Use this information for security, analytics, or personalization.
        </p>
      </div>

      <ClientJsExplorer />
    </div>
  );
}
