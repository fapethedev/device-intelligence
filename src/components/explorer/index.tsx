"use client";

import React, { useRef } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { useForensics } from "./hooks/use-forensics";
import { useExport } from "./hooks/use-export";
import { useShare } from "./hooks/use-share";
import { ExplorerHeader } from "./components/explorer-header";
import { ExplorerGrid } from "./components/explorer-grid";
import { RawDataEnvironment } from "./components/raw-data-environment";

export default function ClientJsExplorer() {
  const { data, ipData, loading, refreshData } = useForensics();
  const captureRef = useRef<HTMLDivElement>(null);
  
  const { 
    exporting, 
    handleExportJson, 
    handleExportMd, 
    handleExportTxt, 
    handleExportPdf, 
    handleExportImage 
  } = useExport(data, ipData, captureRef);

  const { copied, handleShare } = useShare(data, ipData);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(9)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto relative">
      <ExplorerHeader 
        loading={loading}
        exporting={exporting}
        copied={copied}
        onRefresh={refreshData}
        onShare={handleShare}
        onExportJson={handleExportJson}
        onExportMd={handleExportMd}
        onExportTxt={handleExportTxt}
        onExportPdf={handleExportPdf}
        onExportImage={handleExportImage}
      />

      <div ref={captureRef} className="space-y-8 pb-8">
        <ExplorerGrid data={data} ipData={ipData} />
        <RawDataEnvironment data={data} />
      </div>
    </div>
  );
}
