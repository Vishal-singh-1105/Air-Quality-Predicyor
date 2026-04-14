import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

/**
 * HistoricalComparison Component
 * Compares current forecast with past 7 days of target data
 */

interface HistoricalComparisonProps {
  siteId: string;
}

export default function HistoricalComparison({ siteId }: HistoricalComparisonProps) {
  // Mock 7-day historical data
  const data = [
    { date: 'Mon', o3_target: 55, no2_target: 42 },
    { date: 'Tue', o3_target: 62, no2_target: 48 },
    { date: 'Wed', o3_target: 58, no2_target: 45 },
    { date: 'Thu', o3_target: 68, no2_target: 52 },
    { date: 'Fri', o3_target: 65, no2_target: 50 },
    { date: 'Sat', o3_target: 48, no2_target: 38 },
    { date: 'Sun', o3_target: 42, no2_target: 35 },
  ];

  const avgO3 = Math.round(data.reduce((sum, d) => sum + d.o3_target, 0) / data.length);
  const avgNO2 = Math.round(data.reduce((sum, d) => sum + d.no2_target, 0) / data.length);

  return (
    <Card className="p-6 card-shadow-hover">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Past 7 Days - Target Values</h3>
        <p className="text-sm text-muted-foreground">Ground-truth measurements for context and trend analysis</p>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{ value: 'μg/m³', angle: -90, position: 'insideLeft' }}
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
            <Line
              type="monotone"
              dataKey="o3_target"
              stroke="#E8A547"
              strokeWidth={2}
              dot={{ fill: '#E8A547', r: 4 }}
              activeDot={{ r: 6 }}
              name="O₃ Target (Ground Truth)"
            />
            <Line
              type="monotone"
              dataKey="no2_target"
              stroke="#4A90E2"
              strokeWidth={2}
              dot={{ fill: '#4A90E2', r: 4 }}
              activeDot={{ r: 6 }}
              name="NO₂ Target (Ground Truth)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-label text-muted-foreground mb-1">O₃ 7-Day Average</p>
          <p className="text-2xl font-bold text-amber-warning">{avgO3}</p>
          <p className="text-xs text-muted-foreground mt-1">μg/m³</p>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-label text-muted-foreground mb-1">NO₂ 7-Day Average</p>
          <p className="text-2xl font-bold text-sky-blue">{avgNO2}</p>
          <p className="text-xs text-muted-foreground mt-1">μg/m³</p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">📊 Historical Context</p>
        <p className="text-xs text-green-800 dark:text-green-200">
          These are ground-truth measurements from the past 7 days. Comparing today's forecast with this historical data 
          helps identify seasonal patterns and validate model predictions. Use this data to assess forecast accuracy.
        </p>
      </div>
    </Card>
  );
}
