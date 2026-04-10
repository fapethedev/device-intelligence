"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi"

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/5 bg-background pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="text-primary w-8 h-8" />
              <span className="font-black text-2xl tracking-tighter uppercase">
                Finger<span className="text-primary">Printer</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm">
              Plateforme d'intelligence système et de fingerprinting avancée.
              Explorez les capacités de votre navigateur et détectez les vecteurs d'empreinte numérique.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://github.com" className="p-2 bg-muted/50 rounded-lg hover:text-primary transition-colors">
                <FiGithub size={20} />
              </Link>
              <Link href="https://linkedin.com" className="p-2 bg-muted/50 rounded-lg hover:text-[#0A66C2] transition-colors">
                <FaLinkedin size={20} />
              </Link>
              <Link href="https://twitter.com" className="p-2 bg-muted/50 rounded-lg hover:text-[#1DA1F2] transition-colors">
                <FaTwitter size={20} />
              </Link>
              <Link href="https://facebook.com" className="p-2 bg-muted/50 rounded-lg hover:text-[#1877F2] transition-colors">
                <FaFacebook size={20} />
              </Link>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest text-primary">Plateforme</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link href="/test-clientjs" className="hover:text-primary transition-colors">ClientJS Scan</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">À propos</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest text-primary">Ressources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="https://github.com/jackspirou/clientjs" className="hover:text-primary transition-colors">ClientJS Lib</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} FingerPrinter. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Created with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> by 
            <Link 
              href="https://www.linkedin.com/in/fapethedev/" 
              className="font-bold text-foreground hover:text-primary transition-colors ml-1 underline underline-offset-4"
            >
              Fapethedev
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
