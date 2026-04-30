import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ListPlus, ExternalLink, AlertCircle, Loader2, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useGlobalVideoPlayer } from '@/contexts/GlobalVideoPlayerContext';
import { VideoItem, getYoutubeThumbnail } from '@/lib/videoAggregation';
import { useVideoValidation } from '@/hooks/useVideoValidation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface VideoCardProps {
  video: VideoItem;
  compact?: boolean;
  showOrigin?: boolean;
}

const categoryColors: Record<string, string> = {
  documentary: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  recipe: 'bg-green-500/10 text-green-600 border-green-500/20',
  language: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
};

export function VideoCard({ video, compact = false, showOrigin = true }: VideoCardProps) {
  const { playNow, addToQueue } = useGlobalVideoPlayer();
  const { valid, loading, error } = useVideoValidation(video.youtubeId);
  
  const handlePlay = () => {
    if (!valid && !loading) {
      toast.error('Video Unavailable', {
        description: `This video cannot be played. ${error || 'It may have been removed or set to private.'}`,
      });
      return;
    }
    playNow(video);
  };
  
  const handleAddToQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!valid && !loading) {
      toast.error('Video Unavailable', {
        description: 'Cannot add unavailable video to queue',
      });
      return;
    }
    addToQueue(video, { dedupeByYoutubeId: true });
  };

  const handleReportIssue = (e: React.MouseEvent) => {
    e.stopPropagation();
    const issueUrl = `https://github.com/TribeGuess/tribeguess/issues/new?template=data_video_issue.yml&title=[Video+Issue]:+${encodeURIComponent(video.title || 'Untitled')}&video_id=${video.youtubeId}&location=${encodeURIComponent(video.originLabel || '')}&url=${encodeURIComponent(window.location.origin + (video.originUrl || ''))}`;
    window.open(issueUrl, '_blank', 'noopener,noreferrer');
    toast.success('Opening issue form', {
      description: 'Thank you for helping improve our content!',
    });
  };
  
  if (compact) {
    return (
      <div 
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer group transition-colors"
        onClick={handlePlay}
      >
        <div className="relative w-20 h-12 flex-shrink-0 rounded overflow-hidden">
          <img 
            src={video.thumbnailUrl || getYoutubeThumbnail(video.youtubeId)} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{video.title}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {video.category && (
              <Badge variant="outline" className={cn("text-[10px] px-1 py-0", categoryColors[video.category])}>
                {video.category}
              </Badge>
            )}
            {video.tribeNames?.[0] && (
              <span className="truncate">{video.tribeNames[0]}</span>
            )}
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleAddToQueue}
        >
          <ListPlus className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  return (
    <Card className={cn(
      "overflow-hidden group hover:shadow-lg transition-shadow",
      !valid && !loading && "opacity-50"
    )}>
      <div 
        className={cn(
          "relative aspect-video",
          valid || loading ? "cursor-pointer" : "cursor-not-allowed"
        )}
        onClick={handlePlay}
      >
        <img 
          src={video.thumbnailUrl || getYoutubeThumbnail(video.youtubeId)} 
          alt={video.title || 'Video'} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Loading/Invalid overlay */}
        {loading ? (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
        ) : !valid ? (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2 p-4">
            <AlertCircle className="h-8 w-8 text-red-400" />
            <span className="text-xs text-red-300 text-center font-medium">Video Unavailable</span>
            <Button 
              size="sm" 
              variant="secondary" 
              className="h-7 text-xs mt-1"
              onClick={handleReportIssue}
            >
              <Flag className="h-3 w-3 mr-1" />
              Report Issue
            </Button>
          </div>
        ) : (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              <Button size="icon" className="h-12 w-12 rounded-full">
                <Play className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Category badge */}
        {video.category && (
          <Badge 
            variant="secondary" 
            className={cn(
              "absolute top-2 left-2 text-xs",
              categoryColors[video.category]
            )}
          >
            {video.category}
          </Badge>
        )}
        
        {/* Duration placeholder */}
        {video.durationSeconds && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {Math.floor(video.durationSeconds / 60)}:{(video.durationSeconds % 60).toString().padStart(2, '0')}
          </span>
        )}
      </div>
      
      <CardContent className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {video.tribeIds?.slice(0, 2).map((id, i) => (
            <Link 
              key={id} 
              to={`/learn/${id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                {video.tribeNames?.[i] || id}
              </Badge>
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            className="flex-1 h-8 text-xs"
            onClick={handlePlay}
            disabled={!valid && !loading}
          >
            <Play className="h-3 w-3 mr-1" />
            {!valid && !loading ? 'Unavailable' : 'Play Now'}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleAddToQueue}
            title="Add to Queue"
            disabled={!valid && !loading}
          >
            <ListPlus className="h-4 w-4" />
          </Button>
          {showOrigin && video.originUrl && (
            <Link to={video.originUrl}>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                title="View source"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
