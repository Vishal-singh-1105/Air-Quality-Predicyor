import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

/**
 * SiteSelector Component
 * Allows selection of one of 7 Delhi sites
 */

interface Site {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface SiteSelectorProps {
  sites: Site[];
  selectedSite: string;
  onSiteChange: (siteId: string) => void;
}

export default function SiteSelector({ sites, selectedSite, onSiteChange }: SiteSelectorProps) {
  return (
    <Card className="p-6 card-shadow-hover">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={20} className="text-sage-green" />
        <h2 className="text-lg font-bold text-foreground">Select Monitoring Site</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sites.map((site) => (
          <button
            key={site.id}
            onClick={() => onSiteChange(site.id)}
            className={`p-4 rounded-lg border-2 smooth-transition text-left ${
              selectedSite === site.id
                ? 'border-sage-green bg-green-50 dark:bg-green-950'
                : 'border-border hover:border-sage-green bg-secondary'
            }`}
          >
            <p className="font-semibold text-foreground text-sm">{site.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {site.lat.toFixed(4)}, {site.lng.toFixed(4)}
            </p>
          </button>
        ))}
      </div>
    </Card>
  );
}
