import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Menu, X, Leaf, Settings, BarChart3, Users, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SiteSelector from '@/components/SiteSelector';
import HourlyForecastTimeline from '@/components/HourlyForecastTimeline';
import ModelPerformanceMetrics from '@/components/ModelPerformanceMetrics';
import SatelliteDataPanel from '@/components/SatelliteDataPanel';
import HistoricalComparison from '@/components/HistoricalComparison';
import ActivityRecommendations from '@/components/ActivityRecommendations';
import FeatureImportanceHeatmap from '@/components/FeatureImportanceHeatmap';
import GeospatialMap from '@/components/GeospatialMap';

/**
 * Enhanced Dashboard - Delhi Air Quality Forecasting System
 * Design: Environmental Minimalism with stakeholder-specific views
 * 
 * Three Stakeholder Views:
 * 1. Researcher: Model metrics, feature importance, forecast vs target
 * 2. Official: Geospatial map, threshold alerts, historical trends
 * 3. Public: Simplified AQI, activity recommendations, hourly guide
 */

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stakeholderView, setStakeholderView] = useState<'researcher' | 'official' | 'public'>('public');
  const [selectedSite, setSelectedSite] = useState('Site_1_Delhi_North');
  const [showSatelliteData, setShowSatelliteData] = useState(true);

  // Delhi sites data
  const delhiSites = [
    { id: 'Site_1_Delhi_North', name: 'Delhi North', lat: 28.7041, lng: 77.1025 },
    { id: 'Site_2_Delhi_South', name: 'Delhi South', lat: 28.5244, lng: 77.1855 },
    { id: 'Site_3_Delhi_East', name: 'Delhi East', lat: 28.6139, lng: 77.2090 },
    { id: 'Site_4_Delhi_West', name: 'Delhi West', lat: 28.6692, lng: 77.0580 },
    { id: 'Site_5_Delhi_Central', name: 'Delhi Central', lat: 28.6329, lng: 77.2197 },
    { id: 'Site_6_Delhi_Northeast', name: 'Delhi Northeast', lat: 28.7500, lng: 77.2500 },
    { id: 'Site_7_Delhi_Southeast', name: 'Delhi Southeast', lat: 28.5500, lng: 77.3000 },
  ];

  const currentSite = delhiSites.find(s => s.id === selectedSite) || delhiSites[0];

  // Mock real-time data for selected site
  const siteData = {
    temperature: 24,
    humidity: 65,
    windU: 3.2,
    windV: 1.8,
    windW: 0.5,
    o3_target: 62,
    o3_forecast: 58,
    no2_target: 45,
    no2_forecast: 42,
    hcho_satellite: 0.85,
    no2_satellite: 15.2,
    ratio_hcho_no2: 0.056,
  };

  const getStakeholderLabel = (view: string) => {
    const labels = {
      researcher: '👨‍🔬 Researcher View',
      official: '👮 Official View',
      public: '👥 Public View',
    };
    return labels[view as keyof typeof labels];
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card card-shadow">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-secondary rounded-lg smooth-transition"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sage-green to-sky-blue flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <h1 className="text-lg font-bold text-foreground hidden sm:block">Delhi AQ Forecasting</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {getStakeholderLabel(stakeholderView)}
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary rounded-lg smooth-transition"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } border-r border-border bg-card transition-all duration-300 overflow-hidden lg:w-64 lg:block`}
        >
          <nav className="p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground px-2 py-2">STAKEHOLDER VIEW</p>
            {[
              { id: 'researcher', label: '👨‍🔬 Researcher', desc: 'Model metrics & validation' },
              { id: 'official', label: '👮 Official', desc: 'Alerts & spatial view' },
              { id: 'public', label: '👥 Public', desc: 'Activity recommendations' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setStakeholderView(item.id as any);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg smooth-transition ${
                  stakeholderView === item.id
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-secondary text-foreground'
                }`}
              >
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </button>
            ))}

            <div className="border-t border-border pt-4 mt-4">
              <p className="text-xs font-semibold text-muted-foreground px-2 py-2">SETTINGS</p>
              <label className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary rounded-lg cursor-pointer smooth-transition">
                <input
                  type="checkbox"
                  checked={showSatelliteData}
                  onChange={(e) => setShowSatelliteData(e.target.checked)}
                  className="rounded"
                />
                <span>Show Satellite Data</span>
              </label>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Site Selector */}
            <SiteSelector
              sites={delhiSites}
              selectedSite={selectedSite}
              onSiteChange={setSelectedSite}
            />

            {/* Researcher View */}
            {stakeholderView === 'researcher' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Model Performance & Validation</h2>
                  <ModelPerformanceMetrics siteId={selectedSite} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">24-Hour Forecast vs Target</h2>
                  <HourlyForecastTimeline siteId={selectedSite} stakeholder="researcher" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Feature Importance Analysis</h2>
                  <FeatureImportanceHeatmap siteId={selectedSite} />
                </div>

                {showSatelliteData && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Satellite Observations</h2>
                    <SatelliteDataPanel siteData={siteData} />
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold mb-4">Historical Comparison (Past 7 Days)</h2>
                  <HistoricalComparison siteId={selectedSite} />
                </div>
              </div>
            )}

            {/* Official View */}
            {stakeholderView === 'official' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Geospatial Pollution Map</h2>
                  <GeospatialMap sites={delhiSites} selectedSite={selectedSite} onSiteSelect={setSelectedSite} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">24-Hour Forecast Timeline</h2>
                  <HourlyForecastTimeline siteId={selectedSite} stakeholder="official" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Current Status</h3>
                    <ModelPerformanceMetrics siteId={selectedSite} compact={true} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Threshold Alerts</h3>
                    <Card className="p-6 card-shadow-hover">
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm font-medium text-green-900 dark:text-green-100">✓ NO₂ Within Safe Limits</p>
                          <p className="text-xs text-green-800 dark:text-green-200 mt-1">Current: {siteData.no2_forecast} μg/m³ (Safe: &lt;80)</p>
                        </div>
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">⚠ O₃ Moderate Level</p>
                          <p className="text-xs text-yellow-800 dark:text-yellow-200 mt-1">Current: {siteData.o3_forecast} μg/m³ (Caution: 60-100)</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Historical Comparison (Past 7 Days)</h2>
                  <HistoricalComparison siteId={selectedSite} />
                </div>
              </div>
            )}

            {/* Public View */}
            {stakeholderView === 'public' && (
              <div className="space-y-6">
                {/* Simplified AQI */}
                <Card className="p-6 card-shadow-hover bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
                  <h3 className="text-lg font-bold mb-4 text-foreground">Air Quality Today</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">NO₂ Level</p>
                      <p className="text-3xl font-bold text-sky-blue">{siteData.no2_forecast}</p>
                      <p className="text-xs text-green-600 mt-1">✓ Good</p>
                      <p className="text-xs text-muted-foreground">μg/m³</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">O₃ Level</p>
                      <p className="text-3xl font-bold text-amber-warning">{siteData.o3_forecast}</p>
                      <p className="text-xs text-yellow-600 mt-1">⚠ Moderate</p>
                      <p className="text-xs text-muted-foreground">μg/m³</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Overall AQI</p>
                      <p className="text-3xl font-bold text-yellow-500">68</p>
                      <p className="text-xs text-yellow-600 mt-1">⚠ Moderate</p>
                      <p className="text-xs text-muted-foreground">Index</p>
                    </div>
                  </div>
                </Card>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Hourly Activity Guide</h2>
                  <ActivityRecommendations siteId={selectedSite} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">24-Hour Forecast</h2>
                  <HourlyForecastTimeline siteId={selectedSite} stakeholder="public" />
                </div>

                <Card className="p-6 card-shadow-hover bg-blue-50 dark:bg-blue-950 border border-sky-blue/20">
                  <div className="flex gap-4">
                    <AlertCircle className="text-sky-blue flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Health Tips</h4>
                      <ul className="space-y-1 text-sm text-foreground/90">
                        <li>• Moderate pollution today - sensitive groups should limit outdoor activities</li>
                        <li>• Best time for outdoor exercise: 6:00 AM - 8:00 AM (lowest pollution)</li>
                        <li>• Consider using N95 masks if exercising in afternoon</li>
                        <li>• Keep windows closed during peak hours (2:00 PM - 6:00 PM)</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
