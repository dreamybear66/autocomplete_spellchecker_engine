import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '@/styles/tailwind.css';
import '@/styles/index.css';
import NeuralBackground from '@/components/layout/NeuralBackground';
import Header from '@/components/common/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-cta',
});

export const metadata: Metadata = {
  title: 'AutoComplete Pro | DSA Autocomplete & Spell Correction',
  description: 'Production-ready autocomplete and spell correction engine powered by advanced Trie and BK-Tree data structures.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary`}>
        <NeuralBackground />
        <div className="relative flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
