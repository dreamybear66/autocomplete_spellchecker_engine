'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AlgorithmVisualizerInteractive from './components/AlgorithmVisualizerInteractive';
import CodeExplanationPanel from './components/CodeExplanationPanel';
import DataStructureExplorer from './components/DataStructureExplorer';

export default function AlgorithmVisualizerPage() {
  return (
    <div className="container py-12 space-y-12">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl font-cta font-bold">Algorithm Visualizer</h1>
        <p className="text-lg text-muted-foreground">
          Step into the inner workings of our Autocomplete Engine. Explore how Tries optimize
          prefix lookups and how BK-Trees calculate linguistic distance in real-time.
        </p>
      </div>

      <AlgorithmVisualizerInteractive />

      <div className="grid md:grid-cols-2 gap-8">
        <CodeExplanationPanel />
        <DataStructureExplorer />
      </div>
    </div>
  );
}
