'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { cn } from '@/lib/utils';

export interface SuggestionCardProps {
  word: string;
  frequency: number;
  rank: number;
  isSelected: boolean;
  onSelect: () => void;
}

const SuggestionCard = ({
  word,
  frequency,
  rank,
  isSelected,
  onSelect
}: SuggestionCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300",
        isSelected
          ? "bg-primary/20 border-2 border-primary shadow-algorithm scale-[1.02]"
          : "bg-background/40 border border-border hover:border-primary/50 hover:bg-background/60"
      )}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-mono font-bold text-muted-foreground">
          {rank}
        </div>
        <span className="font-mono text-lg font-semibold text-foreground">{word}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-mono text-muted-foreground">{frequency.toLocaleString()} hits</span>
        <Icon
          name={isSelected ? "CheckCircleIcon" : "ArrowRightIcon"}
          size={18}
          className={isSelected ? "text-primary" : "text-muted-foreground"}
        />
      </div>
    </div>
  );
};

export default SuggestionCard;
