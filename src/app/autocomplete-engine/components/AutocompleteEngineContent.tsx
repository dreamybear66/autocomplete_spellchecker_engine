/// <reference types="react" />
'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import Icon from '@/components/ui/AppIcon';
import TrieNode from '@/app/interactive-demo-hub/components/TrieNode';
import SuggestionCard from '@/app/interactive-demo-hub/components/SuggestionCard';
import MetricCard from '@/app/interactive-demo-hub/components/MetricCard';
import TutorialOverlay from '@/app/interactive-demo-hub/components/TutorialOverlay';
import BackgroundAnimation from '@/app/interactive-demo-hub/components/BackgroundAnimation';
import { useAutocomplete, Suggestion, TrieNodeData } from '@/hooks/useAutocomplete';

export default function AutocompleteEngineContent() {
  const [isHydrated, setIsHydrated] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    suggestions,
    trieNodes,
    metrics,
    dictionarySize
  } = useAutocomplete();

  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [githubStars, setGithubStars] = useState(1247);

  useEffect(() => {
    setIsHydrated(true);
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
      localStorage.setItem('hasSeenTutorial', 'true');
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setGithubStars((prev: number) => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [isHydrated]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedSuggestion(null);
  };

  const handleSuggestionSelect = (word: string) => {
    setSelectedSuggestion(word);
    setSearchQuery(word);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl lg:text-5xl font-mono font-bold text-foreground">
                Autocomplete Engine
              </h1>
              <p className="text-lg text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <BackgroundAnimation />
      <div className="min-h-screen bg-background relative">
        <div className="pt-24 px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 kinetic-reveal">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Icon name="SparklesIcon" size={16} className="text-primary" />
                <span className="text-sm font-mono text-primary">Trie-Based Autocomplete</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-mono font-bold text-foreground">
                Autocomplete Engine
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience real-time autocomplete powered by advanced Trie data structures with comprehensive Oxford Dictionary coverage.
              </p>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <a
                  href="https://github.com/autocomplete-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-300 magnetic-hover"
                >
                  <Icon name="StarIcon" size={20} className="text-warning" />
                  <span className="font-mono font-semibold text-foreground">{githubStars.toLocaleString()}</span>
                  <Icon name="ArrowTopRightOnSquareIcon" size={16} className="text-muted-foreground" />
                </a>
                <button
                  onClick={() => setShowTutorial(true)}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 magnetic-hover shadow-algorithm"
                >
                  <Icon name="AcademicCapIcon" size={20} />
                  <span>Quick Tutorial</span>
                </button>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 kinetic-reveal">
              <MetricCard
                label="Search Time"
                value={metrics.searchTime}
                icon="⚡"
                trend="up"
                trendValue="+15%"
              />
              <MetricCard
                label="Nodes Traversed"
                value={String(metrics.nodesTraversed)}
                icon="🌳"
                trend="neutral"
                trendValue={`${metrics.nodesTraversed}`}
              />
              <MetricCard
                label="Memory Usage"
                value={metrics.memoryUsage}
                icon="💾"
                trend="down"
                trendValue="-8%"
              />
              <MetricCard
                label="Efficiency"
                value={metrics.efficiency}
                icon="🎯"
                trend="up"
                trendValue="+12%"
              />
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Panel - Search & Suggestions */}
              <div className="space-y-6 kinetic-reveal">
                <div className="glassmorphic rounded-2xl p-6 space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon name="MagnifyingGlassIcon" size={24} className="text-primary" />
                    <h2 className="text-xl font-mono font-bold text-foreground">Search</h2>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Type to search..."
                    className="w-full px-6 py-4 rounded-lg bg-background border-2 border-border focus:border-primary outline-none text-foreground font-mono text-lg transition-all duration-300"
                  />
                  <p className="text-sm text-muted-foreground">
                    Dictionary size: <span className="font-mono font-semibold text-primary">{dictionarySize.toLocaleString()}</span> words
                  </p>
                </div>

                <div className="glassmorphic rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-mono font-bold text-foreground">Suggestions</h2>
                    <span className="text-sm font-mono text-muted-foreground">
                      {suggestions.length} results
                    </span>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {suggestions.length > 0 ? (
                      suggestions.map((suggestion: Suggestion, index: number) => (
                        <SuggestionCard
                          key={suggestion.word}
                          word={suggestion.word}
                          frequency={suggestion.frequency}
                          rank={index + 1}
                          isSelected={selectedSuggestion === suggestion.word}
                          onSelect={() => handleSuggestionSelect(suggestion.word)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Icon name="MagnifyingGlassIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Start typing to see suggestions</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Panel - Trie Visualization */}
              <div className="space-y-6 kinetic-reveal">
                <div className="glassmorphic rounded-2xl p-6 space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon name="CubeTransparentIcon" size={24} className="text-primary" />
                    <h2 className="text-xl font-mono font-bold text-foreground">Trie Visualization</h2>
                  </div>
                  <div className="bg-background rounded-lg p-6 min-h-[400px]">
                    {trieNodes.length > 0 ? (
                      <div className="flex flex-wrap gap-4 justify-center">
                        {trieNodes.map((node: TrieNodeData, index: number) => (
                          <TrieNode key={index} {...node} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Icon name="CubeTransparentIcon" size={64} className="text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Trie structure will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTutorial && (
        <TutorialOverlay isVisible={showTutorial} onClose={() => setShowTutorial(false)} />
      )}
    </>
  );
}