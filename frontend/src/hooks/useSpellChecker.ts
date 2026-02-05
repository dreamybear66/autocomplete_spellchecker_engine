'use client';

import { useState, useCallback } from 'react';
import { findClosestMatches } from '@/lib/dsa/LevenshteinDistance';
import { getDictionaryWords } from '@/data/dictionary';

export interface SpellCheckResult {
    word: string;
    isCorrect: boolean;
    suggestions: Array<{
        word: string;
        distance: number;
        confidence: 'high' | 'medium' | 'low';
    }>;
}

export function useSpellChecker() {
    const [inputText, setInputText] = useState('');
    const [results, setResults] = useState<SpellCheckResult[]>([]);
    const [metrics, setMetrics] = useState({
        totalWords: 0,
        errorsFound: 0,
        correctionsApplied: 0,
        checkTime: 0,
    });

    const dictionary = getDictionaryWords();

    const checkSpelling = useCallback((text: string) => {
        if (!text.trim()) {
            setResults([]);
            setMetrics({
                totalWords: 0,
                errorsFound: 0,
                correctionsApplied: 0,
                checkTime: 0,
            });
            return;
        }

        const startTime = performance.now();

        // Split text into words
        const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
        const uniqueWords = Array.from(new Set(words));

        // Check each word
        const checkResults: SpellCheckResult[] = uniqueWords.map(word => {
            const isCorrect = dictionary.includes(word);

            if (isCorrect) {
                return {
                    word,
                    isCorrect: true,
                    suggestions: [],
                };
            }

            // Find suggestions for misspelled words
            const suggestions = findClosestMatches(word, dictionary, 2, 5);

            return {
                word,
                isCorrect: false,
                suggestions,
            };
        });

        const endTime = performance.now();
        const checkTime = Math.round((endTime - startTime) * 100) / 100;

        const errorsFound = checkResults.filter(r => !r.isCorrect).length;

        setResults(checkResults);
        setMetrics({
            totalWords: uniqueWords.length,
            errorsFound,
            correctionsApplied: 0,
            checkTime,
        });
    }, [dictionary]);

    const handleTextChange = useCallback((text: string) => {
        setInputText(text);
        checkSpelling(text);
    }, [checkSpelling]);

    const applyCorrection = useCallback((originalWord: string, correction: string) => {
        const newText = inputText.replace(new RegExp(`\\b${originalWord}\\b`, 'gi'), correction);
        setInputText(newText);
        checkSpelling(newText);
        setMetrics(prev => ({
            ...prev,
            correctionsApplied: prev.correctionsApplied + 1,
        }));
    }, [inputText, checkSpelling]);

    return {
        inputText,
        results,
        metrics,
        handleTextChange,
        applyCorrection,
    };
}
