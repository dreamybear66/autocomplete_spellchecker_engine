'use client';

import { useState } from 'react';
import { Network, Hash, Layers } from 'lucide-react';

type DataStructure = 'trie' | 'hashmap' | 'priority-queue';

interface Operation {
    name: string;
    complexity: string;
    description: string;
}

interface UseCase {
    text: string;
}

interface Point {
    text: string;
}

export default function DataStructureExplorer() {
    const [activeStructure, setActiveStructure] = useState<DataStructure>('trie');

    const structures = {
        trie: {
            name: 'Trie (Prefix Tree)',
            icon: Network,
            description: 'A tree-like data structure used for efficient string storage and retrieval. Each node represents a character, and paths from root to leaf form complete words.',
            operations: [
                { name: 'Insert', complexity: 'O(m)', description: 'Add a word to the trie by creating nodes for each character' },
                { name: 'Search', complexity: 'O(m)', description: 'Find if a word exists in the trie by traversing character nodes' },
                { name: 'Prefix Search', complexity: 'O(p + n)', description: 'Find all words starting with a given prefix' },
                { name: 'Delete', complexity: 'O(m)', description: 'Remove a word from the trie by unmarking end-of-word nodes' }
            ],
            useCases: [
                { text: 'Autocomplete systems' },
                { text: 'Spell checkers' },
                { text: 'IP routing tables' },
                { text: 'Phone directory lookups' },
                { text: 'Dictionary implementations' }
            ],
            advantages: [
                { text: 'Fast prefix-based searches' },
                { text: 'Memory efficient for common prefixes' },
                { text: 'No hash collisions' },
                { text: 'Alphabetically sorted output' }
            ],
            disadvantages: [
                { text: 'Higher memory usage for sparse data' },
                { text: 'Slower than hash tables for exact matches' },
                { text: 'Complex implementation' },
                { text: 'Cache-unfriendly for large datasets' }
            ]
        },
        hashmap: {
            name: 'Hash Map',
            icon: Hash,
            description: 'A data structure that maps keys to values using a hash function. Provides constant-time average case for insertions, deletions, and lookups.',
            operations: [
                { name: 'Insert', complexity: 'O(1) avg', description: 'Add a key-value pair using hash function to determine position' },
                { name: 'Search', complexity: 'O(1) avg', description: 'Retrieve value associated with a key in constant time' },
                { name: 'Delete', complexity: 'O(1) avg', description: 'Remove a key-value pair from the hash map' },
                { name: 'Resize', complexity: 'O(n)', description: 'Rehash all entries when load factor exceeds threshold' }
            ],
            useCases: [
                { text: 'Caching systems' },
                { text: 'Database indexing' },
                { text: 'Frequency counting' },
                { text: 'Symbol tables in compilers' },
                { text: 'Session management' }
            ],
            advantages: [
                { text: 'Fast average-case operations' },
                { text: 'Simple implementation' },
                { text: 'Flexible key types' },
                { text: 'Memory efficient for dense data' }
            ],
            disadvantages: [
                { text: 'Worst-case O(n) for collisions' },
                { text: 'No ordering of elements' },
                { text: 'Hash function quality critical' },
                { text: 'Resizing overhead' }
            ]
        },
        'priority-queue': {
            name: 'Priority Queue',
            icon: Layers,
            description: 'An abstract data type where each element has a priority. Elements with higher priority are served before elements with lower priority.',
            operations: [
                { name: 'Insert', complexity: 'O(log n)', description: 'Add element while maintaining heap property' },
                { name: 'Extract Max/Min', complexity: 'O(log n)', description: 'Remove and return highest/lowest priority element' },
                { name: 'Peek', complexity: 'O(1)', description: 'View highest/lowest priority element without removal' },
                { name: 'Heapify', complexity: 'O(n)', description: 'Build heap from unsorted array' }
            ],
            useCases: [
                { text: 'Task scheduling' },
                { text: 'Dijkstra\'s shortest path' },
                { text: 'Huffman coding' },
                { text: 'Event-driven simulation' },
                { text: 'Load balancing' }
            ],
            advantages: [
                { text: 'Efficient priority-based access' },
                { text: 'Logarithmic insertion/deletion' },
                { text: 'Constant-time peek' },
                { text: 'Space efficient' }
            ],
            disadvantages: [
                { text: 'No random access' },
                { text: 'Searching is O(n)' },
                { text: 'Not cache-friendly' },
                { text: 'Complex to implement correctly' }
            ]
        }
    };

    const currentStructure = structures[activeStructure];
    const Icon = currentStructure.icon;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                    <Network className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-mono font-bold text-white">Data Structure Explorer</h2>
            </div>

            {/* Sub-tabs */}
            <div className="flex gap-3">
                <button
                    onClick={() => setActiveStructure('trie')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm font-semibold transition-all ${activeStructure === 'trie'
                            ? 'bg-primary text-background shadow-neon'
                            : 'bg-background-tertiary text-gray-400 hover:text-white hover:bg-background-tertiary/70'
                        }`}
                >
                    <Network className="w-4 h-4" />
                    Trie (Prefix Tree)
                </button>
                <button
                    onClick={() => setActiveStructure('hashmap')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm font-semibold transition-all ${activeStructure === 'hashmap'
                            ? 'bg-primary text-background shadow-neon'
                            : 'bg-background-tertiary text-gray-400 hover:text-white hover:bg-background-tertiary/70'
                        }`}
                >
                    <Hash className="w-4 h-4" />
                    Hash Map
                </button>
                <button
                    onClick={() => setActiveStructure('priority-queue')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm font-semibold transition-all ${activeStructure === 'priority-queue'
                            ? 'bg-primary text-background shadow-neon'
                            : 'bg-background-tertiary text-gray-400 hover:text-white hover:bg-background-tertiary/70'
                        }`}
                >
                    <Layers className="w-4 h-4" />
                    Priority Queue
                </button>
            </div>

            {/* Content */}
            <div className="bg-background-card border border-border rounded-xl p-6 space-y-6">
                {/* Title and Description */}
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-mono font-bold text-white mb-2">{currentStructure.name}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{currentStructure.description}</p>
                    </div>
                </div>

                {/* Operations & Complexity */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h4 className="text-lg font-mono font-bold text-white">Operations & Complexity</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentStructure.operations.map((op, index) => (
                            <div key={index} className="bg-background-tertiary/50 border border-border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono font-semibold text-white">{op.name}</span>
                                    <span className="font-mono text-sm text-primary">{op.complexity}</span>
                                </div>
                                <p className="text-xs text-gray-400">{op.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Use Cases */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="text-lg font-mono font-bold text-white">Use Cases</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentStructure.useCases.map((useCase, index) => (
                            <div key={index} className="flex items-center gap-3 bg-background-tertiary/30 border border-border/50 rounded-lg p-3">
                                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                                <span className="text-sm text-gray-300">{useCase.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Advantages & Disadvantages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Advantages */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <h4 className="text-lg font-mono font-bold text-white">Advantages</h4>
                        </div>
                        <div className="space-y-2">
                            {currentStructure.advantages.map((adv, index) => (
                                <div key={index} className="flex items-start gap-3 bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-300">{adv.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Disadvantages */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                            </svg>
                            <h4 className="text-lg font-mono font-bold text-white">Disadvantages</h4>
                        </div>
                        <div className="space-y-2">
                            {currentStructure.disadvantages.map((dis, index) => (
                                <div key={index} className="flex items-start gap-3 bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-300">{dis.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
