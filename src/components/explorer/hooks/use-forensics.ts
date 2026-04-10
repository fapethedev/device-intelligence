import { useState, useEffect, useCallback } from "react";

import { ClientData, IpData } from "@/components/explorer/types";

const CACHE_KEY = "di_ip_cache";

export function useForensics() {
  const [data, setData] = useState<ClientData | null>(null);
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    if (typeof window === "undefined") return;
    setLoading(true);

    let ipPromise;

      try {
        const cachedData = sessionStorage.getItem(CACHE_KEY);

        const parsed = cachedData ? JSON.parse(cachedData) : null;

        ipPromise = parsed
          ? Promise.resolve(parsed)
          : fetch("https://ipapi.co/json/").then(res => res.json());

        const [clientJsModule, ipRes] = await Promise.all([
          import("clientjs"),
          ipPromise
        ]).catch(err => {
          console.error("Failed to load resources:", err);
          throw err;
        });

      if (!cachedData) {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(ipRes));
      }

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
        isFlash: client.isFlash(),
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
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return { data, ipData, loading, refreshData };
}
