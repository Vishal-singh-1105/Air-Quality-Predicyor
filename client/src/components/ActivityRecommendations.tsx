import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

/**
 * ActivityRecommendations Component
 * Provides hourly activity recommendations for public users
 */

interface ActivityRecommendationsProps {
  siteId: string;
}

export default function ActivityRecommendations({ siteId }: ActivityRecommendationsProps) {
  // Mock hourly recommendations
  const recommendations = [
    { hour: '06:00', activity: 'Safe for outdoor exercise', level: 'safe', pollution: 'Low' },
    { hour: '08:00', activity: 'Good for morning walk', level: 'safe', pollution: 'Low' },
    { hour: '10:00', activity: 'Suitable for outdoor activities', level: 'moderate', pollution: 'Moderate' },
    { hour: '12:00', activity: 'Limit outdoor exposure', level: 'caution', pollution: 'Moderate-High' },
    { hour: '14:00', activity: 'Avoid outdoor exercise', level: 'warning', pollution: 'High' },
    { hour: '16:00', activity: 'Avoid outdoor exercise', level: 'warning', pollution: 'High' },
    { hour: '18:00', activity: 'Limit outdoor exposure', level: 'caution', pollution: 'Moderate-High' },
    { hour: '20:00', activity: 'Suitable for outdoor activities', level: 'moderate', pollution: 'Moderate' },
  ];

  const getIcon = (level: string) => {
    switch (level) {
      case 'safe':
        return <CheckCircle size={18} className="text-success-green" />;
      case 'moderate':
        return <AlertCircle size={18} className="text-amber-warning" />;
      case 'caution':
        return <AlertCircle size={18} className="text-orange-500" />;
      case 'warning':
        return <XCircle size={18} className="text-coral-alert" />;
      default:
        return null;
    }
  };

  const getBgColor = (level: string) => {
    switch (level) {
      case 'safe':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
      case 'moderate':
        return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800';
      case 'caution':
        return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800';
      case 'warning':
        return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {recommendations.map((rec, idx) => (
          <Card
            key={idx}
            className={`p-4 card-shadow-hover border ${getBgColor(rec.level)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">{getIcon(rec.level)}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{rec.hour}</p>
                <p className="text-xs text-foreground/80 mt-1">{rec.activity}</p>
                <p className="text-xs text-muted-foreground mt-2">{rec.pollution}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 card-shadow-hover bg-blue-50 dark:bg-blue-950 border border-sky-blue/20">
        <h3 className="font-semibold text-foreground mb-4">📋 Activity Guidelines</h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <CheckCircle size={18} className="text-success-green flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Safe (Green)</p>
              <p className="text-xs text-foreground/80">All outdoor activities recommended. No restrictions.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <AlertCircle size={18} className="text-amber-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Moderate (Yellow)</p>
              <p className="text-xs text-foreground/80">Sensitive groups should limit prolonged outdoor exposure.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <AlertCircle size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Caution (Orange)</p>
              <p className="text-xs text-foreground/80">General public should limit outdoor activities. Sensitive groups should avoid.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <XCircle size={18} className="text-coral-alert flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Warning (Red)</p>
              <p className="text-xs text-foreground/80">Everyone should avoid outdoor activities. Keep windows closed.</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 card-shadow-hover bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
        <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">💡 Health Tips</p>
        <ul className="space-y-1 text-xs text-purple-800 dark:text-purple-200">
          <li>• Wear N95 masks during high pollution hours</li>
          <li>• Use air purifiers indoors</li>
          <li>• Stay hydrated and avoid strenuous activities</li>
          <li>• Monitor real-time updates for sudden changes</li>
        </ul>
      </Card>
    </div>
  );
}
