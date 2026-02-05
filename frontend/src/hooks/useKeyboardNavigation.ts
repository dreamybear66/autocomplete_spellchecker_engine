'use client';

import { useEffect } from 'react';

interface KeyboardNavigationProps {
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onEnter?: () => void;
    onEscape?: () => void;
}

export function useKeyboardNavigation({
    onArrowUp,
    onArrowDown,
    onEnter,
    onEscape,
}: KeyboardNavigationProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    onArrowUp?.();
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    onArrowDown?.();
                    break;
                case 'Enter':
                    event.preventDefault();
                    onEnter?.();
                    break;
                case 'Escape':
                    event.preventDefault();
                    onEscape?.();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onArrowUp, onArrowDown, onEnter, onEscape]);
}
