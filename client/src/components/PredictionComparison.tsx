import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

/**
 * PredictionComparison Component
 * Shows predicted vs actual pollution values
 * Design: Comparative visualization with environmental colors
 */

export default function PredictionComparison() {
  // Mock data comparing predictions with actual values
  const data = [
    { date: 'Mon', predicted: 45, actual: 42, accuracy: 93 },
    { date: 'Tue', predicted: 52, actual: 55, accuracy: 94 },
    { date: 'Wed', predicted: 48, actual: 46, accuracy: 96 },
    { date: 'Thu', predicted: 62, actual: 65, accuracy: 95 },
    { date: 'Fri', predicted: 58, actual: 60, accuracy: 97 },
    { date: 'Sat', predicted: 42, actual: 40, accuracy: 95 },
    { date: 'Sun', predicted: 38, actual: 36, accuracy: 95 },
  ];

  const avgAccuracy = Math.round(data.reduce((sum, item) => sum + item.accuracy, 0) / data.length);

  return (
    <Card className="p-6 card-shadow-hover">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Model Accuracy</h3>
            <p className="text-sm text-muted-foreground">7-day prediction performance</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-success-green">{avgAccuracy}%</p>
            <p className="text-xs text-muted-foreground">Average Accuracy</p>
          </div>
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <defs>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4A90E2" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6B9E7F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6B9E7F" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{ value: 'µg/m³', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: 'var(--foreground)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar
              dataKey="predicted"
              fill="url(#colorPredicted)"
              radius={[8, 8, 0, 0]}
              name="Predicted"
            />
            <Bar
              dataKey="actual"
              fill="url(#colorActual)"
              radius={[8, 8, 0, 0]}
              name="Actual"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Avg Predicted</p>
          <p className="text-xl font-semibold text-foreground">49 µg/m³</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Avg Actual</p>
          <p className="text-xl font-semibold text-foreground">50 µg/m³</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Variance</p>
          <p className="text-xl font-semibold text-success-green">1 µg/m³</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-sky-blue/20">
        <p className="text-sm font-medium text-foreground mb-1">🎯 Model Performance</p>
        <p className="text-xs text-muted-foreground">
          The AI model achieved an average accuracy of {avgAccuracy}% across 7 days of predictions. 
          This indicates strong predictive capability for air quality forecasting.
        </p>
      </div>
    </Card>
  );
}
