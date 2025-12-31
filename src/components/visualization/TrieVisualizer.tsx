'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VisualNode {
    id: string;
    char: string;
    frequency: number;
    isEndOfWord: boolean;
    depth: number;
    isActive: boolean;
    children: VisualNode[];
    x: number;
    y: number;
}

interface TrieVisualizerProps {
    query: string;
    dictionary: { [key: string]: number };
}

export default function TrieVisualizer({ query, dictionary }: TrieVisualizerProps) {
    // Simplified Trie layout logic for visualization
    const visualData = useMemo(() => {
        if (!query) return null;

        const root: VisualNode = {
            id: 'root',
            char: 'ROOT',
            frequency: 0,
            isEndOfWord: false,
            depth: 0,
            isActive: true,
            children: [],
            x: 0,
            y: 0
        };

        const chars = query.toLowerCase().split('');
        let current = root;

        chars.forEach((char, i) => {
            const newNode: VisualNode = {
                id: `node-${i}-${char}`,
                char,
                frequency: dictionary[query.substring(0, i + 1)] || 0,
                isEndOfWord: i === chars.length - 1,
                depth: i + 1,
                isActive: true,
                children: [],
                x: 0,
                y: (i + 1) * 80
            };
            current.children.push(newNode);
            current = newNode;
        });

        return root;
    }, [query, dictionary]);

    if (!visualData) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">Awaiting Input Path...</p>
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden p-8 glassmorphic rounded-2xl border-white/10 min-h-[400px] flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-8 self-start">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-primary">Trie Traversal Path</h3>
            </div>

            <div className="relative flex flex-col items-center space-y-12">
                <NodeItem node={visualData} />
            </div>

            <div className="mt-8 self-start grid grid-cols-2 gap-4">
                <LegendItem color="bg-primary shadow-neural" label="Active Path" />
                <LegendItem color="bg-secondary" label="Branch Node" />
                <LegendItem color="bg-accent shadow-algorithm" label="Word End" />
                <LegendItem color="bg-white/10 border border-white/20" label="Potential" />
            </div>
        </div>
    );
}

function NodeItem({ node }: { node: VisualNode }) {
    return (
        <div className="flex flex-col items-center relative">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                    "w-14 h-14 rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all duration-500 relative z-10",
                    node.char === 'ROOT' ? "bg-muted border border-white/20" :
                        node.isActive ? "bg-primary text-primary-foreground shadow-neural" : "bg-white/5 border border-white/10 text-muted-foreground"
                )}
            >
                <span className="text-base font-mono">{node.char}</span>
                {node.frequency > 0 && (
                    <span className="text-[8px] font-mono absolute -bottom-6 text-primary">{node.frequency}fq</span>
                )}
            </motion.div>

            {node.children.length > 0 && (
                <>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 48 }}
                        className="w-[2px] bg-gradient-to-b from-primary to-primary/20"
                    />
                    <div className="flex items-start justify-center">
                        {node.children.map((child) => (
                            <NodeItem key={child.id} node={child} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center space-x-2">
            <div className={cn("w-3 h-3 rounded-sm", color)} />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">{label}</span>
        </div>
    );
}
