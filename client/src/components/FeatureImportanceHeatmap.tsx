import { Card } from '@/components/ui/card';

/**
 * FeatureImportanceHeatmap Component
 * Displays which parameters are most influential in forecasts
 */

interface FeatureImportanceHeatmapProps {
  siteId: string;
}

export default function FeatureImportanceHeatmap({ siteId }: FeatureImportanceHeatmapProps) {
  // Mock feature importance data
  const features = [
    { name: 'Temperature (T)', o3: 0.92, no2: 0.78 },
    { name: 'Humidity (q)', o3: 0.85, no2: 0.72 },
    { name: 'Wind U Component', o3: 0.88, no2: 0.81 },
    { name: 'Wind V Component', o3: 0.86, no2: 0.79 },
    { name: 'Wind W Component', o3: 0.72, no2: 0.65 },
    { name: 'NO₂ Satellite', o3: 0.68, no2: 0.95 },
    { name: 'HCHO Satellite', o3: 0.91, no2: 0.58 },
    { name: 'HCHO/NO₂ Ratio', o3: 0.87, no2: 0.62 },
    { name: 'Past 7-day O₃', o3: 0.89, no2: 0.45 },
    { name: 'Past 7-day NO₂', o3: 0.52, no2: 0.88 },
  ];

  const getColor = (value: number) => {
    if (value >= 0.85) return 'bg-red-500 dark:bg-red-600';
    if (value >= 0.70) return 'bg-orange-500 dark:bg-orange-600';
    if (value >= 0.55) return 'bg-yellow-500 dark:bg-yellow-600';
    return 'bg-green-500 dark:bg-green-600';
  };

  const getTextColor = (value: number) => {
    return value >= 0.55 ? 'text-white' : 'text-foreground';
  };

  return (
    <Card className="p-6 card-shadow-hover">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Feature Importance Analysis</h3>
        <p className="text-sm text-muted-foreground">Relative influence of input parameters on forecast accuracy (0-1 scale)</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Parameter</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">O₃ Importance</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">NO₂ Importance</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr key={idx} className="border-b border-border hover:bg-secondary/50 smooth-transition">
                <td className="py-3 px-4 text-sm text-foreground font-medium">{feature.name}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`w-16 h-8 rounded flex items-center justify-center ${getColor(feature.o3)} ${getTextColor(feature.o3)}`}
                    >
                      <span className="text-xs font-bold">{feature.o3.toFixed(2)}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`w-16 h-8 rounded flex items-center justify-center ${getColor(feature.no2)} ${getTextColor(feature.no2)}`}
                    >
                      <span className="text-xs font-bold">{feature.no2.toFixed(2)}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3">
        <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-xs font-semibold text-red-900 dark:text-red-100">Very High</p>
          <p className="text-xs text-red-800 dark:text-red-200">0.85 - 1.00</p>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-xs font-semibold text-orange-900 dark:text-orange-100">High</p>
          <p className="text-xs text-orange-800 dark:text-orange-200">0.70 - 0.84</p>
        </div>
        <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs font-semibold text-yellow-900 dark:text-yellow-100">Moderate</p>
          <p className="text-xs text-yellow-800 dark:text-yellow-200">0.55 - 0.69</p>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-xs font-semibold text-green-900 dark:text-green-100">Low</p>
          <p className="text-xs text-green-800 dark:text-green-200">0.00 - 0.54</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-sky-blue/20">
        <p className="text-sm font-medium text-foreground mb-2">🔬 Interpretation</p>
        <p className="text-xs text-foreground/80">
          Temperature and satellite HCHO data are the strongest predictors for O₃, while NO₂ satellite observations 
          dominate NO₂ forecasts. Wind components and historical data provide secondary support. This analysis helps 
          identify which parameters to prioritize for model improvements.
        </p>
      </div>
    </Card>
  );
}
