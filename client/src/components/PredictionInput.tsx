import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Loader2 } from 'lucide-react';

/**
 * PredictionInput Component
 * Allows users to input environmental parameters and get AI predictions
 * Design: Clean form layout with real-time validation
 */

export default function PredictionInput() {
  const [formData, setFormData] = useState({
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    dayOfWeek: 'Monday',
    timeOfDay: 'afternoon',
  });

  const [predictions, setPredictions] = useState<{ no2: number; o3: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'dayOfWeek' || name === 'timeOfDay' ? value : parseFloat(value),
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock prediction logic
    const no2Pred = Math.round(
      formData.temperature * 1.2 +
      formData.humidity * 0.3 +
      formData.windSpeed * -0.5 +
      Math.random() * 10
    );
    
    const o3Pred = Math.round(
      formData.temperature * 1.5 +
      formData.humidity * -0.2 +
      formData.windSpeed * -0.3 +
      Math.random() * 15
    );

    setPredictions({ no2: Math.max(0, no2Pred), o3: Math.max(0, o3Pred) });
    setLoading(false);
  };

  const getAQIStatus = (value: number) => {
    if (value <= 50) return { status: 'Good', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950' };
    if (value <= 100) return { status: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-950' };
    if (value <= 150) return { status: 'Unhealthy for Sensitive Groups', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950' };
    return { status: 'Unhealthy', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950' };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Input Form */}
      <div className="lg:col-span-1">
        <Card className="p-6 card-shadow-hover">
          <h3 className="text-lg font-semibold text-foreground mb-4">Environmental Parameters</h3>
          
          <div className="space-y-4">
            {/* Temperature */}
            <div>
              <label className="text-label text-muted-foreground mb-2 block">
                Temperature (°C)
              </label>
              <input
                type="range"
                name="temperature"
                min="0"
                max="50"
                value={formData.temperature}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-foreground font-medium">{formData.temperature}°C</span>
                <span className="text-xs text-muted-foreground">0 - 50°C</span>
              </div>
            </div>

            {/* Humidity */}
            <div>
              <label className="text-label text-muted-foreground mb-2 block">
                Humidity (%)
              </label>
              <input
                type="range"
                name="humidity"
                min="0"
                max="100"
                value={formData.humidity}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-foreground font-medium">{formData.humidity}%</span>
                <span className="text-xs text-muted-foreground">0 - 100%</span>
              </div>
            </div>

            {/* Wind Speed */}
            <div>
              <label className="text-label text-muted-foreground mb-2 block">
                Wind Speed (km/h)
              </label>
              <input
                type="range"
                name="windSpeed"
                min="0"
                max="50"
                value={formData.windSpeed}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-foreground font-medium">{formData.windSpeed} km/h</span>
                <span className="text-xs text-muted-foreground">0 - 50 km/h</span>
              </div>
            </div>

            {/* Pressure */}
            <div>
              <label className="text-label text-muted-foreground mb-2 block">
                Pressure (hPa)
              </label>
              <input
                type="number"
                name="pressure"
                value={formData.pressure}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
              />
            </div>

            {/* Day of Week */}
            <div>
              <label className="text-label text-muted-foreground mb-2 block">
                Day of Week
              </label>
              <select
                name="dayOfWeek"
                value={formData.dayOfWeek}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            {/* Time of Day */}
            <div>
              <label className="text-label text-muted-foreground mb-2 block">
                Time of Day
              </label>
              <select
                name="timeOfDay"
                value={formData.timeOfDay}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
              >
                <option value="morning">Morning (6-12)</option>
                <option value="afternoon">Afternoon (12-18)</option>
                <option value="evening">Evening (18-24)</option>
                <option value="night">Night (0-6)</option>
              </select>
            </div>

            <Button
              onClick={handlePredict}
              disabled={loading}
              className="w-full bg-sage-green hover:bg-sage-green/90 text-white mt-6"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <Zap size={16} className="mr-2" />
                  Predict Pollution Levels
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Predictions Results */}
      <div className="lg:col-span-2">
        {predictions ? (
          <div className="space-y-4">
            {/* NO2 Prediction */}
            <Card className={`p-6 card-shadow-hover ${getAQIStatus(predictions.no2).bg}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-label text-muted-foreground mb-1">Predicted NO₂ Level</p>
                  <p className="text-4xl font-bold text-foreground">{predictions.no2}</p>
                  <p className="text-sm text-muted-foreground mt-1">µg/m³</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${getAQIStatus(predictions.no2).color}`}>
                    {getAQIStatus(predictions.no2).status}
                  </p>
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-blue rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((predictions.no2 / 200) * 100, 100)}%` }}
                />
              </div>
            </Card>

            {/* O3 Prediction */}
            <Card className={`p-6 card-shadow-hover ${getAQIStatus(predictions.o3).bg}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-label text-muted-foreground mb-1">Predicted O₃ Level</p>
                  <p className="text-4xl font-bold text-foreground">{predictions.o3}</p>
                  <p className="text-sm text-muted-foreground mt-1">µg/m³</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${getAQIStatus(predictions.o3).color}`}>
                    {getAQIStatus(predictions.o3).status}
                  </p>
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-warning rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((predictions.o3 / 200) * 100, 100)}%` }}
                />
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="p-6 card-shadow-hover bg-blue-50 dark:bg-blue-950 border border-sky-blue/20">
              <h4 className="font-semibold text-foreground mb-3">🤖 AI Insights</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Current temperature ({formData.temperature}°C) is favorable for pollution dispersion</li>
                <li>• Wind speed ({formData.windSpeed} km/h) will help reduce local pollution concentration</li>
                <li>• {formData.timeOfDay === 'afternoon' ? 'Afternoon peak pollution expected' : 'Lower pollution expected at this time'}</li>
                <li>• Humidity levels ({formData.humidity}%) may affect pollutant formation rates</li>
              </ul>
            </Card>
          </div>
        ) : (
          <Card className="p-12 card-shadow-hover flex items-center justify-center min-h-96">
            <div className="text-center">
              <Zap size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-foreground font-medium mb-2">Ready to Predict</p>
              <p className="text-sm text-muted-foreground">
                Adjust the parameters and click "Predict Pollution Levels" to see AI-powered forecasts
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
