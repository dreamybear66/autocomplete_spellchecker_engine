'use client';

import { useState } from 'react';
import { useAutocomplete } from '@/hooks/useAutocomplete';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { Zap, TreePine, Cpu, Gauge, Search, Lightbulb } from 'lucide-react';
import ThreeBackground from '@/components/ThreeBackground';

export default function AutocompleteEngineContent() {
    const { searchQuery, suggestions, metrics, handleSearchChange, dictionarySize } = useAutocomplete();
    const [showTutorial, setShowTutorial] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Keyboard navigation
    useKeyboardNavigation({
        onArrowUp: () => {
            if (selectedIndex > 0) {
                setSelectedIndex(selectedIndex - 1);
            }
        },
        onArrowDown: () => {
            if (selectedIndex < suggestions.length - 1) {
                setSelectedIndex(selectedIndex + 1);
            }
        },
        onEnter: () => {
            if (suggestions[selectedIndex]) {
                handleSearchChange(suggestions[selectedIndex].word);
            }
        },
        onEscape: () => setShowTutorial(false),
    });

    return (
        <>
            <ThreeBackground />
            <div className="min-h-screen bg-background relative z-10">
                <div className="pt-24 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-8 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                                <TreePine className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-mono font-medium">Trie-Based Autocomplete</span>
                            </div>
                            <h1 className="text-5xl font-mono font-bold text-white mb-4">
                                Autocomplete Engine
                            </h1>
                            <p className="text-lg text-gray-400 font-mono">
                                Real-time prefix search with Oxford Dictionary
                            </p>
                            <button
                                onClick={() => setShowTutorial(!showTutorial)}
                                className="mt-4 px-6 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/20 transition-all inline-flex items-center gap-2"
                            >
                                <Lightbulb className="w-4 h-4" />
                                Quick Tutorial
                            </button>
                        </div>

                        {/* Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
                            {/* Search Time */}
                            <div className="bg-background-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-mono">Search Time</span>
                                    <Zap className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-white">{metrics.searchTime}</span>
                                    <span className="text-sm text-gray-500 font-mono">ms</span>
                                </div>
                                <div className="mt-2 text-xs text-green-400 font-mono">+10%</div>
                            </div>

                            {/* Nodes Traversed */}
                            <div className="bg-background-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-mono">Nodes Traversed</span>
                                    <TreePine className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-white">{metrics.nodesTraversed}</span>
                                </div>
                                <div className="mt-2 text-xs text-gray-500 font-mono">nodes</div>
                            </div>

                            {/* Memory Usage */}
                            <div className="bg-background-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-mono">Memory Usage</span>
                                    <Cpu className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-white">{metrics.memoryUsage}</span>
                                    <span className="text-sm text-gray-500 font-mono">KB</span>
                                </div>
                                <div className="mt-2 text-xs text-red-400 font-mono">-6%</div>
                            </div>

                            {/* Efficiency */}
                            <div className="bg-background-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-mono">Efficiency</span>
                                    <Gauge className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-white">{metrics.efficiency}</span>
                                    <span className="text-sm text-gray-500 font-mono">%</span>
                                </div>
                                <div className="mt-2 text-xs text-green-400 font-mono">+12%</div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Left Column - Search & Suggestions */}
                            <div className="lg:col-span-7 space-y-6">
                                {/* Search Panel */}
                                <div className="bg-background-card border border-border rounded-xl p-6 animate-slide-up">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Search className="w-5 h-5 text-primary" />
                                        <h2 className="text-lg font-mono font-bold text-white">Search</h2>
                                    </div>

                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        placeholder="Type to search..."
                                        className="w-full p-4 bg-background-tertiary border border-border rounded-lg text-white font-mono text-lg placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                                        autoFocus
                                    />

                                    <div className="mt-3 text-sm text-gray-400 font-mono">
                                        Dictionary size: <span className="text-primary font-semibold">{dictionarySize.toLocaleString()}</span> words
                                    </div>
                                </div>

                                {/* Suggestions Panel */}
                                <div className="bg-background-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-mono font-bold text-white">Suggestions</h2>
                                        <span className="text-sm text-gray-400 font-mono">{suggestions.length} results</span>
                                    </div>

                                    {suggestions.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Search className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                                            <p className="text-gray-500 font-mono text-sm">Start typing to see suggestions</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 max-h-96 overflow-y-auto">
                                            {suggestions.map((suggestion, index) => (
                                                <div
                                                    key={`${suggestion.word}-${index}`}
                                                    className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer ${selectedIndex === index
                                                            ? 'bg-primary/20 border border-primary/50'
                                                            : 'bg-background-tertiary/50 border border-transparent hover:border-border'
                                                        }`}
                                                    onClick={() => handleSearchChange(suggestion.word)}
                                                    style={{
                                                        animation: `slideUp 0.3s ease-out ${index * 0.05}s both`
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm ${selectedIndex === index ? 'bg-primary text-background' : 'bg-primary/20 text-primary'
                                                            }`}>
                                                            {index + 1}
                                                        </div>
                                                        <span className={`font-mono font-medium transition-colors ${selectedIndex === index ? 'text-primary' : 'text-white'
                                                            }`}>
                                                            {suggestion.word}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-xs text-gray-500 font-mono">Freq:</div>
                                                        <div className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono font-semibold">
                                                            {suggestion.frequency}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Trie Visualization */}
                            <div className="lg:col-span-5">
                                <div className="bg-background-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <TreePine className="w-5 h-5 text-primary" />
                                        <h2 className="text-lg font-mono font-bold text-white">Trie Visualization</h2>
                                    </div>

                                    <div className="relative bg-background-tertiary/30 rounded-xl overflow-hidden border border-border" style={{ height: '600px' }}>
                                        {!searchQuery ? (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <TreePine className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                                                    <p className="text-gray-500 font-mono text-sm">Trie structure will appear here</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-8">
                                                <div className="flex flex-col items-center space-y-6">
                                                    {/* Root Node */}
                                                    <div className="w-12 h-12 rounded-full bg-primary shadow-neon flex items-center justify-center">
                                                        <span className="text-background font-mono font-bold text-sm">ROOT</span>
                                                    </div>

                                                    {/* Path Visualization */}
                                                    {searchQuery.split('').map((char, idx) => (
                                                        <div key={idx} className="flex flex-col items-center">
                                                            <div className="w-0.5 h-8 bg-primary/50"></div>
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold ${idx === searchQuery.length - 1
                                                                    ? 'bg-primary shadow-neon text-background'
                                                                    : 'bg-primary/30 text-primary'
                                                                }`}>
                                                                {char.toUpperCase()}
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* Suggestion Branches */}
                                                    {suggestions.length > 0 && (
                                                        <div className="flex gap-4 mt-4">
                                                            {suggestions.slice(0, 3).map((_, idx) => (
                                                                <div key={idx} className="flex flex-col items-center">
                                                                    <div className="w-0.5 h-6 bg-primary/30"></div>
                                                                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                                                                        <span className="text-primary font-mono text-xs">...</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tutorial Modal */}
                {showTutorial && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
                        <div className="bg-background-card border border-primary/30 rounded-2xl p-8 max-w-2xl w-full animate-slide-down shadow-neon-strong">
                            <h3 className="text-2xl font-mono font-bold mb-4 text-white">Quick Tutorial</h3>
                            <div className="space-y-4 text-gray-300 font-mono">
                                <p>1. <strong className="text-primary">Type</strong> any word prefix in the search box</p>
                                <p>2. <strong className="text-primary">Watch</strong> real-time suggestions appear, ranked by frequency</p>
                                <p>3. <strong className="text-primary">Observe</strong> the Trie visualization showing the search path</p>
                                <p>4. <strong className="text-primary">Use</strong> arrow keys to navigate, Enter to select</p>
                            </div>
                            <button
                                onClick={() => setShowTutorial(false)}
                                className="mt-6 w-full px-6 py-3 rounded-lg bg-primary text-background font-mono font-semibold hover:bg-primary-light transition-all shadow-neon"
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
