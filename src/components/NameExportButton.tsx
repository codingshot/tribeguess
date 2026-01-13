import { useState, useRef } from 'react';
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
  elementRef: React.RefObject<HTMLDivElement>;
  fileName?: string;
  title?: string;
}

export function NameExportButton({ 
  elementRef, 
  fileName = 'name-comparison',
  title = 'Name Analysis'
}: NameExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsImage = async () => {
    if (!elementRef.current) {
      toast.error('No content to export');
      return;
    }

    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(elementRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export image');
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    if (!elementRef.current) {
      toast.error('No content to export');
      return;
    }

    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const canvas = await html2canvas(elementRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileName}.pdf`);

      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF export failed:', error);
      toast.error('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const shareToSocial = async (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const pageUrl = window.location.href;
    const text = `Check out this African name analysis: ${title}`;
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const nativeShare = async () => {
    if (!navigator.share) {
      toast.error('Sharing not supported on this device');
      return;
    }

    try {
      await navigator.share({
        title: title,
        text: `Check out this African name analysis`,
        url: window.location.href
      });
    } catch (error) {
      // User cancelled or share failed
      if ((error as Error).name !== 'AbortError') {
        toast.error('Failed to share');
      }
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
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={exportAsImage}>
          <Image className="w-4 h-4 mr-2" />
          Download as PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsPDF}>
          <FileText className="w-4 h-4 mr-2" />
          Download as PDF
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
        {'share' in navigator && (
          <DropdownMenuItem onClick={nativeShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share...
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
