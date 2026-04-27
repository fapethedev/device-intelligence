"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Download, Share, PlusSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PWAInstallButton() {
  const t = useTranslations("Scanner.hero");
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleIosClick = () => {
    setShowIosInstructions(!showIosInstructions);
  };

  return (
    <AnimatePresence>
      {(isInstallable || isIOS) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex justify-center mt-8"
        >
          {isIOS ? (
            <Popover open={showIosInstructions} onOpenChange={setShowIosInstructions}>
              <PopoverTrigger asChild>
                <Button
                  onClick={handleIosClick}
                  size="lg"
                  className="rounded-full px-8 font-bold uppercase tracking-wider gap-2 shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  {t("installBtn")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 border-2 border-primary/20 shadow-xl bg-background/95 backdrop-blur-sm">
                <div className="space-y-4">
                  <p className="text-sm font-medium leading-relaxed">
                    {t("installIOS")}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-primary">
                    <div className="flex flex-col items-center gap-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Share className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-tighter">Share</span>
                    </div>
                    <div className="h-px w-8 bg-border" />
                    <div className="flex flex-col items-center gap-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <PlusSquare className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-tighter">Add to Home</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              onClick={install}
              size="lg"
              className="rounded-full px-8 font-bold uppercase tracking-wider gap-2 shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              {t("installBtn")}
            </Button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
