import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Footprints, Music2, ExternalLink, Film } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  getPerformanceById,
  getDancesByTribe,
  getMusicByTribe,
  isMusicDocumentary,
} from '@/data/dances';
import { getTribeBySlug } from '@/lib/tribeDetection';
import { InlineVideoPlayer } from '@/components/InlineVideoPlayer';
import { canonical, SITE_NAME } from '@/lib/seoConstants';

export default function DancePage() {
  const { id } = useParams<{ id: string }>();
  const perf = id ? getPerformanceById(id) : undefined;

  if (!perf) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Performance Not Found | {SITE_NAME}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground mb-4">Dance or music performance not found.</p>
          <Button asChild>
            <Link to="/african-dances">Browse all African dances & music</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const tribe = getTribeBySlug(perf.tribeSlug);
  const isDance = perf.contentType === 'dance';
  const isDoc = isMusicDocumentary(perf);
  const relatedDances = getDancesByTribe(perf.tribeSlug).filter((p) => p.id !== perf.id);
  const relatedMusic = getMusicByTribe(perf.tribeSlug).filter((p) => p.id !== perf.id);
  const linkedPerf = perf.relatedPerformanceId
    ? getPerformanceById(perf.relatedPerformanceId)
    : undefined;

  const pageTitle = `${perf.name} — ${perf.tribeName} ${isDance ? 'Dance' : 'Music'} | ${SITE_NAME}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: perf.name,
    description: perf.description,
    contentUrl: `https://www.youtube.com/watch?v=${perf.youtubeVideoId}`,
    embedUrl: `https://www.youtube.com/embed/${perf.youtubeVideoId}`,
  };

  const sectionBorder = isDance
    ? 'border-orange-200 dark:border-orange-900 bg-gradient-to-r from-orange-500/10 to-amber-500/5'
    : 'border-violet-200 dark:border-violet-900 bg-gradient-to-r from-violet-500/10 to-indigo-500/5';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={perf.description} />
        <link rel="canonical" href={canonical(`/dance/${perf.id}`)} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link to={isDance ? '/african-dances?type=dance' : '/african-dances?type=music'}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              {isDance ? 'All dances' : 'All music'}
            </Link>
          </Button>

          <header className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="gap-1">
                {isDance ? <Footprints className="w-3 h-3" /> : <Music2 className="w-3 h-3" />}
                {isDance ? 'Dance' : 'Music'}
              </Badge>
              {perf.musicEra && (
                <Badge variant="outline">
                  {perf.musicEra === 'traditional' ? 'Traditional' : 'Modern'} music
                </Badge>
              )}
              {isDoc && (
                <Badge variant="outline" className="gap-1">
                  <Film className="w-3 h-3" /> Cultural overview video
                </Badge>
              )}
              {perf.videoContext === 'combined' && (
                <Badge variant="outline">Music & dance combined</Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-tribal">{perf.name}</h1>
            <p className="text-muted-foreground mt-1">
              <Link to={`/learn/${perf.tribeSlug}`} className="text-primary hover:underline">
                {perf.tribeName}
              </Link>
              {perf.occasion && ` · ${perf.occasion}`}
            </p>
            {perf.musicGenre && (
              <p className="text-sm text-violet-700 dark:text-violet-300 mt-2 flex items-center gap-1">
                <Music2 className="w-4 h-4" />
                {perf.musicGenre}
              </p>
            )}
          </header>

          {isDoc && (
            <p className="text-sm text-muted-foreground mb-4 p-3 rounded-lg bg-secondary/80 border border-border">
              This clip is a cultural documentary overview — it explains musical heritage rather than
              a single concert performance. See related entries below for live dance and music videos.
            </p>
          )}

          <section className={`rounded-xl border p-4 mb-6 ${sectionBorder}`}>
            <InlineVideoPlayer
              youtubeId={perf.youtubeVideoId}
              title={perf.name}
              sourceType={isDance ? 'DANCE' : 'MUSIC'}
              tribeId={perf.tribeSlug}
              tribeName={perf.tribeName}
              originUrl={`/dance/${perf.id}`}
              originLabel={perf.name}
              category={perf.contentType}
              className="shadow-lg"
            />
            <a
              href={`https://www.youtube.com/watch?v=${perf.youtubeVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-2 hover:text-primary"
            >
              Watch on YouTube <ExternalLink className="w-3 h-3" />
            </a>
          </section>

          <section className="space-y-3 mb-8 text-sm">
            <p>{perf.description}</p>
            <p className="text-muted-foreground">{perf.culturalSignificance}</p>
            {perf.instruments && perf.instruments.length > 0 && (
              <p>
                <strong>Instruments:</strong> {perf.instruments.join(', ')}
              </p>
            )}
            {perf.relatedForms && perf.relatedForms.length > 0 && (
              <p>
                <strong>Related forms:</strong> {perf.relatedForms.join(', ')}
              </p>
            )}
            {linkedPerf && (
              <p>
                <strong>Related {linkedPerf.contentType}:</strong>{' '}
                <Link to={`/dance/${linkedPerf.id}`} className="text-primary hover:underline">
                  {linkedPerf.name}
                </Link>
              </p>
            )}
            {tribe?.traditionalDance && typeof tribe.traditionalDance === 'string' && (
              <p className="text-muted-foreground">
                On the tribe profile: {tribe.traditionalDance}
              </p>
            )}
          </section>

          {(relatedDances.length > 0 || relatedMusic.length > 0) && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">More from {perf.tribeName}</h2>
              {relatedDances.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
                    Dances
                  </h3>
                  <ul className="space-y-2">
                    {relatedDances.map((r) => (
                      <li key={r.id}>
                        <Link to={`/dance/${r.id}`} className="text-sm text-primary hover:underline">
                          {r.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {relatedMusic.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-2">
                    Music
                  </h3>
                  <ul className="space-y-2">
                    {relatedMusic.map((r) => (
                      <li key={r.id}>
                        <Link to={`/dance/${r.id}`} className="text-sm text-primary hover:underline">
                          {r.name}
                          {r.musicEra && (
                            <span className="text-muted-foreground">
                              {' '}
                              · {r.musicEra === 'traditional' ? 'Traditional' : 'Modern'}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          <div className="flex flex-wrap gap-2 mt-8">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/learn/${perf.tribeSlug}#${isDance ? 'dances' : 'music'}`}>
                View {perf.tribeName} tribe
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/video-gallery?category=${perf.contentType}`}>Video gallery</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
