import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

/**
 * TrendChart Component
 * Displays NO2 and O3 pollution trends over time
 * Design: Soft gradients, smooth animations, environmental colors
 */

export default function TrendChart() {
  // Mock data for 24-hour trend
  const data = [
    { time: '00:00', no2: 35, o3: 45 },
    { time: '04:00', no2: 28, o3: 38 },
    { time: '08:00', no2: 52, o3: 58 },
    { time: '12:00', no2: 65, o3: 72 },
    { time: '16:00', no2: 48, o3: 68 },
    { time: '20:00', no2: 42, o3: 55 },
    { time: '23:59', no2: 38, o3: 48 },
  ];

  return (
    <Card className="p-6 card-shadow-hover">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">24-Hour Pollution Trend</h3>
        <p className="text-sm text-muted-foreground">Real-time monitoring data</p>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorNo2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorO3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E8A547" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#E8A547" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="time"
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
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="no2"
              stroke="#4A90E2"
              strokeWidth={2}
              dot={{ fill: '#4A90E2', r: 4 }}
              activeDot={{ r: 6 }}
              name="NO₂ Level"
              isAnimationActive={true}
              animationDuration={800}
            />
            <Line
              type="monotone"
              dataKey="o3"
              stroke="#E8A547"
              strokeWidth={2}
              dot={{ fill: '#E8A547', r: 4 }}
              activeDot={{ r: 6 }}
              name="O₃ Level"
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">NO₂ Average</p>
          <p className="text-xl font-semibold text-foreground">44 µg/m³</p>
          <p className="text-xs text-green-600 mt-1">↓ 8% from yesterday</p>
        </div>
        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">O₃ Average</p>
          <p className="text-xl font-semibold text-foreground">56 µg/m³</p>
          <p className="text-xs text-orange-600 mt-1">↑ 12% from yesterday</p>
        </div>
      </div>
    </Card>
  );
}
