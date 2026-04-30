import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, Image, FileText, Share2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface NameExportButtonProps {
  elementRef: React.RefObject<HTMLElement>;
  fileName?: string;
  title?: string;
}

function getThemeBackgroundColor(): string {
  // Our design tokens store HSL triplets like: "0 0% 100%".
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
  if (!raw) return 'white';
  return `hsl(${raw})`;
}

async function exportSvgAsPng(svgEl: SVGElement, fileName: string, backgroundColor: string) {
  const serializer = new XMLSerializer();
  let svgText = serializer.serializeToString(svgEl);

  // Ensure xmlns is present
  if (!svgText.includes('xmlns="http://www.w3.org/2000/svg"')) {
    svgText = svgText.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = new window.Image();
    img.decoding = 'async';

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load SVG image'));
      img.src = url;
    });

    const width = Math.max(1, Math.round(svgEl.getBoundingClientRect().width));
    const height = Math.max(1, Math.round(svgEl.getBoundingClientRect().height));

    const scale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');

    // Background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.drawImage(img, 0, 0);

    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = pngUrl;
    link.click();
  } finally {
    URL.revokeObjectURL(url);
  }
}

function openPrintWindow(contentEl: HTMLElement, title: string) {
  const win = window.open('', '_blank', 'noopener,noreferrer');
  if (!win) {
    toast.error('Popup blocked — allow popups to export as PDF');
    return;
  }

  const cloned = contentEl.cloneNode(true) as HTMLElement;

  win.document.open();
  win.document.write(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>
  <style>
    :root { color-scheme: light; }
    body { margin: 24px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; }
    .print-wrap { max-width: 1100px; margin: 0 auto; }
    @media print { body { margin: 0; } .print-wrap { padding: 24px; } }
  </style>
</head>
<body>
  <div class="print-wrap"></div>
</body>
</html>`);
  win.document.close();

  const mount = win.document.querySelector('.print-wrap');
  if (mount) mount.appendChild(cloned);

  // Give the browser a tick to layout before printing.
  setTimeout(() => {
    win.focus();
    win.print();
  }, 250);

  toast.message('Tip: In the print dialog choose “Save as PDF”');
}

export function NameExportButton({
  elementRef,
  fileName = 'name-comparison',
  title = 'Name Analysis',
}: NameExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsImage = async () => {
    const el = elementRef.current;
    if (!el) {
      toast.error('No content to export');
      return;
    }

    const svg = el.querySelector('svg');
    if (!svg) {
      toast.error('No chart found to export');
      return;
    }

    setIsExporting(true);
    try {
      await exportSvgAsPng(svg, fileName, getThemeBackgroundColor());
      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('PNG export failed:', error);
      toast.error('Failed to export image');
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = () => {
    const el = elementRef.current;
    if (!el) {
      toast.error('No content to export');
      return;
    }
    openPrintWindow(el, title);
  };

  const shareToSocial = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const pageUrl = window.location.href;
    const text = `Check out this African name analysis: ${title}`;

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    };

    window.open(urls[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const nativeShare = async () => {
    if (!navigator.share) {
      toast.error('Sharing not supported on this device');
      return;
    }

    try {
      await navigator.share({
        title,
        text: 'Check out this African name analysis',
        url: window.location.href,
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') toast.error('Failed to share');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={exportAsImage}>
          <Image className="w-4 h-4 mr-2" />
          Download chart PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsPDF}>
          <FileText className="w-4 h-4 mr-2" />
          Save as PDF (Print)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareToSocial('twitter')}>
          <Share2 className="w-4 h-4 mr-2" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareToSocial('facebook')}>
          <Share2 className="w-4 h-4 mr-2" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareToSocial('linkedin')}>
          <Share2 className="w-4 h-4 mr-2" />
          Share on LinkedIn
        </DropdownMenuItem>
        {navigator.share && (
          <DropdownMenuItem onClick={nativeShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share…
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

