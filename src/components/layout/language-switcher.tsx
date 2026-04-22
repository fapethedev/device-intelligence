"use client";

import React, { useTransition } from "react";
import { Locale, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Languages } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: newLocale as Locale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isPending}>
        <Button variant="outline" size="icon">
          <Languages size={18} />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("fr")}
          className={locale === "fr" ? "bg-primary" : ""}
        >
          Français
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={locale === "en" ? "bg-primary" : ""}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
