import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Clock } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import blogPostsData from '@/data/blogPosts.json';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  emoji: string;
  gradient: string;
  region: string;
  readTime: string;
  publishDate: string;
  tags: string[];
}

export function FeaturedBlogsCarousel() {
  // Get recent/featured blog posts (limit to 10)
  const featuredPosts = (blogPostsData as BlogPost[])
    .slice(0, 10);

  if (featuredPosts.length === 0) return null;

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
              <Link
                to={`/blog/${post.slug}`}
                className="block group h-full"
              >
                <div className={`${post.gradient} rounded-xl p-4 sm:p-5 h-full min-h-[160px] flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}>
                  {/* Emoji & Region */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{post.emoji}</span>
                    <span className="text-xs text-white/80 bg-white/20 px-2 py-0.5 rounded-full">
                      {post.region}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-white line-clamp-2 text-sm sm:text-base mb-2 group-hover:underline">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-xs text-white/80 line-clamp-2 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  {/* Read Time */}
                  <div className="flex items-center gap-1 text-xs text-white/70 mt-3">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>
    </section>
  );
}