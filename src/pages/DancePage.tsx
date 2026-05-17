import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Footprints, Music2, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getPerformanceById, getPerformancesByTribe } from '@/data/dances';
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
            <Link to="/african-dances">Browse all African dances</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const tribe = getTribeBySlug(perf.tribeSlug);
  const related = getPerformancesByTribe(perf.tribeSlug).filter((p) => p.id !== perf.id).slice(0, 4);
  const isDance = perf.contentType === 'dance';
  const pageTitle = `${perf.name} — ${perf.tribeName} ${isDance ? 'Dance' : 'Music'} | ${SITE_NAME}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: perf.name,
    description: perf.description,
    contentUrl: `https://www.youtube.com/watch?v=${perf.youtubeVideoId}`,
    embedUrl: `https://www.youtube.com/embed/${perf.youtubeVideoId}`,
  };

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
            <Link to="/african-dances">
              <ArrowLeft className="w-4 h-4 mr-1" />
              All African dances
            </Link>
          </Button>

          <header className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary">{isDance ? '💃 Dance' : '🎵 Music'}</Badge>
              {perf.musicEra && (
                <Badge variant="outline">
                  {perf.musicEra === 'traditional' ? 'Traditional' : 'Modern'} music
                </Badge>
              )}
              <Badge variant="outline" className="capitalize">
                {perf.style}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-tribal">{perf.name}</h1>
            <p className="text-muted-foreground mt-1">
              <Link to={`/learn/${perf.tribeSlug}`} className="text-primary hover:underline">
                {perf.tribeName}
              </Link>
              {perf.occasion && ` · ${perf.occasion}`}
            </p>
          </header>

          <section className="rounded-xl border border-orange-200 dark:border-orange-900 bg-gradient-to-r from-orange-500/10 to-amber-500/5 p-4 mb-6">
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
            {perf.relatedForms && perf.relatedForms.length > 0 && (
              <p>
                <strong>Related forms:</strong> {perf.relatedForms.join(', ')}
              </p>
            )}
            {tribe?.traditionalDance && typeof tribe.traditionalDance === 'string' && (
              <p className="text-muted-foreground">
                On the tribe profile: {tribe.traditionalDance}
              </p>
            )}
          </section>

          {related.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3">More from {perf.tribeName}</h2>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link to={`/dance/${r.id}`} className="text-sm text-primary hover:underline">
                      {r.contentType === 'dance' ? '💃' : '🎵'} {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex flex-wrap gap-2 mt-8">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/learn/${perf.tribeSlug}`}>View {perf.tribeName} tribe</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/video-gallery?category=${perf.contentType}`}>
                Video gallery
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
