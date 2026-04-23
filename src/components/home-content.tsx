"use client";

import React from "react";
import { motion } from "motion/react";
import { Cpu, Lock, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomeContent() {
  const t = useTranslations("Home.features");

  const features = [
    { title: t("deepScan.title"), desc: t("deepScan.desc"), icon: Cpu },
    { title: t("network.title"), desc: t("network.desc"), icon: Zap },
    { title: t("privacy.title"), desc: t("privacy.desc"), icon: Lock }
  ];

  return (
    <section className="container px-6 py-24 border-t border-primary/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
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