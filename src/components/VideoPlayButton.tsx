import React from 'react';
import { Play, ListPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGlobalVideoPlayer } from '@/contexts/GlobalVideoPlayerContext';
import { VideoItem, getYoutubeThumbnail, isValidYoutubeId } from '@/lib/videoAggregation';
import { cn } from '@/lib/utils';

interface VideoPlayButtonProps {
  youtubeId: string;
  title?: string;
  sourceType?: VideoItem['sourceType'];
  tribeId?: string;
  tribeName?: string;
  originUrl?: string;
  originLabel?: string;
  category?: string;
  variant?: 'icon' | 'button' | 'overlay';
  className?: string;
  showAddToQueue?: boolean;
}

export function VideoPlayButton({
  youtubeId,
  title,
  sourceType = 'YOUTUBE_GENERIC',
  tribeId,
  tribeName,
  originUrl,
  originLabel,
  category,
  variant = 'button',
  className,
  showAddToQueue = true,
}: VideoPlayButtonProps) {
  const { playNow, addToQueue } = useGlobalVideoPlayer();
  
  if (!isValidYoutubeId(youtubeId)) {
    return null;
  }
  
  const video: VideoItem = {
    id: `manual-${youtubeId}`,
    youtube: youtubeId,
    youtubeId,
    title: title || 'Video',
    thumbnailUrl: getYoutubeThumbnail(youtubeId),
    sourceType,
    tribeIds: tribeId ? [tribeId] : [],
    tribeNames: tribeName ? [tribeName] : [],
    originUrl,
    originLabel,
    category,
  };
  
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playNow(video);
  };
  
  const handleAddToQueue = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToQueue(video, { dedupeByYoutubeId: true });
  };
  
  if (variant === 'icon') {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handlePlay}
          title="Play in global player"
        >
          <Play className="h-4 w-4" />
        </Button>
        {showAddToQueue && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleAddToQueue}
            title="Add to queue"
          >
            <ListPlus className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
  
  if (variant === 'overlay') {
    return (
      <>
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          onClick={handlePlay}
        >
          <Play className="h-7 w-7" />
        </Button>
        {showAddToQueue && (
          <Button
            variant="secondary"
            size="icon"
            className="h-11 w-11 rounded-full shadow-lg"
            onClick={handleAddToQueue}
            title="Add to queue"
          >
            <ListPlus className="h-5 w-5" />
          </Button>
        )}
      </>
    );
  }
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="sm"
        className="gap-1"
        onClick={handlePlay}
      >
        <Play className="h-3 w-3" />
        Play
      </Button>
      {showAddToQueue && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleAddToQueue}
          title="Add to queue"
        >
          <ListPlus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
