'use client';

import { useState, useCallback, useEffect } from 'react';

export interface TrieNode {
    char: string;
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    frequency: number;
    id: string;
}

export interface AnimationStep {
    type: 'traverse' | 'create' | 'mark_end' | 'search_result';
    nodeId: string;
    char: string;
    message: string;
}

export interface TrieMetrics {
    operations: number;
    timeMs: number;
    memoryBytes: number;
}

export function useTrieVisualization() {
    const [root, setRoot] = useState<TrieNode>(createNode('', 'root'));
    const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(1);
    const [metrics, setMetrics] = useState<TrieMetrics>({
        operations: 0,
        timeMs: 0,
        memoryBytes: 0
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [activeOperation, setActiveOperation] = useState<'insert' | 'search'>('insert');

    // Create a new Trie node
    function createNode(char: string, id: string): TrieNode {
        return {
            char,
            children: new Map(),
            isEndOfWord: false,
            frequency: 0,
            id
        };
    }

    // Insert a word into the Trie and generate animation steps
    const insertWord = useCallback((word: string) => {
        const startTime = performance.now();
        const steps: AnimationStep[] = [];
        let current = root;
        let operations = 0;
        let nodeIdCounter = 0;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            operations++;

            if (!current.children.has(char)) {
                const newNode = createNode(char, `${current.id}-${char}-${nodeIdCounter++}`);
                current.children.set(char, newNode);

                steps.push({
                    type: 'create',
                    nodeId: newNode.id,
                    char,
                    message: `Creating new node for '${char}'`
                });
            } else {
                steps.push({
                    type: 'traverse',
                    nodeId: current.children.get(char)!.id,
                    char,
                    message: `Traversing to existing node '${char}'`
                });
            }

            current = current.children.get(char)!;
        }

        current.isEndOfWord = true;
        current.frequency++;
        operations++;

        steps.push({
            type: 'mark_end',
            nodeId: current.id,
            char: current.char,
            message: `Marked '${word}' as end of word (frequency: ${current.frequency})`
        });

        const endTime = performance.now();
        const timeMs = parseFloat((endTime - startTime).toFixed(2));
        const memoryBytes = word.length * 24; // Approximate memory per node

        setAnimationSteps(steps);
        setCurrentStep(0);
        setMetrics({
            operations,
            timeMs,
            memoryBytes: metrics.memoryBytes + memoryBytes
        });
        setRoot({ ...root });
    }, [root, metrics.memoryBytes]);

    // Search for words with a given prefix
    const searchPrefix = useCallback((prefix: string) => {
        const startTime = performance.now();
        const steps: AnimationStep[] = [];
        let current = root;
        let operations = 0;

        // Navigate to prefix
        for (const char of prefix) {
            operations++;
            if (!current.children.has(char)) {
                const endTime = performance.now();
                setMetrics({
                    operations,
                    timeMs: parseFloat((endTime - startTime).toFixed(2)),
                    memoryBytes: metrics.memoryBytes
                });
                setAnimationSteps([]);
                return [];
            }

            steps.push({
                type: 'traverse',
                nodeId: current.children.get(char)!.id,
                char,
                message: `Navigating through '${char}'`
            });

            current = current.children.get(char)!;
        }

        // DFS to collect all words
        const results: Array<{ word: string; freq: number }> = [];

        function dfs(node: TrieNode, path: string) {
            operations++;
            if (node.isEndOfWord) {
                results.push({ word: prefix + path, freq: node.frequency });
                steps.push({
                    type: 'search_result',
                    nodeId: node.id,
                    char: node.char,
                    message: `Found word: ${prefix + path} (freq: ${node.frequency})`
                });
            }

            for (const [char, child] of Array.from(node.children.entries())) {
                dfs(child, path + char);
            }
        }

        dfs(current, '');

        const endTime = performance.now();
        setAnimationSteps(steps);
        setCurrentStep(0);
        setMetrics({
            operations,
            timeMs: parseFloat((endTime - startTime).toFixed(2)),
            memoryBytes: metrics.memoryBytes
        });

        return results.sort((a, b) => b.freq - a.freq).map(r => r.word);
    }, [root, metrics.memoryBytes]);

    // Animation playback controls
    const play = useCallback(() => {
        setIsPlaying(true);
    }, []);

    const pause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const reset = useCallback(() => {
        setCurrentStep(0);
        setIsPlaying(false);
    }, []);

    const stepForward = useCallback(() => {
        if (currentStep < animationSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    }, [currentStep, animationSteps.length]);

    const stepBackward = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    // Auto-advance animation
    useEffect(() => {
        if (isPlaying && currentStep < animationSteps.length - 1) {
            const timeout = setTimeout(() => {
                setCurrentStep(currentStep + 1);
            }, 1000 / animationSpeed);
            return () => clearTimeout(timeout);
        } else if (currentStep >= animationSteps.length - 1) {
            setIsPlaying(false);
        }
    }, [isPlaying, currentStep, animationSteps.length, animationSpeed]);

    // Handle search query changes
    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            if (activeOperation === 'insert') {
                insertWord(query.toLowerCase());
            } else {
                searchPrefix(query.toLowerCase());
            }
        }
    }, [activeOperation, insertWord, searchPrefix]);

    return {
        root,
        animationSteps,
        currentStep,
        isPlaying,
        animationSpeed,
        metrics,
        searchQuery,
        activeOperation,
        setAnimationSpeed,
        setActiveOperation,
        handleSearchChange,
        play,
        pause,
        reset,
        stepForward,
        stepBackward,
        insertWord,
        searchPrefix
    };
}
