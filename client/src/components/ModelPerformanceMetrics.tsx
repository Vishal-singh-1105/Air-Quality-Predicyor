import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

/**
 * ModelPerformanceMetrics Component
 * Displays RMSE, R², and RIA metrics for model validation
 */

interface ModelPerformanceMetricsProps {
  siteId: string;
  compact?: boolean;
}

export default function ModelPerformanceMetrics({ siteId, compact = false }: ModelPerformanceMetricsProps) {
  // Mock metrics data
  const metrics = {
    o3: {
      rmse: 8.5,
      r2: 0.87,
      ria: 0.92,
    },
    no2: {
      rmse: 6.2,
      r2: 0.91,
      ria: 0.95,
    },
  };

  if (compact) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Card className="p-4 card-shadow-hover">
          <p className="text-xs text-muted-foreground mb-2">O₃ RMSE</p>
          <p className="text-2xl font-bold text-foreground">{metrics.o3.rmse}</p>
          <p className="text-xs text-muted-foreground">μg/m³</p>
        </Card>
        <Card className="p-4 card-shadow-hover">
          <p className="text-xs text-muted-foreground mb-2">O₃ R²</p>
          <p className="text-2xl font-bold text-success-green">{metrics.o3.r2.toFixed(2)}</p>
          <p className="text-xs text-success-green">Excellent</p>
        </Card>
        <Card className="p-4 card-shadow-hover">
          <p className="text-xs text-muted-foreground mb-2">O₃ RIA</p>
          <p className="text-2xl font-bold text-success-green">{metrics.o3.ria.toFixed(2)}</p>
          <p className="text-xs text-success-green">High Agreement</p>
        </Card>
        <Card className="p-4 card-shadow-hover">
          <p className="text-xs text-muted-foreground mb-2">NO₂ RMSE</p>
          <p className="text-2xl font-bold text-foreground">{metrics.no2.rmse}</p>
          <p className="text-xs text-muted-foreground">μg/m³</p>
        </Card>
        <Card className="p-4 card-shadow-hover">
          <p className="text-xs text-muted-foreground mb-2">NO₂ R²</p>
          <p className="text-2xl font-bold text-success-green">{metrics.no2.r2.toFixed(2)}</p>
          <p className="text-xs text-success-green">Excellent</p>
        </Card>
        <Card className="p-4 card-shadow-hover">
          <p className="text-xs text-muted-foreground mb-2">NO₂ RIA</p>
          <p className="text-2xl font-bold text-success-green">{metrics.no2.ria.toFixed(2)}</p>
          <p className="text-xs text-success-green">High Agreement</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* O3 Metrics */}
      <Card className="p-6 card-shadow-hover">
        <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <span className="text-2xl">🌫️</span> O₃ Model Performance
        </h3>

        <div className="space-y-4">
          <div className="border-b border-border pb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-label text-muted-foreground">Root Mean Square Error (RMSE)</p>
                <p className="text-metric text-foreground mt-1">{metrics.o3.rmse}</p>
              </div>
              <p className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded">μg/m³</p>
            </div>
            <p className="text-xs text-muted-foreground">Lower is better. Measures average prediction error.</p>
          </div>

          <div className="border-b border-border pb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-label text-muted-foreground">Coefficient of Determination (R²)</p>
                <p className="text-metric text-success-green mt-1">{metrics.o3.r2.toFixed(3)}</p>
              </div>
              <p className="text-xs bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-2 py-1 rounded">Excellent</p>
            </div>
            <p className="text-xs text-muted-foreground">Proportion of variance explained by model (0-1 scale).</p>
          </div>

          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-label text-muted-foreground">Refined Index of Agreement (RIA)</p>
                <p className="text-metric text-success-green mt-1">{metrics.o3.ria.toFixed(3)}</p>
              </div>
              <p className="text-xs bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-2 py-1 rounded">High</p>
            </div>
            <p className="text-xs text-muted-foreground">Agreement between forecast and target values (0-1 scale).</p>
          </div>
        </div>

        <div className="mt-6 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-xs font-medium text-green-900 dark:text-green-100">✓ Model Validation: 75% Training / 25% Testing</p>
        </div>
      </Card>

      {/* NO2 Metrics */}
      <Card className="p-6 card-shadow-hover">
        <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <span className="text-2xl">💨</span> NO₂ Model Performance
        </h3>

        <div className="space-y-4">
          <div className="border-b border-border pb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-label text-muted-foreground">Root Mean Square Error (RMSE)</p>
                <p className="text-metric text-foreground mt-1">{metrics.no2.rmse}</p>
              </div>
              <p className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded">μg/m³</p>
            </div>
            <p className="text-xs text-muted-foreground">Lower is better. Measures average prediction error.</p>
          </div>

          <div className="border-b border-border pb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-label text-muted-foreground">Coefficient of Determination (R²)</p>
                <p className="text-metric text-success-green mt-1">{metrics.no2.r2.toFixed(3)}</p>
              </div>
              <p className="text-xs bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-2 py-1 rounded">Excellent</p>
            </div>
            <p className="text-xs text-muted-foreground">Proportion of variance explained by model (0-1 scale).</p>
          </div>

          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-label text-muted-foreground">Refined Index of Agreement (RIA)</p>
                <p className="text-metric text-success-green mt-1">{metrics.no2.ria.toFixed(3)}</p>
              </div>
              <p className="text-xs bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-2 py-1 rounded">High</p>
            </div>
            <p className="text-xs text-muted-foreground">Agreement between forecast and target values (0-1 scale).</p>
          </div>
        </div>

        <div className="mt-6 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-xs font-medium text-green-900 dark:text-green-100">✓ Model Validation: 75% Training / 25% Testing</p>
        </div>
      </Card>
    </div>
  );
}
