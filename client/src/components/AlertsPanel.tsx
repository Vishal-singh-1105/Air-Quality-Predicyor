import { AlertCircle, AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * AlertsPanel Component
 * Displays air quality alerts and AI-generated insights
 * Design: Color-coded alerts with environmental context
 */

export default function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High O₃ Expected This Afternoon',
      description: 'AI predicts ozone levels will peak between 2-4 PM. Sensitive groups should limit outdoor activities.',
      icon: TrendingUp,
      color: 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800',
      textColor: 'text-amber-900 dark:text-amber-100',
    },
    {
      id: 2,
      type: 'alert',
      title: 'NO₂ Levels Rising',
      description: 'Traffic-related pollution increasing. Consider using public transportation or staying indoors.',
      icon: AlertTriangle,
      color: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800',
      textColor: 'text-orange-900 dark:text-orange-100',
    },
    {
      id: 3,
      type: 'info',
      title: 'Good Air Quality Expected Tomorrow',
      description: 'Wind patterns will improve air quality. Great day for outdoor activities!',
      icon: Zap,
      color: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
      textColor: 'text-green-900 dark:text-green-100',
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Alerts & Insights</h2>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <Card
              key={alert.id}
              className={`p-4 border-l-4 ${alert.color} card-shadow-hover cursor-pointer hover:shadow-lg smooth-transition`}
            >
              <div className="flex gap-4">
                <div className={`flex-shrink-0 mt-0.5 ${alert.textColor}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${alert.textColor}`}>
                    {alert.title}
                  </h3>
                  <p className={`text-sm mt-1 ${alert.textColor} opacity-90`}>
                    {alert.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recommendations */}
      <Card className="mt-6 p-6 card-shadow-hover bg-blue-50 dark:bg-blue-950 border border-sky-blue/20">
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <AlertCircle className="text-sky-blue" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Health Recommendations</h3>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li>✓ Wear N95 masks if going outdoors during peak pollution hours</li>
              <li>✓ Keep windows closed when pollution levels are high</li>
              <li>✓ Use air purifiers indoors for better air quality</li>
              <li>✓ Avoid strenuous outdoor activities in the afternoon</li>
              <li>✓ Monitor real-time updates for sudden changes</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Last Updated */}
      <div className="mt-4 text-center text-xs text-muted-foreground">
        Last updated: {new Date().toLocaleString()} • Next update in 5 minutes
      </div>
    </div>
  );
}
