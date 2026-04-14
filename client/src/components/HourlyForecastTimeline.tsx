import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '@/components/ui/card';

/**
 * HourlyForecastTimeline Component
 * Displays 24-hour hourly forecasts for O3 and NO2
 */

interface HourlyForecastTimelineProps {
  siteId: string;
  stakeholder: 'researcher' | 'official' | 'public';
}

export default function HourlyForecastTimeline({ siteId, stakeholder }: HourlyForecastTimelineProps) {
  // Mock 24-hour data
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    o3_forecast: Math.round(45 + Math.sin(i / 4) * 20 + Math.random() * 10),
    o3_target: Math.round(48 + Math.sin(i / 4) * 18 + Math.random() * 8),
    no2_forecast: Math.round(35 + Math.cos(i / 5) * 15 + Math.random() * 8),
    no2_target: Math.round(38 + Math.cos(i / 5) * 14 + Math.random() * 7),
  }));

  return (
    <Card className="p-6 card-shadow-hover">
      {stakeholder === 'researcher' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">O₃: Forecast vs Target (24-hour)</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorO3Forecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E8A547" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#E8A547" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorO3Target" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6B9E7F" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6B9E7F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="hour" stroke="var(--muted-foreground)" style={{ fontSize: '11px' }} />
                  <YAxis stroke="var(--muted-foreground)" label={{ value: 'μg/m³', angle: -90, position: 'insideLeft' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="o3_forecast" stroke="#E8A547" strokeWidth={2} dot={{ r: 3 }} name="O₃ Forecast" />
                  <Line type="monotone" dataKey="o3_target" stroke="#6B9E7F" strokeWidth={2} dot={{ r: 3 }} name="O₃ Target (Ground Truth)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">NO₂: Forecast vs Target (24-hour)</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="hour" stroke="var(--muted-foreground)" style={{ fontSize: '11px' }} />
                  <YAxis stroke="var(--muted-foreground)" label={{ value: 'μg/m³', angle: -90, position: 'insideLeft' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="no2_forecast" stroke="#4A90E2" strokeWidth={2} dot={{ r: 3 }} name="NO₂ Forecast" />
                  <Line type="monotone" dataKey="no2_target" stroke="#6B9E7F" strokeWidth={2} dot={{ r: 3 }} name="NO₂ Target (Ground Truth)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {stakeholder === 'official' && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">24-Hour Pollution Forecast</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hour" stroke="var(--muted-foreground)" style={{ fontSize: '11px' }} />
                <YAxis stroke="var(--muted-foreground)" label={{ value: 'μg/m³', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="o3_forecast" fill="#E8A547" radius={[4, 4, 0, 0]} name="O₃ Forecast" />
                <Bar dataKey="no2_forecast" fill="#4A90E2" radius={[4, 4, 0, 0]} name="NO₂ Forecast" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {stakeholder === 'public' && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Hourly Pollution Levels</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hour" stroke="var(--muted-foreground)" style={{ fontSize: '11px' }} />
                <YAxis stroke="var(--muted-foreground)" label={{ value: 'μg/m³', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="o3_forecast" stroke="#E8A547" strokeWidth={2} dot={false} name="O₃ Level" />
                <Line type="monotone" dataKey="no2_forecast" stroke="#4A90E2" strokeWidth={2} dot={false} name="NO₂ Level" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </Card>
  );
}
