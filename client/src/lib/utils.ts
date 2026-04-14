import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get AQI status and color based on AQI value
 */
export function getAQIInfo(aqi: number) {
  if (aqi <= 50) {
    return {
      status: 'Good',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      borderColor: 'border-green-200 dark:border-green-800',
    };
  }
  if (aqi <= 100) {
    return {
      status: 'Moderate',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
    };
  }
  if (aqi <= 150) {
    return {
      status: 'Unhealthy for Sensitive Groups',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      borderColor: 'border-orange-200 dark:border-orange-800',
    };
  }
  return {
    status: 'Unhealthy',
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950',
    borderColor: 'border-red-200 dark:border-red-800',
  };
}

/**
 * Format time for display
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get trend direction and percentage
 */
export function getTrendInfo(current: number, previous: number) {
  const change = current - previous;
  const percentage = Math.round((Math.abs(change) / previous) * 100);
  const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
  return { change, percentage, direction };
}
