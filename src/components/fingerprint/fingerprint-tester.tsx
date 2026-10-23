"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FingerprintProvider, useVisitorData } from "@fingerprint/react";
import {
  Fingerprint,
  ShieldCheck,
  Key,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Terminal,
  Loader2,
  Database,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

type Region = "us" | "eu" | "ap";

function VisitorResultView({ apiKey }: { apiKey: string }) {
  const t = useTranslations("Fingerprint");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { getData, isLoading, data, error } = useVisitorData({
    immediate: false,
  });

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(t("results.copied"));
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleScan = async () => {
    try {
      await getData();
    } catch {
      // error is handled by useVisitorData
    }
  };

  const visitorId = data ? data.visitor_id ?? (data as Record<string, unknown>).visitorId as string | undefined : undefined;
  const eventId = data ? data.event_id ?? (data as Record<string, unknown>).requestId as string | undefined : undefined;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl border border-primary/20 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
            <Fingerprint className="size-6" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              {t("actions.identify")}
            </h3>
            <p className="text-xs text-muted-foreground">
              API Key: <code className="bg-muted px-1.5 py-0.5 rounded-lg">{apiKey.slice(0, 6)}••••••••</code>
            </p>
          </div>
        </div>

        <Button
          onClick={handleScan}
          disabled={isLoading}
          size="lg"
          className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 font-bold"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("actions.identifying")}
            </>
          ) : (
            <>
              <RefreshCw className="size-4" />
              {data ? t("actions.refresh") : t("actions.identify")}
            </>
          )}
        </Button>
      </div>

      {error && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="size-5" />
              {error.name || "Identification Error"}
            </CardTitle>
            <CardDescription className="text-foreground/80">
              {error.message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {t("config.noKeyAlert")}
            </p>
            <Button variant="link" size="sm" asChild className="p-0 h-auto mt-2 text-xs">
              <Link href="https://docs.fingerprint.com/docs/nextjs-quickstart" target="_blank">
                {t("config.quickstartLink")} <ExternalLink className="size-3 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 bg-card/60 shadow-lg md:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-primary/40 text-primary uppercase text-[10px] tracking-wider">
                    {t("results.visitorId")}
                  </Badge>
                  {visitorId && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 text-xs"
                      onClick={() => copyToClipboard(visitorId, "visitorId")}
                    >
                      {copiedField === "visitorId" ? (
                        <Check className="size-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                      {copiedField === "visitorId" ? t("results.copied") : t("results.copy")}
                    </Button>
                  )}
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-mono font-black text-primary break-all pt-2">
                  {visitorId || "Sealed / Protected"}
                </CardTitle>
                <CardDescription className="text-xs pt-1">
                  {t("results.visitorIdDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 bg-card/60 shadow-lg">
              <CardHeader className="pb-3">
                <Badge variant="outline" className="border-primary/40 text-primary uppercase text-[10px] tracking-wider w-fit">
                  {t("results.confidence")}
                </Badge>
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-mono font-black text-foreground">
                    {data.suspect_score !== undefined
                      ? `${Math.round((1 - data.suspect_score) * 100)}%`
                      : "99.5%"}
                  </span>
                  <Badge variant="default" className="bg-emerald-500/20 text-emerald-500 border-none text-[10px]">
                    Pro Agent
                  </Badge>
                </div>
                <CardDescription className="text-xs pt-1">
                  {t("results.confidenceDesc")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="border-primary/10 bg-card/40">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">
                    {t("results.requestId")} / event_id
                  </Badge>
                  <CardTitle className="font-mono text-sm sm:text-base text-foreground break-all">
                    {eventId}
                  </CardTitle>
                </div>
                {eventId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-xs shrink-0"
                    onClick={() => copyToClipboard(eventId, "requestId")}
                  >
                    {copiedField === "requestId" ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    {copiedField === "requestId" ? t("results.copied") : t("results.copy")}
                  </Button>
                )}
              </div>
              <CardDescription className="text-xs">
                {t("results.requestIdDesc")}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-3xl border border-primary/10 bg-card/30 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <Database className="size-4 text-primary" />
                Cache Hit
              </div>
              <p className="text-lg font-mono font-bold text-foreground">
                {data.cache_hit ? t("results.yes") : t("results.no")}
              </p>
            </div>

            <div className="p-4 rounded-3xl border border-primary/10 bg-card/30 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <ShieldCheck className="size-4 text-primary" />
                Suspect Score
              </div>
              <p className="text-lg font-mono font-bold text-foreground">
                {data.suspect_score !== undefined ? data.suspect_score : "0 (Clean)"}
              </p>
            </div>

            <div className="p-4 rounded-3xl border border-primary/10 bg-card/30 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <Lock className="size-4 text-primary" />
                Sealed Results
              </div>
              <p className="text-lg font-mono font-bold text-foreground">
                {data.sealed_result ? "Active" : "Disabled"}
              </p>
            </div>
          </div>

          <Card className="border-primary/10 bg-card/20">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-primary" />
                <CardTitle className="text-sm font-mono">{t("results.rawJson")}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-xs"
                onClick={() => copyToClipboard(JSON.stringify(data, null, 2), "rawJson")}
              >
                {copiedField === "rawJson" ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {copiedField === "rawJson" ? t("results.copied") : t("results.copy")}
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="max-h-96 overflow-auto rounded-2xl bg-muted/40 p-4 font-mono text-xs text-muted-foreground">
                {JSON.stringify(data, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export function FingerprintTester() {
  const t = useTranslations("Fingerprint");

  const envKey = process.env.NEXT_PUBLIC_FINGERPRINT_PUBLIC_KEY || "";
  const [apiKey, setApiKey] = useState<string>("");
  const [inputKey, setInputKey] = useState<string>("");
  const [region, setRegion] = useState<Region>("us");
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem("fp_public_api_key") : null;
    const initial = envKey || saved || "";
    setApiKey(initial);
    setInputKey(initial);
    if (!initial) {
      setIsConfigOpen(true);
    }
  }, [envKey]);

  const handleApplyKey = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = inputKey.trim();
    setApiKey(cleanKey);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fp_public_api_key", cleanKey);
    }
    toast.success("API Key updated");
    if (cleanKey) {
      setIsConfigOpen(false);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto w-full">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Key className="size-5 text-primary" />
                {t("config.title")}
              </CardTitle>
              <CardDescription>{t("config.description")}</CardDescription>
            </div>

            {apiKey && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                className="text-xs shrink-0 self-start sm:self-auto"
              >
                {t("config.changeKey")}
              </Button>
            )}
          </div>
        </CardHeader>

        {(isConfigOpen || !apiKey) && (
          <CardContent className="space-y-6 pt-0">
            <form onSubmit={handleApplyKey} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="apiKey" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("config.apiKeyLabel")}
                  </label>
                  {envKey && (
                    <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30">
                      ENV detected
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder={t("config.apiKeyPlaceholder")}
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <Button type="submit" className="shrink-0">
                    {t("config.saveKey")}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("config.apiKeyHelp")}{" "}
                  <Link
                    href="https://dashboard.fingerprint.com/signup"
                    target="_blank"
                    className="text-primary underline underline-offset-4 hover:opacity-80"
                  >
                    fingerprint.com
                  </Link>
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <label htmlFor="region" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("config.regionLabel")}
                </label>
                <NativeSelect
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value as Region)}
                  className="w-full sm:w-64"
                >
                  <NativeSelectOption value="us">{t("config.regionGlobal")}</NativeSelectOption>
                  <NativeSelectOption value="eu">{t("config.regionEu")}</NativeSelectOption>
                  <NativeSelectOption value="ap">{t("config.regionAp")}</NativeSelectOption>
                </NativeSelect>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {apiKey ? (
        <FingerprintProvider
          key={`${apiKey}-${region}`}
          apiKey={apiKey}
          region={region}
        >
          <VisitorResultView apiKey={apiKey} />
        </FingerprintProvider>
      ) : (
        <Card className="border-dashed border-primary/30 bg-muted/10 text-center p-8">
          <CardHeader className="space-y-3">
            <div className="mx-auto size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Key className="size-6" />
            </div>
            <CardTitle className="text-xl">{t("config.noKeyAlert")}</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              {t("config.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="https://docs.fingerprint.com/docs/nextjs-quickstart" target="_blank">
                {t("config.quickstartLink")} <ExternalLink className="size-3.5 ml-1" />
              </Link>
            </Button>
            <Button asChild>
              <Link href="https://dashboard.fingerprint.com/signup" target="_blank">
                dashboard.fingerprint.com <ExternalLink className="size-3.5 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="border-primary/10 bg-card/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Terminal className="size-4 text-primary" />
            {t("quickstartGuide.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
          <div className="space-y-1.5 p-4 rounded-2xl bg-muted/20 border border-primary/5">
            <p className="font-semibold text-foreground text-sm">
              {t("quickstartGuide.step1")}
            </p>
            <p>{t("quickstartGuide.step1Desc")}</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-muted/20 border border-primary/5">
            <p className="font-semibold text-foreground text-sm">
              {t("quickstartGuide.step2")}
            </p>
            <p>{t("quickstartGuide.step2Desc")}</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-muted/20 border border-primary/5">
            <p className="font-semibold text-foreground text-sm">
              {t("quickstartGuide.step3")}
            </p>
            <p>{t("quickstartGuide.step3Desc")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
