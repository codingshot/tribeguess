import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Clock, Globe, Tag } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { blogPosts, BlogPost } from '@/data/blogPosts';

export const FeaturedBlogsCarousel = memo(function FeaturedBlogsCarousel() {
  // Get recent/featured blog posts (limit to 10)
  const featuredPosts = blogPosts.slice(0, 10);

  if (featuredPosts.length === 0) return null;

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
    <section className="mt-10 sm:mt-14">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Featured Articles
        </h2>
        
        <Link 
          to="/blog" 
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors group"
        >
          View All Articles
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          {featuredPosts.map((post) => (
            <CarouselItem key={post.slug} className="pl-2 sm:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <BlogCardCarousel post={post} formatDate={formatDate} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>
    </section>
  );
});

const BlogCardCarousel = memo(function BlogCardCarousel({ post, formatDate }: { post: BlogPost; formatDate: (date: string) => string }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
    >
      {/* Gradient Header with Emoji */}
      <div className={`h-28 ${post.gradient || 'bg-gradient-to-br from-primary/30 to-accent/30'} flex items-center justify-center relative`}>
        <span className="text-4xl">{post.emoji || '📖'}</span>
        {post.publishDate && (
        <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/30 backdrop-blur-sm rounded-full text-xs text-white">
          {formatDate(post.publishDate)}
        </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Meta Info */}
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
        
        {/* Title */}
        <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
          {post.title || 'Untitled Article'}
        </h3>
        
        {/* Excerpt */}
        {post.excerpt && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {post.excerpt}
        </p>
        )}
        
        {/* Tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-xs text-secondary-foreground"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>
        )}
      </div>
    </Link>
  );
});
