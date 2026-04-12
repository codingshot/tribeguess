import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, Tag, Globe, ExternalLink, BookOpen } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import { BlogAudioPlayer } from '@/components/BlogAudioPlayer';
import { ShareButton } from '@/components/ShareButton';
import { RelatedBlogs } from '@/components/RelatedBlogs';
import { processTextWithTribeLinks } from '@/lib/tribeLinks';
import { ViralCTAs } from '@/components/ViralCTAs';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center flex-1">
          <p className="text-muted-foreground text-lg mb-4">Article not found</p>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Generate JSON-LD structured data with rich schema
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "author": { "@type": "Organization", "name": "African Tribe Names", "url": "https://africantribenames.com" },
        "publisher": { "@type": "Organization", "name": "African Tribe Names", "logo": { "@type": "ImageObject", "url": "https://africantribenames.com/favicon.png" } },
        "datePublished": post.publishDate,
        "dateModified": post.publishDate,
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://africantribenames.com/blog/${post.slug}` },
        "keywords": post.tags.join(", "),
        "articleSection": post.region,
        "inLanguage": "en",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://africantribenames.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://africantribenames.com/blog" },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://africantribenames.com/blog/${post.slug}` },
        ]
      }
    ]
  };

  // Extract footnotes from content
  const footnotes: { id: number; text: string }[] = [];
  let footnoteIndex = 0;
  
  const processTextWithFootnotes = (text: string) => {
    // Match [^1] style footnote references
    const footnoteRegex = /\[\^(\d+)\]/g;
    let processed = text.replace(footnoteRegex, (match, num) => {
      return `<sup class="text-primary cursor-pointer hover:underline">[${num}]</sup>`;
    });
    // Also process tribe name links
    processed = processTextWithTribeLinks(processed);
    return processed;
  };

  // Generate plain text for audio player
  const generatePlainTextContent = (): string => {
    return post.content
      .map(section => {
        let text = '';
        if (section.heading) {
          text += section.heading + '. ';
        }
        text += section.paragraphs.join(' ');
        if (section.list) {
          text += ' ' + section.list.join('. ');
        }
        if (section.highlight) {
          text += ' ' + section.highlight;
        }
        return text;
      })
      .join(' ')
      .replace(/\[\^\d+\]/g, '') // Remove footnote markers
      .replace(/[*_#]/g, ''); // Remove markdown
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href={`https://africantribenames.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://africantribenames.com/blog/${post.slug}`} />
        <meta property="og:site_name" content="African Tribe Names" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:section" content={post.region} />
        {post.tags.map((tag, i) => (
          <meta key={i} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seoTitle} />
        <meta name="twitter:description" content={post.seoDescription} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8 flex-1">
        <nav className="mb-6">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </nav>
        
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className={`h-48 sm:h-64 ${post.gradient} rounded-2xl flex items-center justify-center mb-6`}>
              <span className="text-6xl sm:text-8xl">{post.emoji}</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  {post.region}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <ShareButton 
                title={post.title}
                url={`/blog/${post.slug}`}
                description={post.excerpt}
              />
            </div>
            
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            
            <p className="text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          </header>
          
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.map((section, index) => (
              <section key={index} className="mb-8">
                {section.heading && (
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    {section.icon && <span>{section.icon}</span>}
                    {section.heading}
                  </h2>
                )}
                
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p 
                    key={pIndex} 
                    className="text-muted-foreground leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: processTextWithFootnotes(paragraph) }}
                  />
                ))}
                
                {section.list && (
                  <ul className="space-y-2 my-4">
                    {section.list.map((item, lIndex) => (
                      <li key={lIndex} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span dangerouslySetInnerHTML={{ __html: processTextWithFootnotes(item) }} />
                      </li>
                    ))}
                  </ul>
                )}
                
                {section.highlight && (
                  <blockquote className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg my-4">
                    <p 
                      className="text-foreground italic"
                      dangerouslySetInnerHTML={{ __html: processTextWithFootnotes(section.highlight) }}
                    />
                  </blockquote>
                )}
              </section>
            ))}
          </div>
          
          {/* Sources Section */}
          {post.sources && post.sources.length > 0 && (
            <section className="mt-8 pt-6 border-t border-border">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Sources & References
              </h2>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {post.sources.map((source, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary font-medium">[{index + 1}]</span>
                    {source.url ? (
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-foreground underline underline-offset-2"
                      >
                        {source.title}
                      </a>
                    ) : (
                      <span>{source.title}</span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
          
          {/* Related Tribes */}
          {post.relatedTribes && post.relatedTribes.length > 0 && (
            <section className="mt-8 pt-6 border-t border-border">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Learn More About These Tribes
              </h2>
              <div className="flex flex-wrap gap-2">
                {post.relatedTribes.map((tribe) => (
                  <Link
                    key={tribe.slug}
                    to={`/learn/${tribe.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tribe.name}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          {/* Tags */}
          <section className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link 
                  key={tag}
                  to={`/blog?tags=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-sm text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </Link>
              ))}
            </div>
          </section>

          {/* Related Blogs */}
          <RelatedBlogs currentPost={post} />

          {/* Viral CTAs */}
          <ViralCTAs className="mt-8" />
        </article>
      </main>

      {/* Audio Player - Fixed at bottom */}
      <BlogAudioPlayer 
        title={post.title}
        content={generatePlainTextContent()}
      />
      
      {/* Add padding to account for fixed audio player */}
      <div className="h-20" />
      
      <Footer />
    </div>
  );
};

export default BlogPost;
