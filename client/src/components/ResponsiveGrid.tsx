import React from 'react';

/**
 * ResponsiveGrid Component
 * Provides consistent responsive grid layout across dashboard
 */

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResponsiveGrid({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className = '',
}: ResponsiveGridProps) {
  const gapMap = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const colsMap = {
    mobile: `grid-cols-${cols.mobile || 1}`,
    tablet: `sm:grid-cols-${cols.tablet || 2}`,
    desktop: `lg:grid-cols-${cols.desktop || 3}`,
  };

  return (
    <div
      className={`grid ${gapMap[gap]} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols.mobile || 1}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * ResponsiveContainer Component
 * Provides consistent max-width and padding
 */

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveContainer({ children, className = '' }: ResponsiveContainerProps) {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
