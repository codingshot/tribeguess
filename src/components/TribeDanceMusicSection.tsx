import { Link } from 'react-router-dom';
import { Footprints, Music2, Film } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { TribeData } from '@/types/tribe';
import {
  getDancesByTribe,
  getMusicByTribe,
  isMusicDocumentary,
  type CulturalPerformance,
} from '@/data/dances';
import { InlineVideoPlayer } from '@/components/InlineVideoPlayer';

function MusicEmbed({ perf, tribe }: { perf: CulturalPerformance; tribe: TribeData }) {
  const isDoc = isMusicDocumentary(perf);

  return (
    <div className="rounded-xl border border-violet-200 dark:border-violet-900 bg-gradient-to-r from-violet-500/10 to-indigo-500/5 p-4">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="text-sm font-medium">{perf.name}</h3>
        <Badge variant="outline" className="text-[10px]">
          {perf.musicEra === 'traditional' ? 'Traditional' : 'Modern'}
        </Badge>
        {isDoc && (
          <Badge variant="secondary" className="text-[10px] gap-0.5">
            <Film className="w-3 h-3" /> Cultural overview
          </Badge>
        )}
      </div>
      {perf.musicGenre && (
        <p className="text-xs text-violet-700 dark:text-violet-300 mb-2">{perf.musicGenre}</p>
      )}
      <InlineVideoPlayer
        youtubeId={perf.youtubeVideoId}
        title={perf.name}
        sourceType="MUSIC"
        tribeId={tribe.id}
        tribeName={tribe.name}
        originUrl={`/learn/${tribe.slug}#music`}
        originLabel={`${tribe.name} Music`}
        category="music"
        className="shadow-md"
      />
      <p className="text-xs text-muted-foreground mt-2">{perf.description}</p>
      {perf.instruments && perf.instruments.length > 0 && (
        <p className="text-[10px] text-muted-foreground mt-1">
          <strong>Instruments:</strong> {perf.instruments.join(', ')}
        </p>
      )}
      <Link to={`/dance/${perf.id}`} className="text-xs text-primary hover:underline mt-2 inline-block">
        Full music profile →
      </Link>
    </div>
  );
}

export function TribeDanceMusicSection({ tribe }: { tribe: TribeData }) {
  const dances = getDancesByTribe(tribe.slug);
  const traditionalMusic = getMusicByTribe(tribe.slug, 'traditional');
  const modernMusic = getMusicByTribe(tribe.slug, 'modern');
  const allMusic = [...traditionalMusic, ...modernMusic];
  const traditionalDance =
    typeof tribe.traditionalDance === 'string' ? tribe.traditionalDance : undefined;

  if (dances.length === 0 && allMusic.length === 0 && !traditionalDance) return null;

  const primaryDance = dances[0];
  const primaryTraditional = traditionalMusic[0];
  const primaryModern = modernMusic[0];

  return (
    <>
      <section id="dances" className="border-t border-border pt-6">
        <h2 className="font-display text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
          <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" aria-hidden="true" />
          Traditional Dance
        </h2>
        {traditionalDance && (
          <p className="text-sm text-muted-foreground mb-4">
            <strong>Known forms:</strong> {traditionalDance}
          </p>
        )}
        {primaryDance ? (
          <div className="mb-4 rounded-xl border border-orange-200 dark:border-orange-900 bg-gradient-to-r from-orange-500/10 to-amber-500/5 p-4">
            <h3 className="text-sm font-medium mb-2">{primaryDance.name}</h3>
            <InlineVideoPlayer
              youtubeId={primaryDance.youtubeVideoId}
              title={primaryDance.name}
              sourceType="DANCE"
              tribeId={tribe.id}
              tribeName={tribe.name}
              originUrl={`/learn/${tribe.slug}#dances`}
              originLabel={`${tribe.name} Dance`}
              category="dance"
              className="shadow-md"
            />
            <p className="text-xs text-muted-foreground mt-2">{primaryDance.description}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">
            Dance videos for {tribe.name} are being added. Explore music below or browse all dances.
          </p>
        )}
        {dances.length > 1 && (
          <ul className="flex flex-wrap gap-2 mb-2">
            {dances.map((d) => (
              <li key={d.id}>
                <Link
                  to={`/dance/${d.id}`}
                  className="text-xs px-2 py-1 rounded-full bg-secondary hover:bg-secondary/80 text-primary"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {allMusic.length > 0 && (
        <section id="music" className="border-t border-border pt-6">
          <h2 className="font-display text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
            <Music2 className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" aria-hidden="true" />
            Music
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Traditional and modern musical traditions of the {tribe.name} — distinct from dance-only
            listings where noted.
          </p>

          <div className="space-y-6">
            {primaryTraditional && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300 mb-2">
                  Traditional music
                </h3>
                <MusicEmbed perf={primaryTraditional} tribe={tribe} />
                {traditionalMusic.length > 1 && (
                  <ul className="mt-2 space-y-1">
                    {traditionalMusic.slice(1).map((m) => (
                      <li key={m.id}>
                        <Link to={`/dance/${m.id}`} className="text-xs text-primary hover:underline">
                          {m.name}
                          {m.musicGenre && (
                            <span className="text-muted-foreground"> · {m.musicGenre}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {primaryModern && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300 mb-2">
                  Modern music
                </h3>
                <MusicEmbed perf={primaryModern} tribe={tribe} />
                {modernMusic.length > 1 && (
                  <ul className="mt-2 space-y-1">
                    {modernMusic.slice(1).map((m) => (
                      <li key={m.id}>
                        <Link to={`/dance/${m.id}`} className="text-xs text-primary hover:underline">
                          {m.name}
                          {m.musicGenre && (
                            <span className="text-muted-foreground"> · {m.musicGenre}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <Link
            to={`/african-dances?tribe=${tribe.slug}&type=music`}
            className="mt-4 inline-flex text-sm text-violet-700 dark:text-violet-300 hover:underline"
          >
            All {tribe.name} music →
          </Link>
        </section>
      )}

      {(dances.length > 0 || allMusic.length > 0) && (
        <Link
          to={`/african-dances?tribe=${tribe.slug}`}
          className="mt-4 inline-flex text-sm text-primary hover:underline"
        >
          Browse all {tribe.name} dances & music →
        </Link>
      )}
    </>
  );
}
