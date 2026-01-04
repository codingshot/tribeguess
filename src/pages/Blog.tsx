import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, Tag, Globe } from 'lucide-react';
import { Header } from '@/components/Header';
import { blogPosts, BlogPost } from '@/data/blogPosts';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>African Tribes & Culture Blog | TribeGuess</title>
        <meta name="description" content="Explore fascinating facts about African tribes, naming traditions, cultural heritage, and ethnic diversity across the continent." />
        <meta name="keywords" content="African tribes blog, African culture, tribal traditions, African names, ethnic groups Africa" />
        <link rel="canonical" href="https://tribeguess.com/blog" />
        <meta property="og:title" content="African Tribes & Culture Blog | TribeGuess" />
        <meta property="og:description" content="Explore fascinating facts about African tribes, naming traditions, cultural heritage, and ethnic diversity." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <nav className="mb-6">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>
        
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
            African <span className="gradient-gold-text">Culture</span> Blog
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover fascinating facts about African tribes, naming traditions, and cultural heritage across the continent.
          </p>
        </header>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-6 border-t border-border mt-8">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TribeGuess. Educational content about African tribes and ethnic groups.
        </p>
      </footer>
    </div>
  );
};

function BlogPostCard({ post }: { post: BlogPost }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Coming soon';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Link 
      to={`/blog/${post.slug}`}
      className="group block bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`h-32 ${post.gradient} flex items-center justify-center relative`}>
        <span className="text-4xl">{post.emoji}</span>
        <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/30 backdrop-blur-sm rounded-full text-xs text-white">
          {formatDate(post.publishDate)}
        </span>
      </div>
      
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Globe className="w-3 h-3" />
            {post.region}
          </span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        
        <h2 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-xs text-secondary-foreground"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Blog;
