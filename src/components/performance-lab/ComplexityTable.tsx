'use client';

import { Copy } from 'lucide-react';

interface AlgorithmComplexity {
    name: string;
    description: string;
    bestCase: string;
    averageCase: string;
    worstCase: string;
    spaceComplexity: string;
}

const algorithms: AlgorithmComplexity[] = [
    {
        name: "Trie Autocomplete",
        description: "Prefix-based search with optimal lookup time",
        bestCase: "O(k)",
        averageCase: "O(k)",
        worstCase: "O(k)",
        spaceComplexity: "O(n*m)"
    },
    {
        name: "HashMap Frequency",
        description: "Constant time frequency tracking with collision handling",
        bestCase: "O(1)",
        averageCase: "O(1)",
        worstCase: "O(n)",
        spaceComplexity: "O(n)"
    },
    {
        name: "Hybrid Intelligence",
        description: "Combined approach with priority queue ranking",
        bestCase: "O(k)",
        averageCase: "O(k + log n)",
        worstCase: "O(k*n)",
        spaceComplexity: "O(n)"
    },
    {
        name: "Edit Distance (Spell Check)",
        description: "Dynamic programming for string similarity",
        bestCase: "O(m*n)",
        averageCase: "O(m*n)",
        worstCase: "O(m*n)",
        spaceComplexity: "O(m*n)"
    }
];

export default function ComplexityTable() {
    return (
        <div className="bg-background-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-xl font-mono font-bold text-white">
                    Algorithm Complexity Analysis
                </h3>
                <button className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                    <Copy className="w-4 h-4 text-primary" />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-background-tertiary/30">
                            <th className="text-left p-4 text-sm font-mono text-gray-400 font-semibold">
                                Algorithm
                            </th>
                            <th className="text-left p-4 text-sm font-mono text-gray-400 font-semibold">
                                Best Case
                            </th>
                            <th className="text-left p-4 text-sm font-mono text-gray-400 font-semibold">
                                Average Case
                            </th>
                            <th className="text-left p-4 text-sm font-mono text-gray-400 font-semibold">
                                Worst Case
                            </th>
                            <th className="text-left p-4 text-sm font-mono text-gray-400 font-semibold">
                                Space
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {algorithms.map((algo, index) => (
                            <tr
                                key={index}
                                className="border-t border-border hover:bg-background-tertiary/20 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-mono font-semibold">
                                            {algo.name}
                                        </span>
                                        <span className="text-sm text-gray-500 font-mono">
                                            {algo.description}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <code className="px-2 py-1 rounded bg-green-500/10 text-green-400 font-mono text-sm">
                                        {algo.bestCase}
                                    </code>
                                </td>
                                <td className="p-4">
                                    <code className="px-2 py-1 rounded bg-primary/10 text-primary font-mono text-sm">
                                        {algo.averageCase}
                                    </code>
                                </td>
                                <td className="p-4">
                                    <code className="px-2 py-1 rounded bg-red-500/10 text-red-400 font-mono text-sm">
                                        {algo.worstCase}
                                    </code>
                                </td>
                                <td className="p-4">
                                    <code className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 font-mono text-sm">
                                        {algo.spaceComplexity}
                                    </code>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
