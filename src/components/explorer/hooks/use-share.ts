import { useState } from "react";
import { toast } from "sonner";
import { ClientData, IpData } from "../types";

export function useShare(data: ClientData | null, ipData: IpData | null) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: "x" | "fb" | "li" | "copy") => {
    const url = typeof window !== "undefined" ? window.location.href : "https://thedevfolio.com";
    const text = `🔍 My System Forensics Report\n📍 IP: ${ipData?.ip}\n🌍 Location: ${ipData?.city}, ${ipData?.country_name}\n💻 OS: ${data?.os}\n\nCheck yours at:`;

    switch (platform) {
      case "x":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "fb":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "li":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
        toast.success("Copié dans le presse-papier !");
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return { copied, handleShare };
}
