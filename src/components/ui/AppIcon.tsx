'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppIconProps {
    name: string;
    size?: number | string;
    className?: string;
    color?: string;
    strokeWidth?: number;
}

const AppIcon = ({
    name,
    size = 24,
    className,
    color,
    strokeWidth = 2
}: AppIconProps) => {
    // Try to find the icon in Lucide
    // Convert name (e.g., 'search') to Lucide format (e.g., 'Search')
    const lucideName = name.charAt(0).toUpperCase() + name.slice(1);
    const IconComponent = (LucideIcons as any)[lucideName] as LucideIcon;

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in lucide-react`);
        return <LucideIcons.HelpCircle size={size} className={className} />;
    }

    return (
        <IconComponent
            size={size}
            className={className}
            color={color}
            strokeWidth={strokeWidth}
        />
    );
};

export default AppIcon;
