import React from "react";
import { Share2, Copy, Check } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
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

interface ShareDropdownProps {
  copied: boolean;
  onShare: (platform: "x" | "fb" | "li" | "copy") => void;
}

export function ShareDropdown({ copied, onShare }: ShareDropdownProps) {
  const t = useTranslations("Scanner.share");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-primary/20 bg-background/50">
          <Share2 size={16} className="text-primary" />
          {t("label")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-primary/20 w-48">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuItem onClick={() => onShare("x")} className="gap-2 focus:bg-primary/10 cursor-pointer">
          <FaTwitter size={14} className="text-[#1DA1F2]" /> {t("twitter")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onShare("li")} className="gap-2 focus:bg-primary/10 cursor-pointer">
          <FaLinkedinIn size={14} className="text-[#0A66C2]" /> {t("linkedin")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onShare("fb")} className="gap-2 focus:bg-primary/10 cursor-pointer">
          <FaFacebookF size={14} className="text-[#1877F2]" /> {t("facebook")}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuItem onClick={() => onShare("copy")} className="gap-2 focus:bg-primary/10 cursor-pointer">
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
          {t("copy")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
