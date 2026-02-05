'use client';

import { useState } from 'react';
import { useSpellChecker } from '@/hooks/useSpellChecker';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { FileText, AlertCircle, CheckCircle, Clock, MousePointer2, Terminal } from 'lucide-react';
import ThreeBackground from '@/components/shared/ThreeBackground';

export default function SpellCheckerEngineContent() {
    const { inputText, results, metrics, handleTextChange, applyCorrection } = useSpellChecker();
    const [selectedErrorIndex, setSelectedErrorIndex] = useState<number | null>(null);

    const errors = results.filter(r => !r.isCorrect);
    const selectedError = selectedErrorIndex !== null ? errors[selectedErrorIndex] : null;

    // Keyboard navigation
    useKeyboardNavigation({
        onArrowUp: () => {
            if (selectedErrorIndex !== null && selectedErrorIndex > 0) {
                setSelectedErrorIndex(selectedErrorIndex - 1);
            }
        },
        onArrowDown: () => {
            if (selectedErrorIndex !== null && selectedErrorIndex < errors.length - 1) {
                setSelectedErrorIndex(selectedErrorIndex + 1);
            } else if (selectedErrorIndex === null && errors.length > 0) {
                setSelectedErrorIndex(0);
            }
        },
        onEscape: () => setSelectedErrorIndex(null),
    });

    return (
        <>
            <ThreeBackground />
            <div className="min-h-screen bg-background relative z-10">
                <div className="pt-24 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-8 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-red/10 border border-accent-red/30 mb-4">
                                <AlertCircle className="w-4 h-4 text-accent-red" />
                                <span className="text-sm text-accent-red font-mono font-medium">Advanced Spell Correction</span>
                            </div>
                            <h1 className="text-5xl font-mono font-bold text-white mb-4">
                                Spell Checker Engine
                            </h1>
                            <p className="text-lg text-gray-400 font-mono">
                                Levenshtein Distance Algorithm
                            </p>
                        </div>

                        {/* Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
                            {/* Errors Found */}
                            <div className="bg-background-card border border-border rounded-xl p-6 hover:border-accent-red/50 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-mono">Errors Found</span>
                                    <AlertCircle className="w-5 h-5 text-accent-red" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-white">{metrics.errorsFound}</span>
                                    <span className="text-sm text-gray-500 font-mono">errors</span>
                                </div>
                            </div>

                            {/* Corrections Applied */}
                            <div className="bg-background-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-mono">Corrections Applied</span>
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-white">{metrics.correctionsApplied}</span>
                                    <span className="text-sm text-gray-500 font-mono">fixed</span>
                                </div>
                            </div>

                            {/* Accuracy */}
                            <div className="bg-background-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-mono">Accuracy</span>
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-white">
                                        {metrics.totalWords > 0
                                            ? Math.round(((metrics.totalWords - metrics.errorsFound) / metrics.totalWords) * 100)
                                            : 100}
                                    </span>
                                    <span className="text-sm text-gray-500 font-mono">%</span>
                                </div>
                            </div>

                            {/* Processing Time */}
                            <div className="bg-background-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-mono">Processing Time</span>
                                    <Clock className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-white">{metrics.checkTime}</span>
                                    <span className="text-sm text-gray-500 font-mono">ms</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Left Column - Text Input & Detected Errors */}
                            <div className="lg:col-span-7 space-y-6">
                                {/* Text Input */}
                                <div className="bg-background-card border border-border rounded-xl p-6 animate-slide-up">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FileText className="w-5 h-5 text-primary" />
                                        <h2 className="text-lg font-mono font-bold text-white">Text Input</h2>
                                    </div>

                                    <textarea
                                        value={inputText}
                                        onChange={(e) => handleTextChange(e.target.value)}
                                        placeholder="Type or paste text here to check spelling..."
                                        className="w-full h-48 p-4 bg-background-tertiary border border-border rounded-lg text-white font-mono placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                                        autoFocus
                                    />

                                    <div className="mt-4 flex items-center justify-between text-sm font-mono">
                                        <span className="text-gray-400">
                                            Dictionary size: <span className="text-primary font-semibold">158</span> words
                                        </span>
                                        <button
                                            onClick={() => handleTextChange('')}
                                            className="text-primary hover:text-primary-light transition-colors"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>

                                {/* Detected Errors */}
                                <div className="bg-background-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-mono font-bold text-white">Detected Errors</h2>
                                        <span className="text-sm text-gray-400 font-mono">{errors.length} errors</span>
                                    </div>

                                    {errors.length === 0 ? (
                                        <div className="text-center py-12">
                                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                                            <p className="text-green-400 font-mono font-semibold">No spelling errors detected</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 max-h-64 overflow-y-auto">
                                            {errors.map((error, index) => (
                                                <div
                                                    key={`${error.word}-${index}`}
                                                    onClick={() => setSelectedErrorIndex(index)}
                                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedErrorIndex === index
                                                        ? 'bg-accent-red/20 border border-accent-red/50'
                                                        : 'bg-background-tertiary/50 border border-transparent hover:border-border'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4 text-accent-red flex-shrink-0" />
                                                        <span className="text-white font-mono line-through decoration-accent-red">
                                                            {error.word}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Correction Suggestions & Algorithm Steps */}
                            <div className="lg:col-span-5 space-y-6">
                                {/* Correction Suggestions */}
                                <div className="bg-background-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                    <h2 className="text-lg font-mono font-bold text-white mb-4">Correction Suggestions</h2>

                                    {!selectedError ? (
                                        <div className="text-center py-12">
                                            <MousePointer2 className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                                            <p className="text-gray-500 font-mono text-sm">Select an error to see corrections</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {selectedError.suggestions.length > 0 ? (
                                                selectedError.suggestions.map((suggestion, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => applyCorrection(selectedError.word, suggestion.word)}
                                                        className="p-3 rounded-lg bg-background-tertiary/50 border border-border hover:border-primary/50 cursor-pointer transition-all group"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-white font-mono group-hover:text-primary transition-colors">
                                                                {suggestion.word}
                                                            </span>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-xs px-2 py-1 rounded font-mono ${suggestion.confidence === 'high'
                                                                    ? 'bg-green-500/20 text-green-400'
                                                                    : suggestion.confidence === 'medium'
                                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                                        : 'bg-orange-500/20 text-orange-400'
                                                                    }`}>
                                                                    {suggestion.confidence === 'high' ? '●●●' : suggestion.confidence === 'medium' ? '●●○' : '●○○'}
                                                                </span>
                                                                <span className="text-xs text-gray-500 font-mono">
                                                                    dist: {suggestion.distance}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500 font-mono">No suggestions available</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Algorithm Steps */}
                                <div className="bg-background-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Terminal className="w-5 h-5 text-primary" />
                                        <h2 className="text-lg font-mono font-bold text-white">Algorithm Steps</h2>
                                    </div>

                                    <div className="text-center py-12">
                                        <Terminal className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-500 font-mono text-sm">Algorithm steps will appear here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
