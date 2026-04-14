import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Loader2 } from 'lucide-react';

/**
 * MapHeatmap Component
 * Displays air quality heatmap on geographic map
 * Design: Integration with Google Maps visualization library
 */

export default function MapHeatmap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<{ name: string; aqi: number; no2: number; o3: number } | null>(null);

  // Mock data for regions
  const regions = [
    { name: 'Downtown', lat: 40.7128, lng: -74.0060, aqi: 85, no2: 65, o3: 72 },
    { name: 'Industrial Zone', lat: 40.7200, lng: -74.0100, aqi: 120, no2: 95, o3: 88 },
    { name: 'Residential Area', lat: 40.7050, lng: -74.0000, aqi: 55, no2: 35, o3: 48 },
    { name: 'Park Area', lat: 40.7000, lng: -73.9900, aqi: 42, no2: 25, o3: 38 },
    { name: 'Airport Zone', lat: 40.6895, lng: -74.1745, aqi: 95, no2: 70, o3: 82 },
  ];

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getHeatmapColor = (aqi: number) => {
    if (aqi <= 50) return '#52B788'; // Green
    if (aqi <= 100) return '#E8A547'; // Amber
    if (aqi <= 150) return '#F97316'; // Orange
    return '#E85D4E'; // Red
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    return 'Unhealthy';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Map Container */}
      <div className="lg:col-span-3">
        <Card className="p-0 card-shadow-hover overflow-hidden">
          <div
            ref={mapRef}
            className="w-full h-96 lg:h-full min-h-96 relative bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950"
            style={{
              backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663519250541/RanMtJURpp2S9PvGcXJe3V/map-heatmap-pattern-EPctTYj9VysUMqjaPU6tFU.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="text-center">
                  <Loader2 className="animate-spin text-white mx-auto mb-2" size={32} />
                  <p className="text-white text-sm font-medium">Loading heatmap...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Mock Heatmap Points */}
                <div className="absolute inset-0">
                  {regions.map((region, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedRegion(region)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{
                        left: `${20 + idx * 15}%`,
                        top: `${30 + (idx % 2) * 30}%`,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg hover:scale-110 smooth-transition border-2 border-white"
                        style={{ backgroundColor: getHeatmapColor(region.aqi) }}
                      >
                        {region.aqi}
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none">
                        {region.name}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/70 rounded-lg p-3 backdrop-blur">
                  <p className="text-xs font-semibold text-foreground mb-2">AQI Legend</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#52B788' }} />
                      <span>Good (0-50)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E8A547' }} />
                      <span>Moderate (51-100)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F97316' }} />
                      <span>Unhealthy (101-150)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E85D4E' }} />
                      <span>Very Unhealthy (150+)</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Sidebar - Region Details */}
      <div className="lg:col-span-1">
        <Card className="p-6 card-shadow-hover h-full">
          {selectedRegion ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ backgroundColor: getHeatmapColor(selectedRegion.aqi) }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedRegion.name}</h3>
                  <p className="text-xs text-muted-foreground">{getAQIStatus(selectedRegion.aqi)}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div>
                  <p className="text-label text-muted-foreground mb-1">Air Quality Index</p>
                  <p className="text-2xl font-bold text-foreground">{selectedRegion.aqi}</p>
                </div>

                <div>
                  <p className="text-label text-muted-foreground mb-1">NO₂ Level</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-foreground">{selectedRegion.no2} µg/m³</p>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded">
                      {Math.round((selectedRegion.no2 / 200) * 100)}%
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-label text-muted-foreground mb-1">O₃ Level</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-foreground">{selectedRegion.o3} µg/m³</p>
                    <span className="text-xs bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 px-2 py-1 rounded">
                      {Math.round((selectedRegion.o3 / 200) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MapPin size={32} className="text-muted-foreground mb-3 opacity-50" />
              <p className="font-medium text-foreground mb-1">Select a Region</p>
              <p className="text-xs text-muted-foreground">
                Click on any marker on the map to view detailed air quality information
              </p>
            </div>
          )}
        </Card>

        {/* Region List */}
        <Card className="p-4 card-shadow-hover mt-4">
          <p className="text-sm font-semibold text-foreground mb-3">All Regions</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {regions.map((region, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedRegion(region)}
                className={`w-full text-left p-2 rounded-lg smooth-transition ${
                  selectedRegion?.name === region.name
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-secondary text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getHeatmapColor(region.aqi) }}
                  />
                  <span className="text-xs font-medium truncate">{region.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">{region.aqi}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
