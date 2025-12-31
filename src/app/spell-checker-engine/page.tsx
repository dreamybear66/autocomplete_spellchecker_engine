'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpellCheck, Wand2, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAutocomplete, SuggestionResult } from '@/lib/hooks/useAutocomplete';

export default function SpellCheckerPage() {
  const [query, setQuery] = useState('');
  const [corrections, setCorrections] = useState<SuggestionResult[]>([]);
  const { getSuggestions } = useAutocomplete();

  useEffect(() => {
    if (query.trim()) {
      const results = getSuggestions(query);
      setCorrections(results.filter(r => r.type === 'correction'));
    } else {
      setCorrections([]);
    }
  }, [query, getSuggestions]);

  return (
    <div className="container py-12 space-y-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-cta font-bold">Spell Correction Engine</h2>
          <p className="text-muted-foreground">
            Intelligent error correction using Levenshtein Distance and BK-Tree metrics.
          </p>
        </div>

        <div className="glassmorphic p-8 rounded-2xl border-white/10 space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">Teast Your Query</label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try typing 'algoritm' or 'autocomplet'..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xl outline-none focus:border-primary/50 transition-all font-sans"
              />
              <SpellCheck className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground/30" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {query && corrections.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-6 rounded-xl bg-primary/10 border border-primary/20 space-y-4"
              >
                <div className="flex items-center space-x-2 text-primary">
                  <Wand2 className="w-5 h-5" />
                  <span className="font-bold">Did you mean?</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {corrections.map((corr) => (
                    <button
                      key={corr.word}
                      onClick={() => setQuery(corr.word)}
                      className="px-4 py-2 rounded-lg bg-background border border-white/10 hover:border-primary/50 transition-all flex items-center space-x-3 group"
                    >
                      <span className="font-medium group-hover:text-primary transition-colors">{corr.word}</span>
                      <ConfidenceBadge score={corr.score} />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : query && query.length > 2 && corrections.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2 text-success p-4 rounded-xl bg-success/10 border border-success/20"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Looking good! No obvious spelling errors detected.</span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-muted-foreground">How it works</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The engine calculates the <strong>Edit Distance</strong> between your query and the dictionary.
                If the distance is within the threshold (default: 2), it ranks matches by frequency.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-muted-foreground">Confidence Metric</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Confidence is derived from a hybrid score that weights both linguistic frequency and the minimal number of character operations required to match a word.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfidenceBadge({ score }: { score: number }) {
  const level = score > 15 ? { label: 'High', color: 'bg-emerald-500' } :
    score > 5 ? { label: 'Medium', color: 'bg-amber-500' } :
      { label: 'Low', color: 'bg-red-500' };

  return (
    <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
      <div className={cn("w-1.5 h-1.5 rounded-full", level.color)} />
      <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">{level.label}</span>
      <Info className="w-3 h-3 text-muted-foreground/30" />
    </div>
  );
}
