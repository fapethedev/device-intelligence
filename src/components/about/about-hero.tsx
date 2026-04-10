"use client";

import React from "react";
import { motion } from "motion/react";
import { Building } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="text-center space-y-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4"
      >
        <Building size={32} />
      </motion.div>
      <h1 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter">
        Notre <span className="text-primary">Histoire</span> & Vision
      </h1>
      <p className="text-muted-foreground text-lg">
        FingerPrinter est né d'une volonté de démocratiser la compréhension de la vie privée en ligne
        et de l'intelligence système à travers des outils simples et puissants.
      </p>
    </section>
  )
}