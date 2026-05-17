import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { CulturalPerformance, DanceStyle } from '@/data/dances';
import { getResolvedYoutubeId, isMusicDocumentary, usesSharedVideo } from '@/data/dances';
import { getYoutubeThumbnail } from '@/lib/videoAggregation';
import { Footprints, Music2, Film } from 'lucide-react';

const styleLabels: Record<DanceStyle, string> = {
  traditional: 'Traditional',
  modern: 'Modern',
  ceremonial: 'Ceremonial',
  folk: 'Folk',
  social: 'Social',
};

export function PerformanceCard({ perf }: { perf: CulturalPerformance }) {
  const isMusic = perf.contentType === 'music';
  const isDoc = isMusic && isMusicDocumentary(perf);
  const youtubeId = getResolvedYoutubeId(perf);
  if (!youtubeId) return null;

  return (
    <Link
      to={`/dance/${perf.id}`}
      className={`group block rounded-xl border overflow-hidden transition-colors ${
        isMusic
          ? 'border-violet-200 dark:border-violet-900/60 bg-card hover:border-violet-400/50'
          : 'border-border bg-card hover:border-orange-400/50'
      }`}
    >
      <div className="aspect-video relative bg-muted overflow-hidden">
        <img
          src={getYoutubeThumbnail(youtubeId)}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <Badge
          className={`absolute top-2 left-2 text-xs gap-0.5 ${
            isMusic ? 'bg-violet-600/90 text-white' : ''
          }`}
          variant={isMusic ? 'default' : 'secondary'}
        >
          {isMusic ? (
            <>
              <Music2 className="w-3 h-3" /> Music
            </>
          ) : (
            <>
              <Footprints className="w-3 h-3" /> Dance
            </>
          )}
        </Badge>
        {(isDoc || usesSharedVideo(perf)) && (
          <Badge className="absolute top-2 right-2 text-[10px] gap-0.5" variant="outline">
            {isDoc ? (
              <>
                <Film className="w-3 h-3" /> Overview
              </>
            ) : (
              'Same clip as dance'
            )}
          </Badge>
        )}
      </div>
      <div className="p-3">
        <h2 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {perf.name}
        </h2>
        <p className="text-xs text-muted-foreground mt-1">{perf.tribeName}</p>
        {perf.musicGenre && (
          <p className="text-[10px] text-violet-700 dark:text-violet-300 mt-1 line-clamp-1">
            {perf.musicGenre}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="outline" className="text-[10px]">
            {styleLabels[perf.style]}
          </Badge>
          {perf.musicEra && (
            <Badge
              variant="outline"
              className={`text-[10px] ${
                perf.musicEra === 'traditional'
                  ? 'border-amber-500/40 text-amber-800 dark:text-amber-200'
                  : 'border-violet-500/40 text-violet-800 dark:text-violet-200'
              }`}
            >
              {perf.musicEra === 'traditional' ? 'Traditional' : 'Modern'}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
