'use client';

import { Download, FileJson, FileText, FileType } from 'lucide-react';
import { exportToJSON, exportToCSV, exportToPDF, BenchmarkData } from '@/lib/exportUtils';
import { PerformanceMetrics } from '@/hooks/performance-lab/usePerformanceMetrics';

interface ExportPanelProps {
    totalTests: number;
    latestTest: Date;
    metrics: PerformanceMetrics;
}

const algorithms = [
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

export default function ExportPanel({ totalTests, latestTest, metrics }: ExportPanelProps) {
    const handleExport = (format: 'json' | 'csv' | 'pdf') => {
        const benchmarkData: BenchmarkData = {
            timestamp: new Date(),
            metrics,
            algorithms
        };

        switch (format) {
            case 'json':
                exportToJSON(benchmarkData);
                break;
            case 'csv':
                exportToCSV(benchmarkData);
                break;
            case 'pdf':
                exportToPDF(benchmarkData);
                break;
        }
    };


    return (
        <div className="bg-background-card border border-border rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-mono font-bold text-white">
                    Export Benchmark Report
                </h3>
                <Download className="w-5 h-5 text-primary" />
            </div>

            {/* Report Summary */}
            <div className="mb-6 p-4 bg-background-tertiary/30 rounded-lg border border-border">
                <div className="text-sm text-gray-400 font-mono mb-2">Report Summary</div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-xs text-gray-500 font-mono mb-1">Total Tests</div>
                        <div className="text-2xl font-bold text-white font-mono">{totalTests}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 font-mono mb-1">Latest Test</div>
                        <div className="text-sm text-primary font-mono">
                            {latestTest.toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Export Format Selection */}
            <div className="mb-4">
                <div className="text-sm text-gray-400 font-mono mb-3">Select Export Format</div>
                <div className="grid grid-cols-3 gap-3">
                    {/* JSON */}
                    <button
                        onClick={() => handleExport('json')}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                    >
                        <FileJson className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-mono text-gray-400 group-hover:text-primary transition-colors">
                            JSON
                        </span>
                    </button>

                    {/* CSV */}
                    <button
                        onClick={() => handleExport('csv')}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                    >
                        <FileText className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-mono text-gray-400 group-hover:text-primary transition-colors">
                            CSV
                        </span>
                    </button>

                    {/* PDF */}
                    <button
                        onClick={() => handleExport('pdf')}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                    >
                        <FileType className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-mono text-gray-400 group-hover:text-primary transition-colors">
                            PDF
                        </span>
                    </button>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 font-mono leading-relaxed">
                Reports include performance metrics, algorithm comparisons, memory usage data, and load test results.
            </p>
        </div>
    );
}
