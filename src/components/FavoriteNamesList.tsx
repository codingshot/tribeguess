import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Heart, Trash2, ArrowRight, BarChart3, Clock, X
} from 'lucide-react';
import { useFavoriteNames, FavoriteName } from '@/hooks/useFavoriteNames';
import { formatDistanceToNow } from 'date-fns';

interface FavoriteNamesListProps {
  onCompare?: (name1: string, name2: string) => void;
  onAnalyze?: (name: string) => void;
}

export function FavoriteNamesList({ onCompare, onAnalyze }: FavoriteNamesListProps) {
  const { favorites, removeFavorite, clearFavorites, count } = useFavoriteNames();

  if (count === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Click the heart icon on any name to add it to your favorites. 
            You can then quickly compare them here!
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleQuickCompare = () => {
    if (favorites.length >= 2 && onCompare) {
      onCompare(favorites[0].name, favorites[1].name);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          Your Favorites
          <Badge variant="secondary" className="ml-2">{count}</Badge>
        </CardTitle>
        <div className="flex gap-2">
          {favorites.length >= 2 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleQuickCompare}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Quick Compare
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFavorites}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[300px]">
          <div className="space-y-2">
            {favorites.map((fav) => (
              <FavoriteItem 
                key={fav.name} 
                favorite={fav}
                onRemove={() => removeFavorite(fav.name)}
                onAnalyze={onAnalyze}
                onCompareWith={(name2) => onCompare?.(fav.name, name2)}
                otherFavorites={favorites.filter(f => f.name !== fav.name)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface FavoriteItemProps {
  favorite: FavoriteName;
  onRemove: () => void;
  onAnalyze?: (name: string) => void;
  onCompareWith?: (name: string) => void;
  otherFavorites: FavoriteName[];
}

function FavoriteItem({ 
  favorite, 
  onRemove, 
  onAnalyze, 
  onCompareWith,
  otherFavorites 
}: FavoriteItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow group">
      <div className="flex items-center gap-3">
        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        <div>
          <span className="font-medium">{favorite.name}</span>
          {(favorite.tribe || favorite.region) && (
            <div className="flex gap-1 mt-0.5">
              {favorite.tribe && (
                <Badge variant="outline" className="text-xs py-0">
                  {favorite.tribe}
                </Badge>
              )}
              {favorite.region && (
                <Badge variant="secondary" className="text-xs py-0">
                  {favorite.region}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-muted-foreground mr-2 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {formatDistanceToNow(favorite.addedAt, { addSuffix: true })}
        </span>
        
        {onAnalyze && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onAnalyze(favorite.name)}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
        
        {onCompareWith && otherFavorites.length > 0 && (
          <select
            className="h-8 px-2 text-xs rounded border bg-background"
            onChange={(e) => {
              if (e.target.value) {
                onCompareWith(e.target.value);
                e.target.value = '';
              }
            }}
            defaultValue=""
          >
            <option value="" disabled>Compare...</option>
            {otherFavorites.map(f => (
              <option key={f.name} value={f.name}>{f.name}</option>
            ))}
          </select>
        )}
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onRemove}
          className="hover:text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
