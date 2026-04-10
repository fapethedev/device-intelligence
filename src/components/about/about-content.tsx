"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink, Lightbulb, Rocket, ShieldCheck } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin, FaReact, FaTwitter } from "react-icons/fa6";
import { SiFramer, SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const techStack = [
  { name: "Next.js 16", icon: SiNextdotjs, color: "text-black" },
  { name: "React 19", icon: FaReact, color: "text-[#61DAFB]" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#38B2AC]" },
  { name: "Framer Motion", icon: SiFramer, color: "text-[#E91E63]" },
  { name: "ClientJS", icon: ShieldCheck, color: "text-primary" },
];

const changelog = [
  { version: "v1.2.0", date: "Avril 2026", changes: ["Intégration de Leaflet pour la cartographie IP", "Système d'exportation PDF/PNG", "Nouvelle interface Forensics"] },
  { version: "v1.1.0", date: "Mars 2026", changes: ["Ajout du support IPAPI.co", "Animations Framer Motion avancées", "Partage social"] },
  { version: "v1.0.0", date: "Février 2026", changes: ["Lancement initial avec ClientJS", "Détection de base de l'OS et du navigateur"] },
];


export default function AboutContent() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
            <Lightbulb className="text-primary" />
            Pourquoi FingerPrinter ?
          </div>
          <div className="text-justify space-y-4 text-muted-foreground">
            <p>
              À une époque où chaque interaction numérique laisse une trace, comprendre ce que votre navigateur
              divulgue sur vous est devenu essentiel. FingerPrinter utilise des techniques de <strong>heuristic analysis</strong>
              pour extraire des métadonnées que peu d'utilisateurs soupçonnent.
            </p>
            <p>
              Notre mission est de fournir un audit complet de votre identité numérique, du matériel physique
              (GPU, CPU) aux couches logicielles et réseau, tout en offrant des outils pour exporter ces données
              à des fins d'analyse de sécurité.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
            <Rocket className="text-primary" />
            Utilité du Projet
          </div>
          <ul className="space-y-4">
            {[
              "Audit de confidentialité pour développeurs et chercheurs.",
              "Analyse forensic rapide de l'environnement client.",
              "Éducation sur les vecteurs de fingerprinting moderne.",
              "Génération de rapports de compatibilité système."
            ].map((text, i) => (
              <li key={i} className="flex gap-3 items-start p-4 rounded-xl border border-primary/5 bg-primary/5">
                <ShieldCheck className="text-primary mt-1 shrink-0" size={18} />
                <span className="text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight">Stack Technique</h2>
          <p className="text-muted-foreground">Les technologies de pointe qui propulsent FingerPrinter.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl border border-primary/10 bg-card flex flex-col items-center gap-4 text-center group transition-all hover:border-primary/40"
            >
              <tech.icon className={cn("text-4xl transition-transform group-hover:scale-110", tech.color)} />
              <span className="text-xs font-bold uppercase tracking-widest">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 border-y border-primary/5 bg-primary/5 -mx-6 px-6 shadow rounded-2xl">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-64 h-64 rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl relative z-10">
              <Image
                src="https://github.com/fapethedev.png"
                alt="Fapethedev"
                width={256}
                height={256}
                className="object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 blur-3xl z-0" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 blur-3xl z-0" />
          </motion.div>

          <div className="grow space-y-6">
            <div>
              <Badge variant="outline" className="text-primary border-primary/20 mb-2 uppercase">Développeur Principal</Badge>
              <h2 className="font-heading text-4xl font-black uppercase tracking-tighter">Fapethedev</h2>
              <p className="text-muted-foreground leading-relaxed text-justify">
                Passionné par le développement Web, j'aime construire des outils qui
                rendent le complexe accessible. DI - FingerPrinter est l'un de mes projets du mêlant
                UI/UX léché et exploration technique profonde.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="https://www.linkedin.com/in/abiola-fatigba-a0532a27b/" target="_blank" className="p-3 bg-card rounded-xl hover:text-primary border border-primary/10 transition-colors">
                <FaLinkedin size={24} />
              </Link>
              <Link href="#" target="_blank" className="p-3 bg-card rounded-xl hover:text-primary border border-primary/10 transition-colors">
                <FaTwitter size={24} />
              </Link>
              <Link href="#" target="_blank" className="p-3 bg-card rounded-xl hover:text-primary border border-primary/10 transition-colors">
                <FaFacebook size={24} />
              </Link>
              <Link href="https://github.com/fapethedev" target="_blank" className="p-3 bg-card rounded-xl hover:text-primary border border-primary/10 transition-colors">
                <FaGithub size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-12 pb-12">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight">Changelog GitHub</h2>
          <Link href="https://github.com/fapethedev/device-intelligence" className="group transition-all duration-500 underline underline-offset-2 hover:underline-offset-4 text-primary text-sm font-bold flex items-center gap-1">
            Voir sur GitHub <ExternalLink className="rotate-45 group-hover:rotate-0" size={14} />
          </Link>
        </div>
        <div className="space-y-8">
          {changelog.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-primary/10"
            >
              <div className="absolute top-0 -left-2.25 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                <span className="text-xl font-bold font-mono text-primary">{entry.version}</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{entry.date}</span>
              </div>
              <ul className="space-y-2">
                {entry.changes.map((change, j) => (
                  <li key={j} className="text-muted-foreground text-sm flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary/40" />
                    {change}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}