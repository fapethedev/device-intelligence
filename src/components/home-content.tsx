"use client";

import React from "react";
import { motion } from "motion/react";
import { Cpu, Lock, Zap } from "lucide-react";

export default function HomeContent() {
  return (
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
  )
}