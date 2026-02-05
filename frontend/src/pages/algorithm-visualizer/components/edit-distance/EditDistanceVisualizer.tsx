'use client';

import { useState } from 'react';
import { useEditDistance } from '@/hooks/useEditDistance';
import EditDistanceMatrix from '@/components/EditDistanceMatrix';
import EditDistanceControlPanel from '@/components/EditDistanceControlPanel';
import EditDistancePlaybackControls from '@/components/EditDistancePlaybackControls';
import EditDistanceCodeExplanation from '@/components/EditDistanceCodeExplanation';

export default function EditDistanceVisualizer() {
    const {
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
    } = useEditDistance();

    const [activeOperation, setActiveOperation] = useState<'algorithm' | 'spellcheck'>('algorithm');

    return (
        <div className="space-y-6">
            {/* Control Panel and Code Explanation Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Control Panel */}
                <div className="lg:col-span-1">
                    <EditDistanceControlPanel
                        sourceWord={sourceWord}
                        targetWord={targetWord}
                        onSourceChange={setSourceWord}
                        onTargetChange={setTargetWord}
                        animationSpeed={animationSpeed}
                        onSpeedChange={setAnimationSpeed}
                        metrics={metrics}
                    />
                </div>

                {/* Code Explanation */}
                <div className="lg:col-span-2">
                    <EditDistanceCodeExplanation
                        activeOperation={activeOperation}
                        onOperationChange={setActiveOperation}
                    />
                </div>
            </div>

            {/* Playback Controls */}
            <EditDistancePlaybackControls
                isPlaying={isPlaying}
                currentStep={currentStep}
                totalSteps={animationSteps.length}
                onPlay={play}
                onPause={pause}
                onReset={reset}
                onStepForward={stepForward}
                onStepBackward={stepBackward}
            />

            {/* Matrix Visualization */}
            <EditDistanceMatrix
                sourceWord={sourceWord}
                targetWord={targetWord}
                matrix={matrix}
                animationSteps={animationSteps}
                currentStep={currentStep}
            />
        </div>
    );
}
