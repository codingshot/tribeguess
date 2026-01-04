import { useState } from 'react';
import { Share2, Copy, Check, Twitter, Facebook, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';

interface ShareButtonProps {
  title: string;
  url: string;
  description?: string;
}

export const ShareButton = ({ title, url, description = '' }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fullUrl = url.startsWith('http') ? url : `https://tribeguess.com${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: fullUrl,
        });
        setIsOpen(false);
      } catch (err) {
        // User cancelled or error
        console.log('Share cancelled or failed');
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const shareLinks = [
    {
      name: 'Twitter / X',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-[#4267B2]/10 hover:text-[#4267B2]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: 'hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-[#25D366]/10 hover:text-[#25D366]',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'hover:bg-muted hover:text-foreground',
    },
  ];

  const supportsNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="end">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground px-2 py-1">Share this article</p>
          
          {supportsNativeShare && (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-2"
              onClick={handleNativeShare}
            >
              <Share2 className="h-4 w-4" />
              <span>Share via...</span>
            </Button>
          )}

          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-2 py-2 rounded-md transition-colors ${link.color}`}
              onClick={() => setIsOpen(false)}
            >
              <link.icon className="h-4 w-4" />
              <span className="text-sm">{link.name}</span>
            </a>
          ))}

          <div className="border-t border-border my-1" />
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-2"
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy link</span>
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
