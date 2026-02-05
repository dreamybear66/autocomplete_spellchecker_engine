'use client';

import { Search, Zap, Clock, Cpu, Code2 } from 'lucide-react';

interface ControlPanelProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    animationSpeed: number;
    onSpeedChange: (speed: number) => void;
    metrics: {
        operations: number;
        timeMs: number;
        memoryBytes: number;
    };
    showCode: boolean;
    onToggleCode: () => void;
}

export default function ControlPanel({
    searchQuery,
    onSearchChange,
    animationSpeed,
    onSpeedChange,
    metrics,
    showCode,
    onToggleCode
}: ControlPanelProps) {
    return (
        <div className="bg-background-card border border-border rounded-xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-mono font-bold text-white">Control Panel</h2>
                <button
                    onClick={onToggleCode}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 transition-colors text-sm font-mono text-gray-400 hover:text-primary"
                >
                    <Code2 className="w-4 h-4" />
                    {showCode ? 'Hide Code' : 'Show Code'}
                </button>
            </div>

            {/* Search Query Input */}
            <div>
                <label className="flex items-center gap-2 text-sm font-mono text-gray-400 mb-2">
                    <Search className="w-4 h-4" />
                    Search Query
                </label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="algorithm"
                    className="w-full px-4 py-3 bg-background-tertiary border border-border rounded-lg text-white font-mono placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                />
            </div>

            {/* Animation Speed Slider */}
            <div>
                <label className="flex items-center gap-2 text-sm font-mono text-gray-400 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Animation Speed: {animationSpeed}x
                </label>
                <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.5"
                    value={animationSpeed}
                    onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{
                        background: `linear-gradient(to right, #00f2ff 0%, #00f2ff ${((animationSpeed - 0.5) / 2.5) * 100}%, #1c2128 ${((animationSpeed - 0.5) / 2.5) * 100}%, #1c2128 100%)`
                    }}
                />
            </div>

            {/* Live Metrics */}
            <div className="grid grid-cols-3 gap-3">
                {/* Operations */}
                <div className="bg-background-tertiary/50 border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Cpu className="w-4 h-4 text-primary" />
                        <span className="text-xs text-gray-400 font-mono">Operations</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-white">
                        {metrics.operations}
                    </div>
                </div>

                {/* Time (ms) */}
                <div className="bg-background-tertiary/50 border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-xs text-gray-400 font-mono">Time (ms)</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-white">
                        {metrics.timeMs.toFixed(2)}
                    </div>
                </div>

                {/* Memory (bytes) */}
                <div className="bg-background-tertiary/50 border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Cpu className="w-4 h-4 text-primary" />
                        <span className="text-xs text-gray-400 font-mono">Memory (bytes)</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-white">
                        {metrics.memoryBytes}
                    </div>
                </div>
            </div>
        </div>
    );
}
