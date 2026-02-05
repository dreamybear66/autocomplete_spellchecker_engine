'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock, Sparkles, BarChart3, FlaskConical } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Autocomplete Engine', path: '/autocomplete-engine', icon: Sparkles },
        { name: 'Spell Checker Engine', path: '/spell-checker-engine', icon: Lock },
        { name: 'Algorithm Visualizer', path: '/algorithm-visualizer', icon: BarChart3 },
        { name: 'Performance Lab', path: '/performance-lab', icon: FlaskConical },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background-card border-b border-border backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                                <Lock className="w-5 h-5 text-background" />
                            </div>
                            <div className="absolute -inset-1 bg-primary/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-mono font-semibold text-white tracking-tight">
                                AutoComplete Pro
                            </span>
                            <span className="text-xs text-gray-400 font-mono">
                                Algorithms Made Visible
                            </span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`group relative px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-400 hover:text-white hover:bg-background-tertiary/50'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-current'
                                            }`} />
                                        <span className="font-mono text-sm font-medium">{item.name}</span>
                                    </div>
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Get Started Button */}
                    <div className="hidden lg:flex items-center">
                        <Link
                            href="/contact"
                            className="px-6 py-2 rounded-lg bg-primary text-background font-mono font-semibold text-sm hover:bg-primary-light transition-all shadow-neon"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="lg:hidden p-2 rounded-lg hover:bg-background-tertiary/50 transition-colors">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
