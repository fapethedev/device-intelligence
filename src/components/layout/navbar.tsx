"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { ShieldCheck, Zap, Info, BookOpen, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil", icon: Zap },
  { href: "/scanner", label: "ClientJS Scan", icon: Scan },
  { href: "/about", label: "À propos", icon: Info },
  { href: "/docs", label: "Documentation", icon: BookOpen },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  
  // Effects for the "resize on scroll" behavior
  const height = useTransform(scrollY, [0, 100], [80, 60]);
  const backgroundColor = useTransform(
    scrollY, 
    [0, 100], 
    ["rgba(3, 7, 18, 0)", "rgba(3, 7, 18, 0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  return (
    <motion.header
      style={{ height, backgroundColor, backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-primary/0 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
            <ShieldCheck className="text-primary w-6 h-6" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase hidden sm:block">
            Finger<span className="text-primary">Printer</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-muted/20 p-1 rounded-full border border-primary/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full flex items-center gap-2",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <link.icon size={14} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/scanner">
            <Button size="sm" className="gap-2 shadow-lg shadow-primary/20 hidden sm:flex">
              <Scan size={16} />
              Lancer un Scan
            </Button>
            <Button size="icon" className="sm:hidden rounded-full">
               <Scan size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
