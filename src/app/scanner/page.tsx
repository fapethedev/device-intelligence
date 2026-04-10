import React from "react";

import ClientJsExplorer from "@/components/clientjs-explorer";

export default async function ScannerPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="container py-24 space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="font-heading text-4xl font-black tracking-tighter sm:text-6xl uppercase">
            Device <span className="text-primary">Intelligence</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Cette page illustre la puissance de <code className="bg-muted px-1 rounded-2xl">ClientJS</code> pour l'identification approfondie
            des appareils et l'extraction des métadonnées du navigateur.
            Utilisez ces informations à des fins de sécurité, d'analyse ou de personnalisation.
          </p>
        </div>

        <ClientJsExplorer />
      </div>
    </div>
  );
}
