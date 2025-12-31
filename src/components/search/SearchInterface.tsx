'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Command, ChevronRight, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAutocomplete, SuggestionResult } from '@/lib/hooks/useAutocomplete';

export default function SearchInterface() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [suggestions, setSuggestions] = useState<SuggestionResult[]>([]);
    const { getSuggestions } = useAutocomplete();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (query.trim()) {
            const results = getSuggestions(query);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
        setSelectedIndex(-1);
    }, [query, getSuggestions]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            setQuery(suggestions[selectedIndex].word);
            setSuggestions([]);
        } else if (e.key === 'Escape') {
            setIsFocused(false);
            inputRef.current?.blur();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-20 relative z-10">
            <div className="text-center space-y-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary"
                >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold tracking-widest uppercase">Algorithms Made Visible</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-cta font-bold text-foreground"
                >
                    Interactive Demo Hub
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                >
                    Experience real-time autocomplete powered by advanced Trie data structures.
                    Watch algorithms come alive with every keystroke.
                </motion.p>
            </div>

            <div className="relative">
                <div className={cn(
                    "absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-xl transition-opacity duration-500",
                    isFocused ? "opacity-30" : "opacity-0"
                )} />

                <div className={cn(
                    "relative glassmorphic rounded-2xl border-2 transition-all duration-300",
                    isFocused ? "border-primary/50 ring-4 ring-primary/10 shadow-neural" : "border-white/10"
                )}>
                    <div className="flex items-center px-6 py-5">
                        <Search className={cn(
                            "w-6 h-6 transition-colors duration-300 mr-4",
                            isFocused ? "text-primary" : "text-muted-foreground"
                        )} />

                        <div className="relative flex-grow">
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                onKeyDown={handleKeyDown}
                                placeholder="Start typing to see magic happen..."
                                className="w-full bg-transparent border-none outline-none text-xl font-sans text-foreground placeholder:text-muted-foreground/50"
                            />

                            {isFocused && query === '' && (
                                <motion.div
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 top-1.5 w-[2px] h-6 bg-primary"
                                />
                            )}
                        </div>

                        <div className="flex items-center space-x-2 text-muted-foreground/30">
                            <Command className="w-4 h-4" />
                            <span className="text-xs font-mono font-bold tracking-tighter">K</span>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isFocused && suggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="border-t border-white/10 px-2 py-3"
                            >
                                {suggestions.map((item, index) => (
                                    <button
                                        key={item.word}
                                        onClick={() => {
                                            setQuery(item.word);
                                            setSuggestions([]);
                                        }}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all group",
                                            index === selectedIndex ? "bg-primary/10 text-primary shadow-sm" : "text-foreground/70"
                                        )}
                                    >
                                        <div className="flex items-center space-x-3">
                                            {item.type === 'correction' ? (
                                                <Wand2 className={cn("w-4 h-4", index === selectedIndex ? "text-primary" : "text-amber-500")} />
                                            ) : (
                                                <Search className={cn("w-4 h-4", index === selectedIndex ? "text-primary" : "text-muted-foreground")} />
                                            )}
                                            <div className="flex flex-col">
                                                <span className="font-medium">{item.word}</span>
                                                {item.type === 'correction' && (
                                                    <span className="text-[10px] text-amber-500 font-mono">Suggested correction</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-[10px] font-mono font-bold text-muted-foreground/50 uppercase">Score: {item.frequency}</span>
                                            <ChevronRight className={cn(
                                                "w-4 h-4 transition-transform",
                                                index === selectedIndex ? "translate-x-1 opacity-100" : "opacity-0"
                                            )} />
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-wrap justify-center gap-4"
            >
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-mono text-muted-foreground">Trie Engine Active</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-xs font-mono text-muted-foreground">Spell Checker Online</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-mono text-muted-foreground">Hybrid Mode Enabled</span>
                </div>
            </motion.div>
        </div>
    );
}
