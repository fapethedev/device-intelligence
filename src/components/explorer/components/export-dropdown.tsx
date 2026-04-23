import React from "react";
import { Download, RefreshCw, FileJson, FileDown, FileText, File, Image as ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportDropdownProps {
  exporting: boolean;
  onExportJson: () => void;
  onExportMd: () => void;
  onExportTxt: () => void;
  onExportPdf: () => void;
  onExportImage: () => void;
}

export function ExportDropdown({
  exporting,
  onExportJson,
  onExportMd,
  onExportTxt,
  onExportPdf,
  onExportImage,
}: ExportDropdownProps) {
  const t = useTranslations("Scanner.export");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-primary/20 bg-background/50" disabled={exporting}>
          {exporting ? <RefreshCw className="animate-spin" size={16} /> : <Download size={16} className="text-primary" />}
          {t("label")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-primary/20 w-48">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuItem onClick={onExportJson} className="gap-2 focus:bg-primary/10 cursor-pointer">
          <FileJson size={14} className="text-orange-500" /> {t("json")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onExportMd} className="gap-2 focus:bg-primary/10 cursor-pointer">
          <FileDown size={14} className="text-blue-500" /> {t("markdown")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onExportTxt} className="gap-2 focus:bg-primary/10 cursor-pointer">
          <FileText size={14} className="text-gray-400" /> {t("text")}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuItem onClick={onExportPdf} className="gap-2 focus:bg-primary/10 cursor-pointer">
          <File size={14} className="text-red-500" /> {t("pdf")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onExportImage} className="gap-2 focus:bg-primary/10 cursor-pointer">
          <ImageIcon size={14} className="text-purple-500" /> {t("image")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
