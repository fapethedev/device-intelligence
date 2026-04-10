"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Scan, 
  BookOpen, 
  Fingerprint,
  Shield, 
  Zap, 
  Cpu, 
  Lock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa6"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full py-24 md:py-32 overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="container px-6 text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest"
          >
            <ShieldCheck size={16} />
            L'Intelligence Système Avancée
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase"
            >
              Dévoilez l'Empreinte de votre <span className="text-primary">Navigateur</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Explorez les profondeurs de votre système. Détectez les vulnérabilités de fingerprinting,
              analysez votre matériel et visualisez votre identité numérique en temps réel.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link href="/scanner">
              <Button size="lg" className="gap-2 h-14 px-8 text-lg font-bold group">
                <Scan className="group-hover:rotate-90 transition-transform" />
                Scan Now
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="gap-2 h-14 px-8 text-lg font-bold border-primary/20 bg-background/50 backdrop-blur-md">
                <BookOpen />
                Documentation
              </Button>
            </Link>
            <Link href="https://github.com">
              <Button size="lg" variant="ghost" className="gap-2 h-14 px-8 text-lg font-bold">
                <FaGithub />
                GitHub
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none -z-10">
          {[
            { Icon: Fingerprint, top: "20%", left: "10%", delay: 0 },
            { Icon: Shield, top: "60%", left: "15%", delay: 1 },
            { Icon: Zap, top: "15%", right: "12%", delay: 2 },
            { Icon: Cpu, top: "70%", right: "10%", delay: 1.5 },
            { Icon: Lock, top: "40%", right: "20%", delay: 0.5 },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="absolute text-primary/10"
              initial={{ y: 0 }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: item.delay }}
              style={{ top: item.top, left: item.left, right: item.right }}
            >
              <item.Icon size={64 + idx * 10} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container px-6 py-24 border-t border-primary/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Deep Scan", desc: "Analyse du kernel, de l'OS et des bibliothèques logicielles.", icon: Cpu },
             { title: "Network Forensics", desc: "Géolocalisation IP, détection ISP et analyse du réseau.", icon: Zap },
             { title: "Privacy Audit", desc: "Vérification des vulnérabilités de fingerprinting et des cookies.", icon: Lock }
           ].map((feature, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="p-8 rounded-2xl border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all group"
             >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
}
