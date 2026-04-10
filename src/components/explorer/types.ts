import React from "react";

export interface ClientData {
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
  isFlash: boolean;
  isSilverlight: boolean;
  silverlightVersion: string;
  isCookie: boolean;
  isLocalStorage: boolean;
  isSessionStorage: boolean;
  timeZone: string;
  language: string;
  systemLanguage: string;
}

export interface IpData {
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

export interface SectionItem {
  label: string;
  value: string | number | boolean | undefined;
  badge?: boolean;
  truncate?: boolean;
}

export interface Section {
  title: string;
  icon: React.ReactNode;
  items: SectionItem[];
  actions?: React.ReactNode;
}
