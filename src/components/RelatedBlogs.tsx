import { Link } from 'react-router-dom';
import { Clock, Globe } from 'lucide-react';
import { BlogPost, blogPosts } from '@/data/blogPosts';

interface RelatedBlogsProps {
  currentPost: BlogPost;
  maxPosts?: number;
}

export const RelatedBlogs = ({ currentPost, maxPosts = 3 }: RelatedBlogsProps) => {
  // Score each post based on relevance
  const scoredPosts = blogPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      let score = 0;

      // Same region gets highest priority
      if (post.region === currentPost.region) {
        score += 10;
      }

      // Matching tags
      const matchingTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      ).length;
      score += matchingTags * 3;

      // Overlapping related tribes
      const currentTribeSlugs = currentPost.relatedTribes.map(t => t.slug);
      const matchingTribes = post.relatedTribes.filter(tribe =>
        currentTribeSlugs.includes(tribe.slug)
      ).length;
      score += matchingTribes * 5;

      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPosts)
    .map(item => item.post);

  if (scoredPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
        Related Articles
      </h2>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scoredPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
          >
            <div className={`h-24 ${post.gradient} rounded-lg flex items-center justify-center mb-3`}>
              <span className="text-3xl">{post.emoji}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <span className="inline-flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {post.region}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            
            <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};
