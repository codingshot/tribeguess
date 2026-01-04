import { MapPin, ExternalLink, Navigation, Camera, Landmark, Church, Mountain, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface CulturalLandmark {
  name: string;
  type: 'historical' | 'sacred' | 'museum' | 'natural' | 'archaeological';
  description: string;
  coordinates: { lat: number; lng: number };
  imageUrl?: string;
  wikipediaUrl?: string;
  unescoStatus?: 'world-heritage' | 'tentative' | null;
}

interface CulturalLandmarksProps {
  landmarks: CulturalLandmark[];
  tribeName: string;
}

const typeConfig = {
  historical: {
    icon: Building2,
    label: 'Historical Site',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  sacred: {
    icon: Church,
    label: 'Sacred Site',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  museum: {
    icon: Landmark,
    label: 'Museum & Cultural Center',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  natural: {
    icon: Mountain,
    label: 'Natural Landmark',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  archaeological: {
    icon: MapPin,
    label: 'Archaeological Site',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
};

export const CulturalLandmarks = ({ landmarks, tribeName }: CulturalLandmarksProps) => {
  if (!landmarks || landmarks.length === 0) {
    return null;
  }

  const openInGoogleMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openInOpenStreetMap = (lat: number, lng: number) => {
    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
        <Landmark className="w-5 h-5 text-primary" aria-hidden="true" />
        Cultural Landmarks
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Explore significant historical, sacred, and cultural sites connected to the {tribeName} people.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {landmarks.map((landmark, index) => {
          const config = typeConfig[landmark.type];
          const IconComponent = config.icon;

          return (
            <div
              key={index}
              className={`relative rounded-xl border ${config.borderColor} ${config.bgColor} p-4 transition-all hover:shadow-md`}
            >
              {/* UNESCO badge */}
              {landmark.unescoStatus && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    🏛️ {landmark.unescoStatus === 'world-heritage' ? 'UNESCO' : 'UNESCO Tentative'}
                  </span>
                </div>
              )}

              {/* Image */}
              {landmark.imageUrl && (
                <div className="mb-3 rounded-lg overflow-hidden aspect-video bg-muted">
                  <img
                    src={landmark.imageUrl}
                    alt={landmark.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Header */}
              <div className="flex items-start gap-3 mb-2">
                <div className={`p-2 rounded-lg ${config.bgColor}`}>
                  <IconComponent className={`w-4 h-4 ${config.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-1">
                    {landmark.name}
                  </h3>
                  <span className={`text-xs ${config.iconColor}`}>{config.label}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                {landmark.description}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs h-8"
                  onClick={() => openInGoogleMaps(landmark.coordinates.lat, landmark.coordinates.lng, landmark.name)}
                >
                  <Navigation className="w-3 h-3" />
                  Google Maps
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs h-8"
                  onClick={() => openInOpenStreetMap(landmark.coordinates.lat, landmark.coordinates.lng)}
                >
                  <MapPin className="w-3 h-3" />
                  OpenStreetMap
                </Button>
                {landmark.wikipediaUrl && (
                  <a
                    href={landmark.wikipediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 h-8 rounded-md border border-input bg-background text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Wikipedia
                  </a>
                )}
              </div>

              {/* Coordinates display */}
              <div className="mt-2 text-xs text-muted-foreground font-mono">
                📍 {landmark.coordinates.lat.toFixed(4)}°, {landmark.coordinates.lng.toFixed(4)}°
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
