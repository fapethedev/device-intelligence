"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/5 bg-background pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-2 space-y-6">
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
            <p className="text-muted-foreground max-w-sm text-sm">
              Plateforme d'intelligence système et de fingerprinting avancée.
              Explorez les capacités de votre navigateur et détectez les vecteurs d'empreinte numérique.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/fapethedev" target="_blank" className="p-2 bg-muted/50 shadow rounded-lg hover:text-primary transition-colors">
                <FiGithub size={20} />
              </Link>
              <Link href="https://www.linkedin.com/in/abiola-fatigba-a0532a27b/" target="_blank" className="p-2 bg-muted/50 shadow rounded-lg hover:text-primary transition-colors">
                <FaLinkedin size={20} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="p-2 bg-muted/50 shadow rounded-lg hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="p-2 bg-muted/50 shadow rounded-lg hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest text-primary">Plateforme</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:underline hover:underline-offset-4 hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link href="/scanner" className="hover:underline hover:underline-offset-4 hover:text-primary transition-colors">ClientJS Scan</Link></li>
              <li><Link href="/about" className="hover:underline hover:underline-offset-4 hover:text-primary transition-colors">À propos</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest text-primary">Ressources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="http://clientjs.org/" target="_blank" className="hover:underline hover:underline-offset-4 hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="https://github.com/jackspirou/clientjs" target="_blank" className="hover:underline hover:underline-offset-4 hover:text-primary transition-colors">ClientJS Lib</Link></li>
              <li><Link href="#" className="hover:underline hover:underline-offset-4 hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} FingerPrinter. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Created with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> by 
            <Link 
              href="https://www.linkedin.com/in/abiola-fatigba-a0532a27b/"
              target="_blank"
              className="italic font-bold text-foreground hover:text-primary transition-colors ml-1 underline underline-offset-4"
            >
              Fapethedev
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
