"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Monitor,
  Smartphone,
  Fingerprint,
  ShieldCheck,
  RefreshCw,
  FileCode,
  Laptop,
  Globe,
  MapPin,
  Zap,
  Map as MapIcon,
  Download,
  FileJson,
  FileText,
  FileDown,
  Image as ImageIcon,
  File,
  Share2,
  Copy,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6"
import { FacebookMeta } from "next/dist/lib/metadata/generate/basic"

// Dynamic import for the map to prevent SSR issues
const MapView = dynamic(() => import("./map-view"), { 
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />
});

interface ClientData {
  fingerprint: number;
  customFingerprint: number;
  softwareVersion: string;
  userAgent: string;
  os: string;
  osVersion: string;
  isWindows: boolean;
  isMac: boolean;
  isLinux: boolean;
  isUbuntu: boolean;
  isSolaris: boolean;
  isChromeOS: boolean;
  isAndroid: boolean;
  isIos: boolean;
  isIphone: boolean;
  isIpad: boolean;
  isIpod: boolean;
  isBlackberry: boolean;
  isWindowsMobile: boolean;
  browser: string;
  browserVersion: string;
  engine: string;
  engineVersion: string;
  device: string;
  deviceType: string;
  deviceVendor: string;
  cpu: string;
  isMobile: boolean;
  isDesktop: boolean;
  screenPrint: string;
  colorDepth: string;
  currentResolution: string;
  availableResolution: string;
  deviceXDPI: string;
  deviceYDPI: string;
  plugins: string;
  mimeTypes: string;
  fonts: string;
  canvasPrint: string;
  isJava: boolean;
  javaVersion: string;
  isFlash: boolean;
  flashVersion: string;
  isSilverlight: boolean;
  silverlightVersion: string;
  isCookie: boolean;
  isLocalStorage: boolean;
  isSessionStorage: boolean;
  timeZone: string;
  language: string;
  systemLanguage: string;
}

interface IpData {
  ip: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

interface SectionItem {
  label: string;
  value: string | number | boolean | undefined;
  badge?: boolean;
  truncate?: boolean;
}

interface Section {
  title: string;
  icon: React.ReactNode;
  items: SectionItem[];
  actions?: React.ReactNode;
}

export default function ClientJsExplorer() {
  const [data, setData] = useState<ClientData | null>(null);
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const refreshData = async () => {
    if (typeof window === "undefined") return;
    setLoading(true);

    try {
      const [clientJsModule, ipRes] = await Promise.all([
        import("clientjs"),
        fetch("https://ipapi.co/json/").then(res => res.json())
      ]);

      const { ClientJS } = clientJsModule;
      const client = new ClientJS();

      setIpData(ipRes);
      setData({
        fingerprint: client.getFingerprint(),
        customFingerprint: client.getCustomFingerprint("di-fingerprinter-seed"),
        // @ts-ignore
        softwareVersion: client.getSoftwareVersion ? client.getSoftwareVersion() : "0.2.1",
        userAgent: client.getUserAgent(),
        os: client.getOS(),
        osVersion: client.getOSVersion(),
        isWindows: client.isWindows(),
        isMac: client.isMac(),
        isLinux: client.isLinux(),
        isUbuntu: client.isUbuntu(),
        isSolaris: client.isSolaris(),
        isChromeOS: client.isChrome(),
        isAndroid: client.isMobileAndroid(),
        isIos: client.isMobileIOS(),
        isIphone: client.isIphone(),
        isIpad: client.isIpad(),
        isIpod: client.isIpod(),
        isBlackberry: client.isMobileBlackBerry(),
        isWindowsMobile: client.isMobileWindows(),
        browser: client.getBrowser(),
        browserVersion: client.getBrowserVersion(),
        engine: client.getEngine(),
        engineVersion: client.getEngineVersion(),
        device: client.getDevice(),
        deviceType: client.getDeviceType(),
        deviceVendor: client.getDeviceVendor(),
        cpu: client.getCPU(),
        isMobile: client.isMobile(),
        isDesktop: !client.isMobile(),
        screenPrint: client.getScreenPrint(),
        colorDepth: client.getColorDepth(),
        currentResolution: client.getCurrentResolution(),
        availableResolution: client.getAvailableResolution(),
        deviceXDPI: client.getDeviceXDPI(),
        deviceYDPI: client.getDeviceYDPI(),
        plugins: client.getPlugins(),
        // @ts-ignore
        mimeTypes: client.getMimeTypes ? client.getMimeTypes() : "N/A",
        fonts: client.getFonts(),
        canvasPrint: client.getCanvasPrint(),
        isJava: client.isJava(),
        javaVersion: client.getJavaVersion(),
        isFlash: client.isFlash(),
        flashVersion: client.getFlashVersion(),
        isSilverlight: client.isSilverlight(),
        silverlightVersion: client.getSilverlightVersion(),
        isCookie: client.isCookie(),
        isLocalStorage: client.isLocalStorage(),
        isSessionStorage: client.isSessionStorage(),
        timeZone: client.getTimeZone(),
        language: client.getLanguage(),
        systemLanguage: client.getSystemLanguage(),
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching forensics data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleExportJson = () => {
    const exportData = { ipInfo: ipData, deviceData: data, exportedAt: new Date().toISOString() };
    downloadFile(JSON.stringify(exportData, null, 2), `forensics-${ipData?.ip || "data"}.json`, "application/json");
  };

  const handleExportTxt = () => {
    let text = `SYSTEM FORENSICS REPORT\nGenerated: ${new Date().toLocaleString()}\n\n`;
    text += `NETWORK & IP\n-----------\nIP: ${ipData?.ip}\nOrg: ${ipData?.org}\nLocation: ${ipData?.city}, ${ipData?.country_name}\n\n`;
    text += `DEVICE & OS\n-----------\nOS: ${data?.os} ${data?.osVersion}\nBrowser: ${data?.browser} ${data?.browserVersion}\nUA: ${data?.userAgent}\n`;
    downloadFile(text, `forensics-${ipData?.ip || "data"}.txt`, "text/plain");
  };

  const handleExportMd = () => {
    let md = `# System Forensics Report\n\n**Generated:** ${new Date().toLocaleString()}\n\n`;
    md += `## Network & Connection\n- **IP:** ${ipData?.ip}\n- **ISP:** ${ipData?.org}\n- **Location:** ${ipData?.city}, ${ipData?.country_name}\n\n`;
    md += `## Device Forensics\n- **OS:** ${data?.os} ${data?.osVersion}\n- **Browser:** ${data?.browser} ${data?.browserVersion}\n- **UA:** \`${data?.userAgent}\`\n`;
    downloadFile(md, `forensics-${ipData?.ip || "data"}.md`, "text/markdown");
  };

  const handleExportImage = async () => {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        backgroundColor: "#030712",
        logging: false,
        useCORS: true
      });
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `forensics-${ipData?.ip || "data"}.png`;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setExporting(false);
    }
  };

  const handleExportPdf = async () => {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        backgroundColor: "#030712",
        useCORS: true
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2]
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`forensics-${ipData?.ip || "data"}.pdf`);
    } catch (err) {
      console.error("PDF Export failed", err);
    } finally {
      setExporting(false);
    }
  };

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(9)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    );
  }

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
    <div className="space-y-8 p-6 max-w-7xl mx-auto relative">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end flex-wrap gap-4"
      >
        <div>
          <h2 className="text-4xl font-black tracking-tight uppercase">System <span className="text-primary">Forensics</span></h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <ShieldCheck size={16} className="text-primary" />
            Deep kernel, Network and OS detection using heuristic analysis.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 border-primary/20 bg-background/50">
                        <Share2 size={16} className="text-primary" />
                        Partager
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-primary/20 w-48">
                    <DropdownMenuLabel>Partager le rapport</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-primary/10" />
                    <DropdownMenuItem onClick={() => handleShare("x")} className="gap-2 focus:bg-primary/10 cursor-pointer">
                        <FaTwitter size={14} className="text-[#1DA1F2]" /> Sur X (Twitter)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("li")} className="gap-2 focus:bg-primary/10 cursor-pointer">
                        <FaLinkedinIn size={14} className="text-[#0A66C2]" /> Sur LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("fb")} className="gap-2 focus:bg-primary/10 cursor-pointer">
                        <FaFacebookF size={14} className="text-[#1877F2]" /> Sur Facebook
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-primary/10" />
                    <DropdownMenuItem onClick={() => handleShare("copy")} className="gap-2 focus:bg-primary/10 cursor-pointer">
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
                        Copier le lien
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 border-primary/20 bg-background/50" disabled={exporting}>
                        {exporting ? <RefreshCw className="animate-spin" size={16} /> : <Download size={16} className="text-primary" />}
                        Exporter
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-primary/20 w-48">
                    <DropdownMenuLabel>Format de sortie</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-primary/10" />
                    <DropdownMenuItem onClick={handleExportJson} className="gap-2 focus:bg-primary/10 cursor-pointer">
                        <FileJson size={14} className="text-orange-500" /> JSON Data
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportMd} className="gap-2 focus:bg-primary/10 cursor-pointer">
                        <FileDown size={14} className="text-blue-500" /> Markdown
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportTxt} className="gap-2 focus:bg-primary/10 cursor-pointer">
                        <FileText size={14} className="text-gray-400" /> Plain Text
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-primary/10" />
                    <DropdownMenuItem onClick={handleExportPdf} className="gap-2 focus:bg-primary/10 cursor-pointer">
                        <File size={14} className="text-red-500" /> PDF Document
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportImage} className="gap-2 focus:bg-primary/10 cursor-pointer">
                        <ImageIcon size={14} className="text-purple-500" /> Image (PNG)
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={refreshData} variant="default" className="gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
            Full Scan
            </Button>
        </div>
      </motion.div>

      <div ref={captureRef} className="space-y-8 pb-8">
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
                <Card className="h-full border-primary/10 bg-card/50 backdrop-blur-md hover:border-primary/30 transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        {React.cloneElement(section.icon as React.ReactElement, { size: 64 })}
                    </div>
                    <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2 text-lg font-bold group-hover:text-primary transition-colors">
                        <span className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            {section.icon}
                        </span>
                        {section.title}
                        </CardTitle>
                        {section.actions}
                    </div>
                    </CardHeader>
                    <CardContent className="space-y-3 relative z-10">
                    {section.items.map((item) => (
                        <div key={item.label} className="flex flex-col border-l-2 border-primary/5 group-hover:border-primary/20 pl-3 py-0.5 transition-colors">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                            {item.label}
                        </span>
                        {item.badge ? (
                            <div className="mt-0.5">
                            <code className="bg-primary/10 text-primary font-mono text-xs px-2 py-0.5 rounded border border-primary/20 block w-fit truncate max-w-full">
                                {item.value || "Calculating..."}
                            </code>
                            </div>
                        ) : (
                            <span className={cn(
                            "text-sm font-semibold text-foreground/90",
                            item.truncate && "truncate block max-w-full"
                            )}>
                            {String(item.value ?? "N/A")}
                            </span>
                        )}
                        </div>
                    ))}
                    </CardContent>
                </Card>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <Card className="border-primary/20 bg-primary/5 shadow-inner overflow-hidden">
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileCode className="text-primary" />
                    Raw Data Environment
                </CardTitle>
                <CardDescription>Comprehensive capability dumps for forensic auditing</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="fonts" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1">
                            <TabsTrigger value="fonts" className="data-[state=active]:bg-background">Fonts</TabsTrigger>
                            <TabsTrigger value="mimeTypes" className="data-[state=active]:bg-background">Mime</TabsTrigger>
                            <TabsTrigger value="plugins" className="data-[state=active]:bg-background">Plugins</TabsTrigger>
                            <TabsTrigger value="canvas" className="data-[state=active]:bg-background">Canvas</TabsTrigger>
                        </TabsList>
                        <TabsContent value="fonts" className="mt-4 focus-visible:outline-none">
                            <div className="bg-background/80 p-4 rounded-xl font-mono text-[10px] overflow-auto max-h-64 border border-primary/10 custom-scrollbar animate-in fade-in slide-in-from-bottom-2">
                                {data?.fonts}
                            </div>
                        </TabsContent>
                        <TabsContent value="mimeTypes" className="mt-4 focus-visible:outline-none">
                            <div className="bg-background/80 p-4 rounded-xl font-mono text-[10px] overflow-auto max-h-64 border border-primary/10 custom-scrollbar animate-in fade-in slide-in-from-bottom-2">
                                {data?.mimeTypes || "No specialized MimeTypes found"}
                            </div>
                        </TabsContent>
                        <TabsContent value="plugins" className="mt-4 focus-visible:outline-none">
                            <div className="bg-background/80 p-4 rounded-xl font-mono text-[10px] overflow-auto max-h-64 border border-primary/10 custom-scrollbar animate-in fade-in slide-in-from-bottom-2">
                                {data?.plugins}
                            </div>
                        </TabsContent>
                        <TabsContent value="canvas" className="mt-4 focus-visible:outline-none">
                            <div className="bg-background/80 p-4 rounded-xl font-mono text-[10px] break-all border border-primary/10 animate-in fade-in slide-in-from-bottom-2">
                                {data?.canvasPrint}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </div>
  );
}
