'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="container py-20 max-w-4xl mx-auto space-y-16">
            <section className="text-center space-y-6">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-5xl md:text-7xl font-cta font-bold"
                >
                    About The Engine
                </motion.h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    The Autocomplete & Spell Correction Engine is a technical showcase of advanced data structures
                    and system design principles, built with a focus on web performance and developer experience.
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="glassmorphic p-8 rounded-2xl border-white/10 space-y-6">
                    <h3 className="text-xl font-bold font-cta">Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Our goal was to create a tool that isn't just a college demo, but a production-quality
                        demonstration of how search systems at scale (like Google or modern IDEs) handle
                        real-time user input efficiently.
                    </p>
                </div>

                <div className="glassmorphic p-8 rounded-2xl border-white/10 space-y-6">
                    <h3 className="text-xl font-bold font-cta">Design Philosophy</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        We believe that algorithms should be visible. By combining high-performance logic
                        with modern 3D visualizations, we make abstract concepts like Tries and BK-Trees
                        tangible and intuitive.
                    </p>
                </div>
            </div>

            <section className="space-y-8">
                <div className="flex items-center space-x-4">
                    <div className="h-px flex-grow bg-white/10" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">Technical Architecture</h3>
                    <div className="h-px flex-grow bg-white/10" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechCard label="Frontend" value="Next.js 14" />
                    <TechCard label="State" value="Zustand" />
                    <TechCard label="Animations" value="Framer Motion" />
                    <TechCard label="Logic" value="TypeScript" />
                    <TechCard label="Styling" value="Tailwind CSS" />
                    <TechCard label="3D Engine" value="Three.js" />
                    <TechCard label="Logic" value="BK-Tree / Trie" />
                    <TechCard label="Icons" value="Lucide React" />
                </div>
            </section>

            <section className="text-center space-y-8 pt-12">
                <h3 className="text-2xl font-bold font-cta">Connect With Us</h3>
                <div className="flex justify-center space-x-6">
                    <SocialLink icon={Github} href="#" />
                    <SocialLink icon={Twitter} href="#" />
                    <SocialLink icon={Linkedin} href="#" />
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                    Handcrafted with precision for the DSA community.
                </p>
            </section>
        </div>
    );
}

function TechCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase text-muted-foreground">{label}</p>
            <p className="text-sm font-bold text-foreground">{value}</p>
        </div>
    );
}

function SocialLink({ icon: Icon, href }: { icon: any; href: string }) {
    return (
        <a
            href={href}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all group"
        >
            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </a>
    );
}
