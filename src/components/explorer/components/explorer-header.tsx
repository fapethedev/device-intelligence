import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { ShareDropdown } from "@/components/explorer/components/share-dropdown";
import { ExportDropdown } from "@/components/explorer/components/export-dropdown";

interface ExplorerHeaderProps {
  loading: boolean;
  exporting: boolean;
  copied: boolean;
  onRefresh: () => void;
  onShare: (platform: "x" | "fb" | "li" | "copy") => void;
  onExportJson: () => void;
  onExportMd: () => void;
  onExportTxt: () => void;
  onExportPdf: () => void;
  onExportImage: () => void;
}

export function ExplorerHeader({
  loading,
  exporting,
  copied,
  onRefresh,
  onShare,
  onExportJson,
  onExportMd,
  onExportTxt,
  onExportPdf,
  onExportImage,
}: ExplorerHeaderProps) {
  const t = useTranslations("Scanner.header");

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-end flex-wrap gap-4"
    >
      <div>
        <h2 className="font-heading text-4xl font-black tracking-tight uppercase">
          {t.rich("title", {
            span: (chunks) => <span className="text-primary">{chunks}</span>
          })}
        </h2>
        <p className="text-muted-foreground flex items-center gap-2">
          <ShieldCheck size={16} className="text-primary" />
          {t("description")}
        </p>
      </div>
      <div className="flex gap-2 flex-wrap">
        <ShareDropdown copied={copied} onShare={onShare} />
        <ExportDropdown 
          exporting={exporting}
          onExportJson={onExportJson}
          onExportMd={onExportMd}
          onExportTxt={onExportTxt}
          onExportPdf={onExportPdf}
          onExportImage={onExportImage}
        />
        <Button onClick={onRefresh} variant="default" className="gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
          {t("scanBtn")}
        </Button>
      </div>
    </motion.div>
  );
}
