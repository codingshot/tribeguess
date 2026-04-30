import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, Tag, Globe, Search, X, Filter } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { getAllBlogTags, getAllBlogRegions } from '@/hooks/useGlobalSearch';
import { CrossSectionSearchHints } from '@/components/CrossSectionSearchHints';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const selectedTags = useMemo(
    () => searchParams.get('tags')?.split(',').filter(Boolean) || [],
    [searchParams]
  );
  const selectedRegion = searchParams.get('region') || '';
  
  const [localSearch, setLocalSearch] = useState(searchQuery);
  
  const allTags = getAllBlogTags();
  const allRegions = getAllBlogRegions();
  
  // Sync local search with URL
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);
  
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const searchLower = searchQuery.toLowerCase();
      
      // Search filter
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(t => t.toLowerCase().includes(searchLower)) ||
        post.region.toLowerCase().includes(searchLower);
      
      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag));
      
      // Region filter
      const matchesRegion = !selectedRegion || post.region === selectedRegion;
      
      return matchesSearch && matchesTags && matchesRegion;
    });
  }, [searchQuery, selectedTags, selectedRegion]);
  
  const handleSearch = (value: string) => {
    setLocalSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };
  
  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get('tags')?.split(',').filter(Boolean) || [];
    
    if (current.includes(tag)) {
      const newTags = current.filter(t => t !== tag);
      if (newTags.length > 0) {
        params.set('tags', newTags.join(','));
      } else {
        params.delete('tags');
      }
    } else {
      params.set('tags', [...current, tag].join(','));
    }
    setSearchParams(params);
  };
  
  const handleRegionChange = (region: string) => {
    const params = new URLSearchParams(searchParams);
    if (region) {
      params.set('region', region);
    } else {
      params.delete('region');
    }
    setSearchParams(params);
  };
  
  const clearFilters = () => {
    setLocalSearch('');
    setSearchParams({});
  };
  
  const hasFilters = searchQuery || selectedTags.length > 0 || selectedRegion;

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "African Tribes & Culture Blog",
    "description": "Explore fascinating facts about African tribes, naming traditions, cultural heritage, and ethnic diversity across the continent.",
    "url": "https://africantribenames.com/blog",
    "publisher": { "@type": "Organization", "name": "African Tribe Names" },
    "numberOfItems": blogPosts.length,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filteredPosts.slice(0, 20).map((post, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://africantribenames.com/blog/${post.slug}`,
        "name": post.title
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>African Tribes & Culture Blog | TribeGuess</title>
        <meta name="description" content="Explore fascinating facts about African tribes, naming traditions, cultural heritage, and ethnic diversity across the continent." />
        <meta name="keywords" content="African tribes blog, African culture, tribal traditions, African names, ethnic groups Africa" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://africantribenames.com/blog" />
        <meta property="og:title" content="African Tribes & Culture Blog | TribeGuess" />
        <meta property="og:description" content="Explore fascinating facts about African tribes, naming traditions, cultural heritage, and ethnic diversity." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://africantribenames.com/blog" />
        <meta property="og:site_name" content="African Tribe Names" />
        <script type="application/ld+json">
          {JSON.stringify(blogListSchema)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8 flex-1">
        <nav className="mb-6">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>
        
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
            African <span className="gradient-gold-text">Culture</span> Blog
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover fascinating facts about African tribes, naming traditions, and cultural heritage across the continent.
          </p>
        </header>
        
        {/* Search and Filters */}
        <section className="max-w-4xl mx-auto mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search articles by title, topic, or region..."
              className="input-tribal pl-9 pr-9 text-sm h-10 w-full"
            />
            {localSearch && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Region Filter - Horizontal Scroll */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5 shrink-0">
              <Globe className="w-4 h-4" />
              Region:
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => handleRegionChange('')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  !selectedRegion 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                All
              </button>
              {allRegions.map(region => (
                <button
                  key={region}
                  onClick={() => handleRegionChange(region)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    selectedRegion === region 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tag Filters - Horizontal Scroll */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5 shrink-0">
              <Filter className="w-4 h-4" />
              Topics:
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {allTags.slice(0, 15).map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Active Filters + Clear */}
          {hasFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </span>
              <button
                onClick={clearFilters}
                className="text-xs text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
        
        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {filteredPosts.map((post) => (
              <div key={post.slug} className="content-auto-sm">
                <BlogPostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No articles found matching your filters.</p>
            {searchQuery.trim().length >= 2 && (
              <CrossSectionSearchHints query={searchQuery} className="max-w-xl" />
            )}
            <button
              onClick={clearFilters}
              className="mt-4 text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
      
      <Footer />
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
