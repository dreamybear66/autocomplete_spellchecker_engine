'use client';

import { useState, useCallback, useEffect } from 'react';

export interface MatrixCell {
    value: number;
    operation: 'match' | 'insert' | 'delete' | 'substitute';
    row: number;
    col: number;
}

export interface AnimationStep {
    type: 'init' | 'compute' | 'complete';
    row: number;
    col: number;
    value: number;
    operation: 'match' | 'insert' | 'delete' | 'substitute';
    message: string;
}

export interface EditDistanceMetrics {
    operations: number;
    timeMs: number;
    memoryBytes: number;
    finalDistance: number;
}

export function useEditDistance() {
    const [sourceWord, setSourceWord] = useState('kitten');
    const [targetWord, setTargetWord] = useState('sitting');
    const [matrix, setMatrix] = useState<MatrixCell[][]>([]);
    const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(1);
    const [metrics, setMetrics] = useState<EditDistanceMetrics>({
        operations: 0,
        timeMs: 0,
        memoryBytes: 0,
        finalDistance: 0
    });

    // Calculate edit distance with animation steps
    const calculateEditDistance = useCallback((source: string, target: string) => {
        const startTime = performance.now();
        const m = source.length;
        const n = target.length;
        const steps: AnimationStep[] = [];
        let operations = 0;

        // Initialize DP table
        const dp: MatrixCell[][] = Array(m + 1)
            .fill(null)
            .map(() => Array(n + 1).fill(null));

        // Initialize first row and column
        for (let i = 0; i <= m; i++) {
            dp[i][0] = {
                value: i,
                operation: i === 0 ? 'match' : 'delete',
                row: i,
                col: 0
            };
            if (i > 0) {
                steps.push({
                    type: 'init',
                    row: i,
                    col: 0,
                    value: i,
                    operation: 'delete',
                    message: `Initialize dp[${i}][0] = ${i} (delete ${i} characters)`
                });
            }
        }

        for (let j = 0; j <= n; j++) {
            dp[0][j] = {
                value: j,
                operation: j === 0 ? 'match' : 'insert',
                row: 0,
                col: j
            };
            if (j > 0) {
                steps.push({
                    type: 'init',
                    row: 0,
                    col: j,
                    value: j,
                    operation: 'insert',
                    message: `Initialize dp[0][${j}] = ${j} (insert ${j} characters)`
                });
            }
        }

        // Fill DP table
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                operations++;
                const sourceChar = source[i - 1];
                const targetChar = target[j - 1];

                if (sourceChar === targetChar) {
                    dp[i][j] = {
                        value: dp[i - 1][j - 1].value,
                        operation: 'match',
                        row: i,
                        col: j
                    };
                    steps.push({
                        type: 'compute',
                        row: i,
                        col: j,
                        value: dp[i][j].value,
                        operation: 'match',
                        message: `Match: '${sourceChar}' === '${targetChar}', dp[${i}][${j}] = ${dp[i][j].value}`
                    });
                } else {
                    const deleteOp = dp[i - 1][j].value + 1;
                    const insertOp = dp[i][j - 1].value + 1;
                    const substituteOp = dp[i - 1][j - 1].value + 1;

                    const minOp = Math.min(deleteOp, insertOp, substituteOp);
                    let operation: 'delete' | 'insert' | 'substitute';

                    if (minOp === deleteOp) operation = 'delete';
                    else if (minOp === insertOp) operation = 'insert';
                    else operation = 'substitute';

                    dp[i][j] = {
                        value: minOp,
                        operation,
                        row: i,
                        col: j
                    };

                    steps.push({
                        type: 'compute',
                        row: i,
                        col: j,
                        value: dp[i][j].value,
                        operation,
                        message: `Min(delete:${deleteOp}, insert:${insertOp}, substitute:${substituteOp}) = ${minOp} (${operation})`
                    });
                }
            }
        }

        steps.push({
            type: 'complete',
            row: m,
            col: n,
            value: dp[m][n].value,
            operation: dp[m][n].operation,
            message: `Edit distance: ${dp[m][n].value}`
        });

        const endTime = performance.now();
        const timeMs = parseFloat((endTime - startTime).toFixed(2));
        const memoryBytes = (m + 1) * (n + 1) * 24; // Approximate

        setMatrix(dp);
        setAnimationSteps(steps);
        setCurrentStep(0);
        setMetrics({
            operations,
            timeMs,
            memoryBytes,
            finalDistance: dp[m][n].value
        });
    }, []);

    // Initialize on mount and when words change
    useEffect(() => {
        if (sourceWord && targetWord) {
            calculateEditDistance(sourceWord.toLowerCase(), targetWord.toLowerCase());
        }
    }, [sourceWord, targetWord, calculateEditDistance]);

    // Animation playback controls
    const play = useCallback(() => {
        setIsPlaying(true);
    }, []);

    const pause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const reset = useCallback(() => {
        setCurrentStep(0);
        setIsPlaying(false);
    }, []);

    const stepForward = useCallback(() => {
        if (currentStep < animationSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    }, [currentStep, animationSteps.length]);

    const stepBackward = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    // Auto-advance animation
    useEffect(() => {
        if (isPlaying && currentStep < animationSteps.length - 1) {
            const timeout = setTimeout(() => {
                setCurrentStep(currentStep + 1);
            }, 1000 / animationSpeed);
            return () => clearTimeout(timeout);
        } else if (currentStep >= animationSteps.length - 1) {
            setIsPlaying(false);
        }
    }, [isPlaying, currentStep, animationSteps.length, animationSpeed]);

    return {
        sourceWord,
        targetWord,
        setSourceWord,
        setTargetWord,
        matrix,
        animationSteps,
        currentStep,
        isPlaying,
        animationSpeed,
        metrics,
        setAnimationSpeed,
        play,
        pause,
        reset,
        stepForward,
        stepBackward
    };
}
