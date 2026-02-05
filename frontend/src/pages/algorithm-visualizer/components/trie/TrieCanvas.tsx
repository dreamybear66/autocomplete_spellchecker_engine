'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TrieNode, AnimationStep } from '@/hooks/useTrieVisualization';

interface TrieCanvasProps {
    root: TrieNode;
    animationSteps: AnimationStep[];
    currentStep: number;
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onReset: () => void;
    onStepForward: () => void;
    onStepBackward: () => void;
}

interface D3Node {
    id: string;
    char: string;
    isEndOfWord: boolean;
    frequency: number;
    x?: number;
    y?: number;
    children?: D3Node[];
}

export default function TrieCanvas({
    root,
    animationSteps,
    currentStep,
    isPlaying,
    onPlay,
    onPause,
    onReset,
    onStepForward,
    onStepBackward
}: TrieCanvasProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [zoom, setZoom] = useState(60);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Convert Trie to D3 hierarchy
    function trieToD3(node: TrieNode): D3Node {
        const d3Node: D3Node = {
            id: node.id,
            char: node.char || 'ROOT',
            isEndOfWord: node.isEndOfWord,
            frequency: node.frequency,
            children: []
        };

        for (const [, child] of Array.from(node.children.entries())) {
            d3Node.children!.push(trieToD3(child));
        }

        if (d3Node.children!.length === 0) {
            delete d3Node.children;
        }

        return d3Node;
    }

    // Get active node IDs from animation steps
    function getActiveNodes(): Set<string> {
        const activeIds = new Set<string>();
        for (let i = 0; i <= currentStep && i < animationSteps.length; i++) {
            activeIds.add(animationSteps[i].nodeId);
        }
        return activeIds;
    }

    // Get current node ID
    function getCurrentNodeId(): string | null {
        return currentStep < animationSteps.length ? animationSteps[currentStep].nodeId : null;
    }

    // Render Trie with D3
    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, 40)`);

        // Create tree layout
        const treeLayout = d3.tree<D3Node>()
            .size([width * (zoom / 100), height - 100])
            .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));

        const d3Root = d3.hierarchy(trieToD3(root));
        const treeData = treeLayout(d3Root);

        const activeNodes = getActiveNodes();
        const currentNodeId = getCurrentNodeId();

        // Draw links
        g.selectAll('.link')
            .data(treeData.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d3.linkVertical<any, any>()
                .x(d => d.x)
                .y(d => d.y))
            .attr('fill', 'none')
            .attr('stroke', d => {
                const targetId = (d.target.data as D3Node).id;
                if (activeNodes.has(targetId)) return '#00f2ff';
                return '#374151';
            })
            .attr('stroke-width', d => {
                const targetId = (d.target.data as D3Node).id;
                return activeNodes.has(targetId) ? 2 : 1;
            })
            .attr('opacity', 0.6);

        // Draw nodes
        const nodes = g.selectAll('.node')
            .data(treeData.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x}, ${d.y})`);

        // Node circles
        nodes.append('circle')
            .attr('r', 20)
            .attr('fill', d => {
                const nodeData = d.data as D3Node;
                if (nodeData.id === currentNodeId) return '#10b981'; // Green - current
                if (nodeData.isEndOfWord) return '#a855f7'; // Purple - end of word
                if (activeNodes.has(nodeData.id)) return '#00f2ff'; // Cyan - active path
                return '#1c2128';
            })
            .attr('stroke', d => {
                const nodeData = d.data as D3Node;
                if (nodeData.id === currentNodeId) return '#10b981';
                if (nodeData.isEndOfWord) return '#a855f7';
                if (activeNodes.has(nodeData.id)) return '#00f2ff';
                return '#374151';
            })
            .attr('stroke-width', 2)
            .style('filter', d => {
                const nodeData = d.data as D3Node;
                if (nodeData.id === currentNodeId || activeNodes.has(nodeData.id)) {
                    return 'drop-shadow(0 0 8px rgba(0, 242, 255, 0.6))';
                }
                return 'none';
            });

        // Node labels
        nodes.append('text')
            .attr('dy', 5)
            .attr('text-anchor', 'middle')
            .attr('fill', '#fff')
            .attr('font-family', 'JetBrains Mono, monospace')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .text(d => (d.data as D3Node).char);

        // Frequency labels for end-of-word nodes
        nodes.filter(d => (d.data as D3Node).isEndOfWord && (d.data as D3Node).frequency > 0)
            .append('text')
            .attr('dy', 35)
            .attr('text-anchor', 'middle')
            .attr('fill', '#a855f7')
            .attr('font-family', 'JetBrains Mono, monospace')
            .attr('font-size', '10px')
            .text(d => `f:${(d.data as D3Node).frequency}`);

    }, [root, currentStep, animationSteps, zoom]);

    return (
        <div className="bg-background-card border border-border rounded-xl overflow-hidden">
            {/* Controls Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-background-tertiary/30">
                {/* Left Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={isPlaying ? onPause : onPlay}
                        className="p-2 rounded-lg bg-primary hover:bg-primary-light transition-colors"
                        title={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <Pause className="w-4 h-4 text-background" />
                        ) : (
                            <Play className="w-4 h-4 text-background" />
                        )}
                    </button>

                    <button
                        onClick={onReset}
                        className="p-2 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 transition-colors"
                        title="Reset"
                    >
                        <RotateCcw className="w-4 h-4 text-gray-400" />
                    </button>

                    <button
                        onClick={onStepBackward}
                        disabled={currentStep === 0}
                        className="p-2 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Step Backward"
                    >
                        <ChevronLeft className="w-4 h-4 text-gray-400" />
                    </button>

                    <button
                        onClick={onStepForward}
                        disabled={currentStep >= animationSteps.length - 1}
                        className="p-2 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Step Forward"
                    >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>

                    <div className="ml-2 px-3 py-1 rounded-lg bg-background-tertiary border border-border">
                        <span className="text-sm font-mono text-gray-400">
                            Step: <span className="text-primary font-semibold">{currentStep}</span>/{animationSteps.length}
                        </span>
                    </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setZoom(Math.max(40, zoom - 10))}
                        className="p-2 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 transition-colors"
                        title="Zoom Out"
                    >
                        <ZoomOut className="w-4 h-4 text-gray-400" />
                    </button>

                    <span className="text-sm font-mono text-gray-400 px-2">{zoom}%</span>

                    <button
                        onClick={() => setZoom(Math.min(120, zoom + 10))}
                        className="p-2 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 transition-colors"
                        title="Zoom In"
                    >
                        <ZoomIn className="w-4 h-4 text-gray-400" />
                    </button>

                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 transition-colors"
                        title="Fullscreen"
                    >
                        <Maximize2 className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <div className="relative bg-background-tertiary/20" style={{ height: '600px' }}>
                <svg
                    ref={svgRef}
                    className="w-full h-full"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.03) 0%, transparent 50%)'
                    }}
                />

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-background-card/90 backdrop-blur-sm border border-border rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary"></div>
                        <span className="text-xs font-mono text-gray-400">Active Path</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-500"></div>
                        <span className="text-xs font-mono text-gray-400">Current Node</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-purple-500"></div>
                        <span className="text-xs font-mono text-gray-400">End of Word</span>
                    </div>
                </div>

                {/* Current Step Message */}
                {currentStep < animationSteps.length && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-background-card/90 backdrop-blur-sm border border-primary/30 rounded-lg px-4 py-2">
                        <p className="text-sm font-mono text-primary">
                            {animationSteps[currentStep].message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
