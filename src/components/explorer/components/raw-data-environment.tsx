import React from "react";
import { motion } from "motion/react";
import { FileCode } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientData } from "@/components/explorer/types";

interface RawDataEnvironmentProps {
  data: ClientData | null;
}

export function RawDataEnvironment({ data }: RawDataEnvironmentProps) {
  const t = useTranslations("Scanner.rawData");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-primary/20 bg-primary/5 shadow-inner overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="text-primary" />
            {t("title")}
          </CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fonts" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1">
              <TabsTrigger value="fonts" className="data-[state=active]:bg-background">{t("tabs.fonts")}</TabsTrigger>
              <TabsTrigger value="mimeTypes" className="data-[state=active]:bg-background">{t("tabs.mime")}</TabsTrigger>
              <TabsTrigger value="plugins" className="data-[state=active]:bg-background">{t("tabs.plugins")}</TabsTrigger>
              <TabsTrigger value="canvas" className="data-[state=active]:bg-background">{t("tabs.canvas")}</TabsTrigger>
            </TabsList>
            <TabsContent value="fonts" className="mt-4 focus-visible:outline-none">
              <div className="bg-background/80 p-4 rounded-xl font-mono text-[10px] overflow-auto max-h-64 border border-primary/10 custom-scrollbar animate-in fade-in slide-in-from-bottom-2">
                {data?.fonts}
              </div>
            </TabsContent>
            <TabsContent value="mimeTypes" className="mt-4 focus-visible:outline-none">
              <div className="bg-background/80 p-4 rounded-xl font-mono text-[10px] overflow-auto max-h-64 border border-primary/10 custom-scrollbar animate-in fade-in slide-in-from-bottom-2">
                {data?.mimeTypes || t("noMime")}
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
  );
}
