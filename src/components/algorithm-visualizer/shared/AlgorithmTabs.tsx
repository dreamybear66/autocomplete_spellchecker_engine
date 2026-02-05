'use client';

import { Sparkles, Calculator, Layers, Database } from 'lucide-react';

interface Tab {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
    {
        id: 'trie',
        name: 'Trie Visualization',
        description: 'Real-time prefix tree traversal',
        icon: Sparkles
    },
    {
        id: 'edit-distance',
        name: 'Edit Distance',
        description: 'Levenshtein distance matrix',
        icon: Calculator
    },
    {
        id: 'data-structures',
        name: 'Data Structures',
        description: 'Interactive structure explorer',
        icon: Database
    }
];

interface AlgorithmTabsProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export default function AlgorithmTabs({ activeTab, onTabChange }: AlgorithmTabsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${isActive
                            ? 'bg-primary/10 border-primary shadow-neon'
                            : 'bg-background-card border-border hover:border-primary/50'
                            }`}
                    >
                        <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${isActive ? 'bg-primary/20' : 'bg-background-tertiary'
                                }`}>
                                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400'
                                    }`} />
                            </div>
                            <div className="flex-1">
                                <h3 className={`font-mono font-semibold text-sm mb-1 ${isActive ? 'text-primary' : 'text-white'
                                    }`}>
                                    {tab.name}
                                </h3>
                                <p className="text-xs text-gray-400 font-mono">
                                    {tab.description}
                                </p>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
