'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

interface TutorialOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function TutorialOverlay({ isVisible, onClose }: TutorialOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glassmorphic max-w-2xl w-full p-8 rounded-3xl space-y-6 shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Icon name="XMarkIcon" size={24} />
            </button>

            <div className="flex items-center space-x-4 mb-2">
              <div className="p-3 rounded-2xl bg-primary/20">
                <Icon name="AcademicCapIcon" size={32} className="text-primary" />
              </div>
              <h2 className="text-3xl font-mono font-bold text-foreground">Quick Tutorial</h2>
            </div>

            <div className="grid gap-6">
              <div className="flex space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary font-mono font-bold">1</div>
                <div>
                  <h3 className="font-mono font-bold text-foreground">Search Instantly</h3>
                  <p className="text-muted-foreground">Type any word in the search box to see real-time suggestions powered by our optimized Trie structure.</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary font-mono font-bold">2</div>
                <div>
                  <h3 className="font-mono font-bold text-foreground">Visualize DS</h3>
                  <p className="text-muted-foreground">Watch how the Trie data structure is traversed node-by-node as you type, highlighting the path to your results.</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary font-mono font-bold">3</div>
                <div>
                  <h3 className="font-mono font-bold text-foreground">Analyze Performance</h3>
                  <p className="text-muted-foreground">Check the metrics dashboard to see search time, nodes visited, and memory efficiency in real-time.</p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all duration-300"
            >
              Got it, let's go!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
