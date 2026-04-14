import { Card } from '@/components/ui/card';
import { Satellite, AlertCircle } from 'lucide-react';

/**
 * SatelliteDataPanel Component
 * Displays satellite observations (NO2, HCHO, ratios)
 */

interface SiteData {
  hcho_satellite: number;
  no2_satellite: number;
  ratio_hcho_no2: number;
}

interface SatelliteDataPanelProps {
  siteData: SiteData;
}

export default function SatelliteDataPanel({ siteData }: SatelliteDataPanelProps) {
  return (
    <Card className="p-6 card-shadow-hover">
      <div className="flex items-center gap-2 mb-6">
        <Satellite size={20} className="text-sky-blue" />
        <h3 className="text-lg font-semibold text-foreground">Satellite Observations</h3>
        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded ml-auto">
          Updated Daily
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* NO2 Satellite */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-label text-muted-foreground mb-2">NO₂ (Satellite)</p>
          <p className="text-3xl font-bold text-sky-blue">{siteData.no2_satellite}</p>
          <p className="text-xs text-muted-foreground mt-1">DU (Dobson Units)</p>
          <p className="text-xs text-blue-600 dark:text-blue-300 mt-2">From TROPOMI/Sentinel-5P</p>
        </div>

        {/* HCHO Satellite */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-label text-muted-foreground mb-2">HCHO (Satellite)</p>
          <p className="text-3xl font-bold text-amber-warning">{siteData.hcho_satellite}</p>
          <p className="text-xs text-muted-foreground mt-1">mol/cm² (×10¹⁵)</p>
          <p className="text-xs text-amber-600 dark:text-amber-300 mt-2">Formaldehyde Column</p>
        </div>

        {/* HCHO/NO2 Ratio */}
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-label text-muted-foreground mb-2">HCHO/NO₂ Ratio</p>
          <p className="text-3xl font-bold text-success-green">{siteData.ratio_hcho_no2.toFixed(3)}</p>
          <p className="text-xs text-muted-foreground mt-1">Dimensionless</p>
          <p className="text-xs text-green-600 dark:text-green-300 mt-2">VOC/NOx Indicator</p>
        </div>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-sky-blue/20 flex gap-3">
        <AlertCircle size={18} className="text-sky-blue flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">About Satellite Data</p>
          <p className="text-xs text-foreground/80">
            Satellite observations are updated once daily and provide column-integrated measurements. 
            These complement ground-level forecasts and help validate model predictions. The HCHO/NO₂ ratio 
            indicates the relative abundance of volatile organic compounds (VOCs) to nitrogen oxides, 
            useful for understanding photochemical ozone formation.
          </p>
        </div>
      </div>
    </Card>
  );
}
