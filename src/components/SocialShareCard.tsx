import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, Share2, Image as ImageIcon, Loader2, CheckCircle,
  TrendingUp, TrendingDown, Minus, Users, Globe
} from 'lucide-react';
import { toast } from 'sonner';
import { GenderAnalysis, PopularityTrends } from '@/lib/genderNameAnalysis';

interface ComparisonData {
  name: string;
  gender: GenderAnalysis;
  trends: PopularityTrends;
  region?: string;
}

interface SocialShareCardProps {
  name1?: ComparisonData | null;
  name2?: ComparisonData | null;
  onClose?: () => void;
}

// OG Image dimensions for social media
const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

export function SocialShareCard({ name1, name2, onClose }: SocialShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const hasData = name1 || name2;

  useEffect(() => {
    if (hasData) {
      generatePreview();
    }
  }, [name1, name2]);

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'rising': return '📈';
      case 'declining': return '📉';
      default: return '➡️';
    }
  };

  const getGenderEmoji = (gender: string) => {
    switch (gender) {
      case 'male': return '♂️';
      case 'female': return '♀️';
      default: return '⚥';
    }
  };

  const generatePreview = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = CARD_WIDTH;
    canvas.height = CARD_HEIGHT;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

    // Decorative circles
    ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
    ctx.beginPath();
    ctx.arc(100, 100, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(CARD_WIDTH - 100, CARD_HEIGHT - 100, 150, 0, Math.PI * 2);
    ctx.fill();

    // Title
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    
    if (name1 && name2) {
      ctx.fillText(`${name1.name} vs ${name2.name}`, CARD_WIDTH / 2, 100);
    } else if (name1) {
      ctx.fillText(name1.name, CARD_WIDTH / 2, 100);
    } else if (name2) {
      ctx.fillText(name2.name, CARD_WIDTH / 2, 100);
    }

    // Subtitle
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px system-ui, -apple-system, sans-serif';
    ctx.fillText('African Name Comparison', CARD_WIDTH / 2, 150);

    // Draw comparison boxes
    const boxY = 200;
    const boxHeight = 350;
    const boxWidth = 500;
    const gap = 80;

    if (name1 && name2) {
      // Two names - side by side
      drawNameBox(ctx, name1, (CARD_WIDTH - boxWidth * 2 - gap) / 2, boxY, boxWidth, boxHeight, '#FFD700');
      drawNameBox(ctx, name2, (CARD_WIDTH + gap) / 2, boxY, boxWidth, boxHeight, '#87CEEB');
    } else if (name1 || name2) {
      // Single name - centered
      const data = name1 || name2;
      if (data) {
        drawNameBox(ctx, data, (CARD_WIDTH - boxWidth) / 2, boxY, boxWidth, boxHeight, '#FFD700');
      }
    }

    // Footer / Branding
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '20px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TribeGuess • Discover Your African Heritage', CARD_WIDTH / 2, CARD_HEIGHT - 30);

    // Generate preview URL
    const url = canvas.toDataURL('image/png');
    setPreviewUrl(url);
  };

  const drawNameBox = (
    ctx: CanvasRenderingContext2D, 
    data: ComparisonData, 
    x: number, 
    y: number, 
    width: number, 
    height: number,
    accentColor: string
  ) => {
    // Box background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 20);
    ctx.fill();

    // Border
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 42px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(data.name, x + width / 2, y + 60);

    // Stats
    const statsY = y + 100;
    const lineHeight = 45;
    ctx.font = '24px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';

    // Gender
    ctx.fillText(
      `${getGenderEmoji(data.gender.detectedGender)} ${data.gender.detectedGender.charAt(0).toUpperCase() + data.gender.detectedGender.slice(1)}`,
      x + width / 2,
      statsY
    );

    // Trend
    ctx.fillText(
      `${getTrendIcon(data.trends.trendDirection)} ${data.trends.trendDirection.charAt(0).toUpperCase() + data.trends.trendDirection.slice(1)}`,
      x + width / 2,
      statsY + lineHeight
    );

    // Peak decade
    if (data.trends.peakDecade) {
      ctx.fillText(
        `🏆 Peak: ${data.trends.peakDecade}`,
        x + width / 2,
        statsY + lineHeight * 2
      );
    }

    // Popularity rank
    ctx.fillText(
      `📊 Rank: #${data.trends.overallRank || 'N/A'}`,
      x + width / 2,
      statsY + lineHeight * 3
    );

    // Region if available
    if (data.region) {
      ctx.fillStyle = accentColor;
      ctx.font = '20px system-ui, -apple-system, sans-serif';
      ctx.fillText(
        `🌍 ${data.region}`,
        x + width / 2,
        statsY + lineHeight * 4
      );
    }
  };

  const downloadImage = async () => {
    if (!previewUrl) {
      toast.error('Generate preview first');
      return;
    }

    setIsGenerating(true);
    try {
      const link = document.createElement('a');
      const fileName = name1 && name2 
        ? `${name1.name}-vs-${name2.name}-comparison.png`
        : `${name1?.name || name2?.name}-analysis.png`;
      link.download = fileName;
      link.href = previewUrl;
      link.click();
      toast.success('Image downloaded!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download image');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareImage = async () => {
    if (!previewUrl) {
      toast.error('Generate preview first');
      return;
    }

    // Convert data URL to blob for sharing
    const response = await fetch(previewUrl);
    const blob = await response.blob();
    const file = new File([blob], 'name-comparison.png', { type: 'image/png' });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'African Name Comparison',
          text: name1 && name2 
            ? `Check out this comparison of ${name1.name} vs ${name2.name}!`
            : `Check out this analysis of ${name1?.name || name2?.name}!`
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
    } else {
      // Fallback to download
      downloadImage();
    }
  };

  if (!hasData) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-8 text-center">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
          <p className="text-muted-foreground">
            Enter names to compare to generate a social share card
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Social Share Card (1200×630)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview */}
        <div className="relative rounded-lg overflow-hidden border bg-muted">
          <canvas 
            ref={canvasRef} 
            className="w-full h-auto"
            style={{ maxHeight: '315px' }}
          />
          {!previewUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            onClick={downloadImage} 
            disabled={isGenerating || !previewUrl}
            className="flex-1"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download PNG
          </Button>
          <Button 
            variant="outline" 
            onClick={shareImage}
            disabled={!previewUrl}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Perfect size for Twitter, Facebook, and LinkedIn previews
        </p>
      </CardContent>
    </Card>
  );
}
