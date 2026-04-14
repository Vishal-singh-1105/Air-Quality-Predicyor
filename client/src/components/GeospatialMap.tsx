import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

/**
 * GeospatialMap Component
 * Displays 7 Delhi sites on a geospatial map with pollution levels
 */

interface Site {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface GeospatialMapProps {
  sites: Site[];
  selectedSite: string;
  onSiteSelect: (siteId: string) => void;
}

export default function GeospatialMap({ sites, selectedSite, onSiteSelect }: GeospatialMapProps) {
  // Mock pollution data for each site
  const siteData: Record<string, { o3: number; no2: number; aqi: number }> = {
    Site_1_Delhi_North: { o3: 58, no2: 42, aqi: 65 },
    Site_2_Delhi_South: { o3: 62, no2: 48, aqi: 72 },
    Site_3_Delhi_East: { o3: 55, no2: 38, aqi: 62 },
    Site_4_Delhi_West: { o3: 68, no2: 52, aqi: 78 },
    Site_5_Delhi_Central: { o3: 65, no2: 50, aqi: 75 },
    Site_6_Delhi_Northeast: { o3: 52, no2: 35, aqi: 58 },
    Site_7_Delhi_Southeast: { o3: 60, no2: 45, aqi: 68 },
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#52B788';
    if (aqi <= 100) return '#E8A547';
    if (aqi <= 150) return '#F97316';
    return '#E85D4E';
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy';
    return 'Very Unhealthy';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Map Container */}
      <div className="lg:col-span-3">
        <Card className="p-0 card-shadow-hover overflow-hidden h-96 lg:h-full min-h-96">
          <div
            className="w-full h-full relative bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950 flex items-center justify-center"
            style={{
              backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663519250541/RanMtJURpp2S9PvGcXJe3V/map-heatmap-pattern-EPctTYj9VysUMqjaPU6tFU.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Mock Map with Sites */}
              <div className="relative w-full h-full">
                {sites.map((site, idx) => (
                  <button
                    key={site.id}
                    onClick={() => onSiteSelect(site.id)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{
                      left: `${20 + idx * 12}%`,
                      top: `${30 + (idx % 2) * 35}%`,
                    }}
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg hover:scale-110 smooth-transition border-4 ${
                        selectedSite === site.id ? 'border-white' : 'border-white/60'
                      }`}
                      style={{ backgroundColor: getAQIColor(siteData[site.id].aqi) }}
                    >
                      {siteData[site.id].aqi}
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none">
                      {site.name}
                    </div>
                  </button>
                ))}
              </div>
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
          </div>
        </Card>
      </div>

      {/* Sidebar - Site Details */}
      <div className="lg:col-span-1">
        <Card className="p-6 card-shadow-hover h-full">
          {selectedSite && siteData[selectedSite] ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ backgroundColor: getAQIColor(siteData[selectedSite].aqi) }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{sites.find(s => s.id === selectedSite)?.name}</h3>
                  <p className="text-xs text-muted-foreground">{getAQIStatus(siteData[selectedSite].aqi)}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div>
                  <p className="text-label text-muted-foreground mb-1">Air Quality Index</p>
                  <p className="text-2xl font-bold text-foreground">{siteData[selectedSite].aqi}</p>
                </div>

                <div>
                  <p className="text-label text-muted-foreground mb-1">O₃ Level</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-foreground">{siteData[selectedSite].o3} μg/m³</p>
                    <span className="text-xs bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 px-2 py-1 rounded">
                      {Math.round((siteData[selectedSite].o3 / 200) * 100)}%
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-label text-muted-foreground mb-1">NO₂ Level</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-foreground">{siteData[selectedSite].no2} μg/m³</p>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded">
                      {Math.round((siteData[selectedSite].no2 / 200) * 100)}%
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
              <p className="font-medium text-foreground mb-1">Select a Site</p>
              <p className="text-xs text-muted-foreground">
                Click on any marker on the map to view detailed air quality information
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
