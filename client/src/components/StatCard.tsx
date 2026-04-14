import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatCard Component
 * Reusable card for displaying metrics with optional trend indicator
 * Design: Consistent styling with environmental theme
 */

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'amber' | 'red';
  progressValue?: number;
  progressMax?: number;
  className?: string;
}

const colorMap = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    icon: 'text-sky-blue',
    progress: 'bg-sky-blue',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-950',
    icon: 'text-success-green',
    progress: 'bg-success-green',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950',
    icon: 'text-amber-warning',
    progress: 'bg-amber-warning',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-950',
    icon: 'text-coral-alert',
    progress: 'bg-coral-alert',
  },
};

export function StatCard({
  label,
  value,
  unit,
  trend,
  icon,
  color = 'blue',
  progressValue,
  progressMax,
  className = '',
}: StatCardProps) {
  const colors = colorMap[color];
  const progressPercent = progressValue && progressMax ? (progressValue / progressMax) * 100 : 0;

  return (
    <Card className={`p-6 card-shadow-hover ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-label text-muted-foreground mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-metric text-foreground">{value}</p>
            {unit && <p className="text-xs text-muted-foreground">{unit}</p>}
          </div>
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 ${
              trend.direction === 'up'
                ? 'text-red-600'
                : trend.direction === 'down'
                ? 'text-green-600'
                : 'text-gray-600'
            }`}
          >
            {trend.direction === 'up' ? (
              <TrendingUp size={16} />
            ) : trend.direction === 'down' ? (
              <TrendingDown size={16} />
            ) : null}
            <span className="text-xs font-medium">{trend.percentage}%</span>
          </div>
        )}
      </div>

      {progressValue !== undefined && progressMax !== undefined && (
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.progress} rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      )}

      {icon && (
        <div className={`absolute top-4 right-4 w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center ${colors.icon}`}>
          {icon}
        </div>
      )}
    </Card>
  );
}
