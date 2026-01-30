import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalVideoPlayer } from '@/contexts/GlobalVideoPlayerContext';
import { 
  X, Search, Play, Trash2, GripVertical, Clock, 
  ExternalLink, Download, Filter, History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { VideoItem, getVideoTribes, getYoutubeThumbnail } from '@/lib/videoAggregation';

interface QueueItemProps {
  video: VideoItem;
  index: number;
  onPlay: () => void;
  onRemove: () => void;
  isFiltered: boolean;
}

function QueueItem({ video, index, onPlay, onRemove, isFiltered }: QueueItemProps) {
  return (
    <div className={cn(
      "flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 group transition-colors",
      isFiltered && "opacity-60"
    )}>
      {!isFiltered && (
        <div className="cursor-grab hover:bg-muted p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      
      <div 
        className="relative w-16 h-10 flex-shrink-0 rounded overflow-hidden cursor-pointer"
        onClick={onPlay}
      >
        <img 
          src={video.thumbnailUrl || getYoutubeThumbnail(video.youtubeId)} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="h-5 w-5 text-white" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{video.title || 'Video'}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {video.category && (
            <Badge variant="secondary" className="text-[10px] px-1 py-0">
              {video.category}
            </Badge>
          )}
          {video.tribeNames?.[0] && (
            <span className="truncate">{video.tribeNames[0]}</span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {video.originUrl && (
          <Link to={video.originUrl}>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

export function VideoQueueDrawer() {
  const {
    queue,
    queueVisible,
    setQueueVisible,
    playNow,
    removeFromQueue,
    clearQueue,
    playedVideos,
    reorderQueue,
  } = useGlobalVideoPlayer();
  
  const [tab, setTab] = useState<'queue' | 'history'>('queue');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [tribeFilter, setTribeFilter] = useState<string>('all');
  
  const tribes = useMemo(() => getVideoTribes(), []);
  
  // Filter queue
  const filteredQueue = useMemo(() => {
    let items = queue;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(v => 
        v.title?.toLowerCase().includes(q) ||
        v.tribeNames?.some(n => n.toLowerCase().includes(q)) ||
        v.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    
    if (categoryFilter !== 'all') {
      items = items.filter(v => v.category === categoryFilter);
    }
    
    if (tribeFilter !== 'all') {
      items = items.filter(v => v.tribeIds?.includes(tribeFilter));
    }
    
    return items;
  }, [queue, searchQuery, categoryFilter, tribeFilter]);
  
  const isFiltered = searchQuery.trim() !== '' || categoryFilter !== 'all' || tribeFilter !== 'all';
  
  // Export queue as markdown
  const handleExport = () => {
    const items = isFiltered ? filteredQueue : queue;
    let markdown = `# TribeGuess Video Queue\n\n`;
    
    if (isFiltered) {
      markdown += `> Filtered by: ${categoryFilter !== 'all' ? `Category: ${categoryFilter}` : ''} ${tribeFilter !== 'all' ? `Tribe: ${tribes.find(t => t.id === tribeFilter)?.name}` : ''} ${searchQuery ? `Search: "${searchQuery}"` : ''}\n\n`;
    }
    
    markdown += `## Queue (${items.length} videos)\n\n`;
    
    items.forEach((video, i) => {
      markdown += `${i + 1}. **${video.title || 'Video'}**\n`;
      if (video.tribeNames?.length) {
        markdown += `   - Tribe: ${video.tribeNames.join(', ')}\n`;
      }
      if (video.category) {
        markdown += `   - Category: ${video.category}\n`;
      }
      markdown += `   - Watch: https://youtube.com/watch?v=${video.youtubeId}\n`;
      if (video.originUrl) {
        markdown += `   - Source: https://tribeguess.com${video.originUrl}\n`;
      }
      markdown += '\n';
    });
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tribeguess-queue.md';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (!queueVisible) return null;
  
  return (
    <div className="fixed bottom-16 right-4 w-80 sm:w-96 max-h-[60vh] bg-background border border-border rounded-lg shadow-2xl z-[65] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-semibold">Video Queue</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setQueueVisible(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as 'queue' | 'history')} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mx-3 mt-2" style={{ width: 'calc(100% - 24px)' }}>
          <TabsTrigger value="queue" className="text-xs">
            Queue ({queue.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs">
            <History className="h-3 w-3 mr-1" />
            History
          </TabsTrigger>
        </TabsList>
        
        {/* Search & Filters */}
        <div className="p-3 space-y-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-7 text-xs flex-1">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="documentary">Documentary</SelectItem>
                <SelectItem value="recipe">Recipe</SelectItem>
                <SelectItem value="language">Language</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={tribeFilter} onValueChange={setTribeFilter}>
              <SelectTrigger className="h-7 text-xs flex-1">
                <SelectValue placeholder="Tribe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tribes</SelectItem>
                {tribes.slice(0, 20).map(tribe => (
                  <SelectItem key={tribe.id} value={tribe.id}>
                    {tribe.name} ({tribe.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-6 text-xs"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setTribeFilter('all');
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
        
        {/* Content */}
        <TabsContent value="queue" className="flex-1 m-0">
          <ScrollArea className="h-[calc(60vh-220px)]">
            <div className="p-2 space-y-1">
              {filteredQueue.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">Your queue is empty</p>
                  <p className="text-xs mt-1">Add videos from tribes, recipes, or the video gallery</p>
                </div>
              ) : (
                <>
                  {filteredQueue.map((video, idx) => (
                    <QueueItem
                      key={video.id}
                      video={video}
                      index={idx}
                      onPlay={() => {
                        playNow(video);
                        removeFromQueue(video.id);
                      }}
                      onRemove={() => removeFromQueue(video.id)}
                      isFiltered={isFiltered}
                    />
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
          
          {queue.length > 0 && (
            <div className="p-2 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={clearQueue}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear Queue
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="flex-1 m-0">
          <ScrollArea className="h-[calc(60vh-220px)]">
            <div className="p-2 space-y-1">
              {playedVideos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No watch history</p>
                  <p className="text-xs mt-1">Videos you watch will appear here</p>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{playedVideos.length} videos in history</p>
                  <p className="text-xs mt-1">History is stored locally</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
