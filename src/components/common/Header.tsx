'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Search,
  SpellCheck,
  Eye,
  Info,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const navItems = [
  { name: 'Autocomplete', href: '/autocomplete-engine', icon: Search },
  { name: 'Spell Checker', href: '/spell-checker-engine', icon: SpellCheck },
  { name: 'Visualizer', href: '/algorithm-visualizer', icon: Eye },
  { name: 'Performance', href: '/performance-laboratory', icon: Info },
  { name: 'Verification', href: '/verification', icon: ShieldCheck },
  { name: 'About', href: '/about', icon: Info },
];

export default function Header() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-neural group-hover:scale-110 transition-transform">
            <Search className="w-5 h-5 text-primary-foreground font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-cta font-bold tracking-tight text-foreground">AutoComplete Pro</span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Algorithms Made Visible</span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredPath(item.href)}
                onMouseLeave={() => setHoveredPath(null)}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-lg border-b-2 border-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {hoveredPath === item.href && !isActive && (
                  <motion.div
                    layoutId="hoverTab"
                    className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-neural hover:opacity-90 transition-all active:scale-95 group">
            <span>Get Started</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
}
