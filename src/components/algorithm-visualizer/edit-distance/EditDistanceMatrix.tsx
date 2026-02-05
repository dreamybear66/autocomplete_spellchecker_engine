'use client';

import { MatrixCell, AnimationStep } from '@/hooks/useEditDistance';
import { Check, Plus, Minus, RotateCw } from 'lucide-react';

interface EditDistanceMatrixProps {
    sourceWord: string;
    targetWord: string;
    matrix: MatrixCell[][];
    animationSteps: AnimationStep[];
    currentStep: number;
}

export default function EditDistanceMatrix({
    sourceWord,
    targetWord,
    matrix,
    animationSteps,
    currentStep
}: EditDistanceMatrixProps) {
    // Get active cells from animation
    const getActiveCell = (): { row: number; col: number } | null => {
        if (currentStep < animationSteps.length) {
            const step = animationSteps[currentStep];
            return { row: step.row, col: step.col };
        }
        return null;
    };

    const activeCell = getActiveCell();

    // Operation icon and color
    const getOperationDisplay = (operation: string) => {
        switch (operation) {
            case 'match':
                return { icon: Check, color: 'text-green-400', label: '✓ Match', bgColor: 'bg-green-500/10' };
            case 'insert':
                return { icon: Plus, color: 'text-blue-400', label: '+ Insert', bgColor: 'bg-blue-500/10' };
            case 'delete':
                return { icon: Minus, color: 'text-red-400', label: '− Delete', bgColor: 'bg-red-500/10' };
            case 'substitute':
                return { icon: RotateCw, color: 'text-orange-400', label: '↺ Substitute', bgColor: 'bg-orange-500/10' };
            default:
                return { icon: Check, color: 'text-gray-400', label: '', bgColor: 'bg-gray-500/10' };
        }
    };

    if (matrix.length === 0) {
        return (
            <div className="flex items-center justify-center h-96 bg-background-card border border-border rounded-xl">
                <p className="text-gray-400 font-mono">Enter source and target words to visualize</p>
            </div>
        );
    }

    return (
        <div className="bg-background-card border border-border rounded-xl p-6 overflow-auto">
            {/* Matrix Grid */}
            <div className="inline-block min-w-full">
                <table className="border-collapse font-mono text-sm">
                    <thead>
                        <tr>
                            {/* Top-left corner */}
                            <th className="w-16 h-16 border border-border bg-background-tertiary"></th>
                            <th className="w-16 h-16 border border-border bg-background-tertiary text-gray-400">
                                ε
                            </th>
                            {/* Target word characters */}
                            {targetWord.split('').map((char, idx) => (
                                <th
                                    key={idx}
                                    className="w-16 h-16 border border-border bg-background-tertiary text-primary font-bold"
                                >
                                    {char}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {matrix.map((row, i) => (
                            <tr key={i}>
                                {/* Source word character (first column) */}
                                <th className="w-16 h-16 border border-border bg-background-tertiary text-primary font-bold">
                                    {i === 0 ? 'ε' : sourceWord[i - 1]}
                                </th>
                                {/* Matrix cells */}
                                {row.map((cell, j) => {
                                    const isActive = activeCell?.row === i && activeCell?.col === j;
                                    const opDisplay = getOperationDisplay(cell.operation);
                                    const Icon = opDisplay.icon;

                                    return (
                                        <td
                                            key={j}
                                            className={`w-16 h-16 border-2 transition-all duration-300 ${isActive
                                                    ? 'border-primary bg-primary/20 shadow-neon'
                                                    : 'border-border bg-background-tertiary/50'
                                                }`}
                                        >
                                            <div className="flex flex-col items-center justify-center h-full space-y-1">
                                                {/* Value */}
                                                <div className="text-xl font-bold text-white">{cell.value}</div>
                                                {/* Operation label */}
                                                {cell.operation && (
                                                    <div className={`flex items-center gap-1 text-xs ${opDisplay.color}`}>
                                                        <Icon className="w-3 h-3" />
                                                        <span className="font-medium">
                                                            {cell.operation === 'match' && '✓'}
                                                            {cell.operation === 'insert' && '+'}
                                                            {cell.operation === 'delete' && '−'}
                                                            {cell.operation === 'substitute' && '↺'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border">
                {/* Match */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                    <Check className="w-4 h-4 text-green-400" />
                    <div className="flex-1">
                        <div className="text-xs text-green-400 font-semibold">Match</div>
                        <div className="text-xs text-gray-400">Cost: 0</div>
                    </div>
                </div>

                {/* Insert */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <Plus className="w-4 h-4 text-blue-400" />
                    <div className="flex-1">
                        <div className="text-xs text-blue-400 font-semibold">Insert</div>
                        <div className="text-xs text-gray-400">Cost: 1</div>
                    </div>
                </div>

                {/* Delete */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
                    <Minus className="w-4 h-4 text-red-400" />
                    <div className="flex-1">
                        <div className="text-xs text-red-400 font-semibold">Delete</div>
                        <div className="text-xs text-gray-400">Cost: 1</div>
                    </div>
                </div>

                {/* Substitute */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
                    <RotateCw className="w-4 h-4 text-orange-400" />
                    <div className="flex-1">
                        <div className="text-xs text-orange-400 font-semibold">Substitute</div>
                        <div className="text-xs text-gray-400">Cost: 1</div>
                    </div>
                </div>
            </div>

            {/* Current Step Message */}
            {currentStep < animationSteps.length && (
                <div className="mt-4 px-4 py-3 rounded-lg bg-primary/10 border border-primary/30">
                    <p className="text-sm font-mono text-primary">
                        {animationSteps[currentStep].message}
                    </p>
                </div>
            )}
        </div>
    );
}
