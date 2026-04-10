"use client";

import React from "react";
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { Zap, Info, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil", icon: Zap },
  { href: "/about", label: "À propos", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  
  // Effects for the "resize on scroll" behavior
  const height = useTransform(scrollY, [0, 100], [80, 60]);

  return (
    <motion.header
      style={{ height }}
      className="w-full fixed top-0 left-0 right-0 z-50 flex flex-row items-center backdrop-blur-md transition-colors duration-300"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-12 w-12">
            <Image
              src="/icon-transparent.png"
              alt="Logo"
              fill
              className="object-cover overflow-hidden"
            />
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
                  "whitespace-nowrap relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full flex items-center gap-2",
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
            <Button aria-label="scanner" size="icon" className="sm:hidden rounded-full">
               <Scan size={18} />
              <span className="sr-only"></span>
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
