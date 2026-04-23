import React from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { 
  Zap, MapPin, Globe, Fingerprint, Laptop, 
  Smartphone, Monitor, ShieldCheck, FileCode, Map as MapIcon 
} from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Scanner.grid");

  const sections: Section[] = [
    {
      title: t("sections.network"),
      icon: <Zap className="text-primary w-5 h-5" />,
      items: [
        { label: t("labels.ip"), value: ipData?.ip, badge: true },
        { label: t("labels.provider"), value: ipData?.org, truncate: true },
        { label: t("labels.asn"), value: ipData?.asn },
        { label: t("labels.version"), value: ipData?.version },
      ]
    },
    {
      title: t("sections.geo"),
      icon: <MapPin className="text-primary w-5 h-5" />,
      items: [
        { label: t("labels.location"), value: `${ipData?.city}, ${ipData?.region} (${ipData?.country_name})` },
        { label: t("labels.postal"), value: ipData?.postal },
        { label: t("labels.coordinates"), value: `${ipData?.latitude}, ${ipData?.longitude}` },
        { label: t("labels.inEu"), value: ipData?.in_eu ? t("values.yes") : t("values.no") },
      ],
      actions: (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-2 h-7 text-[10px] uppercase font-bold tracking-widest bg-primary/5 border-primary/20 hover:bg-primary/10">
              <MapIcon size={12} className="text-primary" />
              {t("map.btn")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl bg-card border-primary/20 p-0 overflow-hidden backdrop-blur-xl">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="flex items-center gap-2">
                <MapPin className="text-primary" />
                {t("map.title")}
              </DialogTitle>
              <DialogDescription>
                {t("map.description", { ip: ipData?.ip || "" })}
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
      title: t("sections.regional"),
      icon: <Globe className="text-primary w-5 h-5" />,
      items: [
        { label: t("labels.capital"), value: ipData?.country_capital },
        { label: t("labels.currency"), value: `${ipData?.currency_name} (${ipData?.currency})` },
        { label: t("labels.callingCode"), value: `+${ipData?.country_calling_code}` },
        { label: t("labels.languages"), value: ipData?.languages, truncate: true },
      ]
    },
    {
      title: t("sections.identity"),
      icon: <Fingerprint className="text-primary w-5 h-5" />,
      items: [
        { label: t("labels.deviceHash"), value: data?.fingerprint, badge: true },
        { label: t("labels.browserLanguage"), value: data?.language },
        { label: t("labels.timezone"), value: ipData?.timezone || data?.timeZone },
        { label: t("labels.utcOffset"), value: ipData?.utc_offset },
      ]
    },
    {
      title: t("sections.os"),
      icon: <Laptop className="text-primary w-5 h-5" />,
      items: [
        { label: t("labels.system"), value: `${data?.os} ${data?.osVersion}` },
        { label: t("labels.architecture"), value: data?.cpu || "x64/ARM" },
        { label: t("labels.desktopMode"), value: data?.isDesktop ? t("values.yes") : t("values.no") },
        { label: t("labels.platform"), value: data?.isWindows ? "Windows" : data?.isMac ? "macOS" : data?.isLinux ? "Linux" : t("values.other") },
      ]
    },
    {
      title: t("sections.mobile"),
      icon: <Smartphone className="text-primary w-5 h-5" />,
      items: [
        { label: t("labels.isMobile"), value: data?.isMobile ? t("values.yes") : t("values.no") },
        { label: t("labels.iosDevice"), value: data?.isIos ? (data?.isIphone ? "iPhone" : "iPad") : t("values.no") },
        { label: t("labels.android"), value: data?.isAndroid ? t("values.yes") : t("values.no") },
        { label: t("labels.legacyOs"), value: data?.isBlackberry || data?.isWindowsMobile ? t("values.yes") : t("values.no") },
      ]
    },
    {
      title: t("sections.hardware"),
      icon: <Monitor className="text-primary w-5 h-5" />,
      items: [
        { label: t("labels.resolution"), value: data?.currentResolution },
        { label: t("labels.available"), value: data?.availableResolution },
        { label: t("labels.colorDepth"), value: `${data?.colorDepth} bit` },
        { label: t("labels.dpi"), value: `${data?.deviceXDPI}x${data?.deviceYDPI}` },
      ]
    },
    {
      title: t("sections.storage"),
      icon: <ShieldCheck className="text-primary w-5 h-5" />,
      items: [
        { label: t("labels.cookies"), value: data?.isCookie ? t("values.enabled") : t("values.disabled") },
        { label: t("labels.localStorage"), value: data?.isLocalStorage ? t("values.available") : t("values.no") },
        { label: t("labels.sessionStorage"), value: data?.isSessionStorage ? t("values.available") : t("values.no") },
        { label: t("labels.flashJava"), value: data?.isFlash || data?.isJava ? t("values.installed") : t("values.none") },
      ]
    },
    {
      title: t("sections.software"),
      icon: <FileCode className="text-primary w-5 h-5" />,
      items: [
        { label: t("labels.browser"), value: `${data?.browser} ${data?.browserVersion}` },
        { label: t("labels.engine"), value: `${data?.engine} ${data?.engineVersion}` },
        { label: t("labels.libVersion"), value: data?.softwareVersion },
        { label: t("labels.userAgent"), value: data?.userAgent, truncate: true },
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
