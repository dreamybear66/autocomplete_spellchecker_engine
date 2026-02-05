'use client';

import { useState, useEffect } from 'react';
import { useTrieVisualization } from '@/hooks/algorithm-visualizer/useTrieVisualization';
import AlgorithmTabs from '@/components/algorithm-visualizer/shared/AlgorithmTabs';
import ControlPanel from '@/components/algorithm-visualizer/trie/ControlPanel';
import TrieCanvas from '@/components/algorithm-visualizer/trie/TrieCanvas';
import CodeExplanation from '@/components/algorithm-visualizer/trie/CodeExplanation';
import EditDistanceVisualizer from '@/components/algorithm-visualizer/edit-distance/EditDistanceVisualizer';
import DataStructureExplorer from '@/components/algorithm-visualizer/data-structures/DataStructureExplorer';
import ThreeBackground from '@/components/shared/ThreeBackground';
import { sampleWords } from '@/data/sampleWords';

export default function AlgorithmVisualizerPage() {
    const [activeTab, setActiveTab] = useState('trie');
    const [showCode, setShowCode] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    const {
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
        insertWord
    } = useTrieVisualization();

    // Initialize Trie with sample words on mount
    useEffect(() => {
        if (!isInitialized) {
            // Insert a few sample words to demonstrate the Trie
            const initialWords = ['algorithm', 'data', 'tree', 'array', 'hash'];
            initialWords.forEach(word => insertWord(word));
            setIsInitialized(true);
        }
    }, [isInitialized, insertWord]);

    return (
        <>
            <ThreeBackground />
            <div className="min-h-screen bg-background relative z-10">
                <div className="pt-24 px-6 lg:px-8 pb-16">
                    <div className="max-w-[1800px] mx-auto space-y-8">
                        {/* Hero Section */}
                        <div className="text-center space-y-4 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <span className="text-sm text-primary font-mono font-medium">Live Algorithm Visualization</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-white">
                                Algorithm <span className="text-primary">Visualizer</span>
                            </h1>

                            <p className="text-lg text-gray-400 max-w-3xl mx-auto font-mono">
                                Dive deep into data structures and algorithms with interactive visualizations. Watch Trie traversals, edit distance calculations, and hybrid intelligence systems in action.
                            </p>
                        </div>

                        {/* Tab Selector */}
                        <div className="animate-slide-up">
                            <AlgorithmTabs activeTab={activeTab} onTabChange={setActiveTab} />
                        </div>

                        {/* Main Content - Only show Trie Visualization for now */}
                        {activeTab === 'trie' && (
                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                {/* Left Column - Control Panel */}
                                <div className="xl:col-span-3 space-y-6">
                                    <ControlPanel
                                        searchQuery={searchQuery}
                                        onSearchChange={handleSearchChange}
                                        animationSpeed={animationSpeed}
                                        onSpeedChange={setAnimationSpeed}
                                        metrics={metrics}
                                        showCode={showCode}
                                        onToggleCode={() => setShowCode(!showCode)}
                                    />
                                </div>

                                {/* Center Column - Trie Visualization */}
                                <div className={showCode ? 'xl:col-span-6' : 'xl:col-span-9'}>
                                    <TrieCanvas
                                        root={root}
                                        animationSteps={animationSteps}
                                        currentStep={currentStep}
                                        isPlaying={isPlaying}
                                        onPlay={play}
                                        onPause={pause}
                                        onReset={reset}
                                        onStepForward={stepForward}
                                        onStepBackward={stepBackward}
                                    />
                                </div>

                                {/* Right Column - Code Explanation (Collapsible) */}
                                {showCode && (
                                    <div className="xl:col-span-3">
                                        <CodeExplanation
                                            activeOperation={activeOperation}
                                            onOperationChange={setActiveOperation}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Edit Distance Visualization */}
                        {activeTab === 'edit-distance' && (
                            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                <EditDistanceVisualizer />
                            </div>
                        )}

                        {/* Data Structures Explorer */}
                        {activeTab === 'data-structures' && (
                            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                <DataStructureExplorer />
                            </div>
                        )}

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            {/* Step-by-Step Execution */}
                            <div className="p-6 rounded-lg bg-background-card border border-border hover:border-primary/50 transition-colors duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2 font-mono">Step-by-Step Execution</h3>
                                        <p className="text-sm text-gray-400 font-mono">
                                            Watch algorithms execute one operation at a time with adjustable animation speed and detailed explanations.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Code Panels */}
                            <div className="p-6 rounded-lg bg-background-card border border-border hover:border-primary/50 transition-colors duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                                            <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                                            <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                                            <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                                            <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2 font-mono">Interactive Code Panels</h3>
                                        <p className="text-sm text-gray-400 font-mono">
                                            View production-quality TypeScript implementations with syntax highlighting and complexity analysis.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Real-Time Metrics */}
                            <div className="p-6 rounded-lg bg-background-card border border-border hover:border-primary/50 transition-colors duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2 font-mono">Real-Time Metrics</h3>
                                        <p className="text-sm text-gray-400 font-mono">
                                            Monitor operation counts, execution time, and memory usage as algorithms process your input data.
                                        </p>
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
