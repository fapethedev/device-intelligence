import React from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { 
  Zap, MapPin, Globe, Fingerprint, Laptop, 
  Smartphone, Monitor, ShieldCheck, FileCode, Map as MapIcon 
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClientData, IpData, Section } from "@/components/explorer/types";
import { ExplorerCard } from "@/components/explorer/components/explorer-card";

// Dynamic import for the map to prevent SSR issues
const MapView = dynamic(() => import("@/components/map-view"), {
  ssr: false,
  loading: () => <Skeleton className="h-100 w-full rounded-xl" />
});

interface ExplorerGridProps {
  data: ClientData | null;
  ipData: IpData | null;
}

export function ExplorerGrid({ data, ipData }: ExplorerGridProps) {
  const sections: Section[] = [
    {
      title: "Network & Connection",
      icon: <Zap className="text-primary w-5 h-5" />,
      items: [
        { label: "IP Address", value: ipData?.ip, badge: true },
        { label: "Provider (ISP)", value: ipData?.org, truncate: true },
        { label: "ASN", value: ipData?.asn },
        { label: "IP Version", value: ipData?.version },
      ]
    },
    {
      title: "Geo Location",
      icon: <MapPin className="text-primary w-5 h-5" />,
      items: [
        { label: "Location", value: `${ipData?.city}, ${ipData?.region} (${ipData?.country_name})` },
        { label: "Postal Code", value: ipData?.postal },
        { label: "Coordinates", value: `${ipData?.latitude}, ${ipData?.longitude}` },
        { label: "In EU", value: ipData?.in_eu ? "Yes" : "No" },
      ],
      actions: (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-2 h-7 text-[10px] uppercase font-bold tracking-widest bg-primary/5 border-primary/20 hover:bg-primary/10">
              <MapIcon size={12} className="text-primary" />
              Carte
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl bg-card border-primary/20 p-0 overflow-hidden backdrop-blur-xl">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="flex items-center gap-2">
                <MapPin className="text-primary" />
                Localisation Détectée
              </DialogTitle>
              <DialogDescription>
                Visualisation géographique de l'IP {ipData?.ip}
              </DialogDescription>
            </DialogHeader>
            <div className="p-6 pt-0">
               {ipData && <MapView lat={ipData.latitude} lng={ipData.longitude} city={ipData.city} />}
            </div>
          </DialogContent>
        </Dialog>
      )
    },
    {
      title: "Regional Context",
      icon: <Globe className="text-primary w-5 h-5" />,
      items: [
        { label: "Capital", value: ipData?.country_capital },
        { label: "Currency", value: `${ipData?.currency_name} (${ipData?.currency})` },
        { label: "Calling Code", value: `+${ipData?.country_calling_code}` },
        { label: "Languages", value: ipData?.languages, truncate: true },
      ]
    },
    {
      title: "Identity & Fingerprint",
      icon: <Fingerprint className="text-primary w-5 h-5" />,
      items: [
        { label: "Device Hash", value: data?.fingerprint, badge: true },
        { label: "Browser Language", value: data?.language },
        { label: "Timezone", value: ipData?.timezone || data?.timeZone },
        { label: "UTC Offset", value: ipData?.utc_offset },
      ]
    },
    {
      title: "OS Deep Dive",
      icon: <Laptop className="text-primary w-5 h-5" />,
      items: [
        { label: "System", value: `${data?.os} ${data?.osVersion}` },
        { label: "Architecture", value: data?.cpu || "x64/ARM" },
        { label: "Desktop Mode", value: data?.isDesktop ? "Yes" : "No" },
        { label: "Platform", value: data?.isWindows ? "Windows" : data?.isMac ? "macOS" : data?.isLinux ? "Linux" : "Other" },
      ]
    },
    {
      title: "Mobile Forensics",
      icon: <Smartphone className="text-primary w-5 h-5" />,
      items: [
        { label: "Is Mobile", value: data?.isMobile ? "Yes" : "No" },
        { label: "iOS Device", value: data?.isIos ? (data?.isIphone ? "iPhone" : "iPad") : "No" },
        { label: "Android", value: data?.isAndroid ? "Yes" : "No" },
        { label: "Legacy OS", value: data?.isBlackberry || data?.isWindowsMobile ? "Yes" : "No" },
      ]
    },
    {
      title: "Hardware & Display",
      icon: <Monitor className="text-primary w-5 h-5" />,
      items: [
        { label: "Resolution", value: data?.currentResolution },
        { label: "Available", value: data?.availableResolution },
        { label: "Color Depth", value: `${data?.colorDepth} bit` },
        { label: "DPI", value: `${data?.deviceXDPI}x${data?.deviceYDPI}` },
      ]
    },
    {
      title: "Storage & Security",
      icon: <ShieldCheck className="text-primary w-5 h-5" />,
      items: [
        { label: "Cookies", value: data?.isCookie ? "Enabled" : "Disabled" },
        { label: "Local Storage", value: data?.isLocalStorage ? "Available" : "No" },
        { label: "Session Storage", value: data?.isSessionStorage ? "Available" : "No" },
        { label: "Flash/Java", value: data?.isFlash || data?.isJava ? "Installed" : "None" },
      ]
    },
    {
      title: "Software Environment",
      icon: <FileCode className="text-primary w-5 h-5" />,
      items: [
        { label: "Browser", value: `${data?.browser} ${data?.browserVersion}` },
        { label: "Engine", value: `${data?.engine} ${data?.engineVersion}` },
        { label: "Lib Version", value: data?.softwareVersion },
        { label: "User Agent", value: data?.userAgent, truncate: true },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              delay: idx * 0.04,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            <ExplorerCard section={section} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
