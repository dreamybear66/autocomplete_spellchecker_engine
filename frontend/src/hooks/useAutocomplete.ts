'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Trie } from '@/lib/dsa/Trie';
import { dictionaryData } from '@/data/dictionary';

export interface AutocompleteMetrics {
    searchTime: number;
    nodesTraversed: number;
    memoryUsage: number;
    efficiency: number;
}

export interface Suggestion {
    word: string;
    frequency: number;
}

export function useAutocomplete() {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [metrics, setMetrics] = useState<AutocompleteMetrics>({
        searchTime: 0,
        nodesTraversed: 0,
        memoryUsage: 0,
        efficiency: 100,
    });

    // Initialize Trie with dictionary data
    const trie = useMemo(() => {
        const newTrie = new Trie();
        dictionaryData.forEach(({ word, frequency }) => {
            newTrie.insert(word, frequency);
        });
        return newTrie;
    }, []);

    // Calculate memory usage on mount
    useEffect(() => {
        const memoryBytes = trie.getMemoryUsage();
        const memoryKB = Math.round(memoryBytes / 1024 * 10) / 10;
        setMetrics(prev => ({ ...prev, memoryUsage: memoryKB }));
    }, [trie]);

    // Perform autocomplete search
    const performSearch = useCallback((query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            setMetrics(prev => ({
                ...prev,
                searchTime: 0,
                nodesTraversed: 0,
                efficiency: 100,
            }));
            return;
        }

        const startTime = performance.now();

        // Get node path for metrics
        const { nodesTraversed } = trie.getNodePath(query);

        // Search for suggestions
        const results = trie.search(query);

        const endTime = performance.now();
        const searchTime = Math.round((endTime - startTime) * 100) / 100;

        // Calculate efficiency (inverse of search time, normalized)
        const efficiency = Math.min(100, Math.round((1 / (searchTime + 0.01)) * 10));

        setSuggestions(results.slice(0, 10)); // Limit to top 10 suggestions
        setMetrics({
            searchTime,
            nodesTraversed,
            memoryUsage: metrics.memoryUsage,
            efficiency,
        });
    }, [trie, metrics.memoryUsage]);

    // Handle search query change
    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
        performSearch(query);
    }, [performSearch]);

    return {
        searchQuery,
        suggestions,
        metrics,
        handleSearchChange,
        dictionarySize: trie.getWordCount(),
    };
}
