'use client';

import { useState, useCallback, useMemo } from 'react';
import { Trie } from '@/lib/dsa/Trie';
import { BKTree } from '@/lib/dsa/SpellChecker';
import { PriorityQueue } from '@/lib/dsa/PriorityQueue';

// Large dictionary sample
const DICTIONARY_DATA: { [key: string]: number } = {
    'algorithm': 156, 'algorithms': 89, 'autocomplete': 234, 'automate': 67, 'automation': 145,
    'artificial intelligence': 176, 'interface': 134, 'interactive': 167, 'data': 289,
    'database': 178, 'structure': 156, 'search': 245, 'binary': 167, 'tree': 198,
    'graph': 145, 'node': 234, 'network': 189, 'neural': 156, 'machine': 198,
    'learning': 223, 'deep': 145, 'model': 178, 'performance': 189, 'efficiency': 156,
    'google': 500, 'engine': 300, 'system': 350, 'design': 400,
    'computer': 200, 'science': 250, 'technology': 300, 'frontend': 150, 'backend': 150,
    'developer': 180, 'engineer': 220, 'react': 400, 'typescript': 350, 'javascript': 300,
    'tailwind': 200, 'framer': 150, 'motion': 150, 'threejs': 120, 'visualizer': 100
};

export interface SuggestionResult {
    word: string;
    frequency: number;
    type: 'autocomplete' | 'correction';
    score: number;
}

export function useAutocomplete() {
    const trie = useMemo(() => {
        const t = new Trie();
        Object.entries(DICTIONARY_DATA).forEach(([word, freq]) => t.insert(word, freq));
        return t;
    }, []);

    const bkTree = useMemo(() => {
        const bk = new BKTree();
        Object.keys(DICTIONARY_DATA).forEach(word => bk.add(word));
        return bk;
    }, []);

    const getSuggestions = useCallback((query: string): SuggestionResult[] => {
        if (!query) return [];

        const normalizedQuery = query.toLowerCase().trim();

        // 1. Get Autocomplete candidates
        const autocompleteMatches = trie.search(normalizedQuery);

        // 2. Get Spell Correction candidates if query is long enough and few results found
        let correctionMatches: { word: string; distance: number }[] = [];
        if (normalizedQuery.length >= 3) {
            correctionMatches = bkTree.search(normalizedQuery, 2);
        }

        // 3. Rank results using a Priority Queue
        // Score formula: (Frequency / 10) - (Distance * 10)
        const pq = new PriorityQueue<SuggestionResult>((a: SuggestionResult, b: SuggestionResult) => b.score - a.score);

        const seen = new Set<string>();

        autocompleteMatches.forEach((match: { word: string; frequency: number }) => {
            seen.add(match.word);
            pq.push({
                word: match.word,
                frequency: match.frequency,
                type: 'autocomplete',
                score: match.frequency / 10
            });
        });

        correctionMatches.forEach((match: { word: string; distance: number }) => {
            if (!seen.has(match.word)) {
                seen.add(match.word);
                const freq = DICTIONARY_DATA[match.word] || 1;
                pq.push({
                    word: match.word,
                    frequency: freq,
                    type: 'correction',
                    score: (freq / 10) - (match.distance * 10)
                });
            }
        });

        const finalResults: SuggestionResult[] = [];
        while (pq.size() > 0 && finalResults.length < 8) {
            finalResults.push(pq.pop()!);
        }

        return finalResults;
    }, [trie, bkTree]);

    return { getSuggestions };
}
