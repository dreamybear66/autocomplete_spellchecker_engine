'use client';

import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

interface EditDistancePlaybackControlsProps {
    isPlaying: boolean;
    currentStep: number;
    totalSteps: number;
    onPlay: () => void;
    onPause: () => void;
    onReset: () => void;
    onStepForward: () => void;
    onStepBackward: () => void;
}

export default function EditDistancePlaybackControls({
    isPlaying,
    currentStep,
    totalSteps,
    onPlay,
    onPause,
    onReset,
    onStepForward,
    onStepBackward
}: EditDistancePlaybackControlsProps) {
    return (
        <div className="flex items-center justify-between bg-background-card border border-border rounded-xl p-4">
            {/* Playback Controls */}
            <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <button
                    onClick={isPlaying ? onPause : onPlay}
                    disabled={currentStep >= totalSteps - 1}
                    className="p-3 rounded-lg bg-primary text-background hover:bg-primary/90 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all shadow-neon"
                >
                    {isPlaying ? (
                        <Pause className="w-5 h-5" fill="currentColor" />
                    ) : (
                        <Play className="w-5 h-5" fill="currentColor" />
                    )}
                </button>

                {/* Reset */}
                <button
                    onClick={onReset}
                    className="p-3 rounded-lg bg-background-tertiary text-gray-400 hover:text-white hover:bg-background-tertiary/70 transition-all"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>

                {/* Step Backward */}
                <button
                    onClick={onStepBackward}
                    disabled={currentStep === 0}
                    className="p-3 rounded-lg bg-background-tertiary text-gray-400 hover:text-white hover:bg-background-tertiary/70 disabled:text-gray-600 disabled:cursor-not-allowed transition-all"
                >
                    <SkipBack className="w-5 h-5" />
                </button>

                {/* Step Forward */}
                <button
                    onClick={onStepForward}
                    disabled={currentStep >= totalSteps - 1}
                    className="p-3 rounded-lg bg-background-tertiary text-gray-400 hover:text-white hover:bg-background-tertiary/70 disabled:text-gray-600 disabled:cursor-not-allowed transition-all"
                >
                    <SkipForward className="w-5 h-5" />
                </button>
            </div>

            {/* Step Counter */}
            <div className="flex items-center gap-3">
                <div className="text-sm font-mono text-gray-400">
                    Step <span className="text-primary font-bold">{currentStep + 1}</span> of{' '}
                    <span className="text-white font-bold">{totalSteps}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-32 h-2 bg-background-tertiary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
