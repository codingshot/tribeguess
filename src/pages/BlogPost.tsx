import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, Tag, Globe, Share2, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { blogPosts } from '@/data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground text-lg mb-4">Article not found</p>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  // Generate JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "TribeGuess"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TribeGuess",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tribeguess.com/favicon.png"
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tribeguess.com/blog/${post.slug}`
    },
    "keywords": post.tags.join(", ")
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <link rel="canonical" href={`https://tribeguess.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://tribeguess.com/blog/${post.slug}`} />
        
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
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
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
            
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
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
                  <p key={pIndex} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
                
                {section.list && (
                  <ul className="space-y-2 my-4">
                    {section.list.map((item, lIndex) => (
                      <li key={lIndex} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {section.highlight && (
                  <blockquote className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg my-4">
                    <p className="text-foreground italic">{section.highlight}</p>
                  </blockquote>
                )}
              </section>
            ))}
          </div>
          
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
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-sm text-secondary-foreground"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </article>
      </main>
      
      <footer className="container mx-auto px-4 py-6 border-t border-border mt-8">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TribeGuess. Educational content about African tribes and ethnic groups.
        </p>
      </footer>
    </div>
  );
};

export default BlogPost;
