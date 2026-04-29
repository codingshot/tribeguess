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
            <CarouselItem key={post.slug} className="pl-2 sm:pl-4 basis-[88%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
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
      className="group block card-landing-tile overflow-hidden hover:-translate-y-0.5 h-full flex flex-col"
    >
      <div className={`h-32 sm:h-36 shrink-0 ${post.gradient || 'bg-gradient-to-br from-primary/30 to-accent/30'} flex items-center justify-center relative`}>
        <span className="text-4xl sm:text-5xl" aria-hidden>{post.emoji || '📖'}</span>
        {post.publishDate && (
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/35 backdrop-blur-sm rounded-full text-xs text-white leading-none">
          {formatDate(post.publishDate)}
        </span>
        )}
      </div>
      
      <div className="p-4 sm:p-5 flex flex-col flex-1 min-h-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden />
            <span className="line-clamp-1">{post.region}</span>
          </span>
          <span className="text-border hidden sm:inline" aria-hidden>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden />
            {post.readTime}
          </span>
        </div>
        
        <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2 leading-snug tracking-tight">
          {post.title || 'Untitled Article'}
        </h3>
        
        {post.excerpt && (
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4 flex-1">
          {post.excerpt}
        </p>
        )}
        
        {Array.isArray(post.tags) && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground leading-snug"
            >
              <Tag className="w-3 h-3 shrink-0 opacity-70" aria-hidden />
              {tag}
            </span>
          ))}
        </div>
        )}
      </div>
    </Link>
  );
});
