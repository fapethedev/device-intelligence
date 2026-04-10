import { useState, RefObject } from "react";

import { ClientData, IpData } from "@/components/explorer/types";

export function useExport(data: ClientData | null, ipData: IpData | null, captureRef: RefObject<HTMLDivElement | null>) {
  const [exporting, setExporting] = useState(false);

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

  return {
    exporting,
    handleExportJson,
    handleExportTxt,
    handleExportMd,
    handleExportImage,
    handleExportPdf,
  };
}
