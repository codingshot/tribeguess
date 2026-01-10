import { useState, forwardRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react';

interface GalleryImage {
  url: string;
  caption?: string;
  credit?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export const ImageGallery = forwardRef<HTMLElement, ImageGalleryProps>(({ images, title = "Gallery" }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(true);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsGridView(false);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setIsGridView(true);
  };

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

  return (
    <section className="mt-6" ref={ref}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg sm:text-xl font-semibold flex items-center gap-2">
          <Images className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          {title}
        </h2>
        <span className="text-xs text-muted-foreground">{images.length} images</span>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer border border-border hover:border-primary transition-colors"
          >
            <img
              src={image.url}
              alt={image.caption || `Gallery image ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-xs text-white truncate">{image.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 sm:left-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 sm:right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div className="max-w-4xl max-h-[90vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedIndex].url}
              alt={images[selectedIndex].caption || `Gallery image ${selectedIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            {(images[selectedIndex].caption || images[selectedIndex].credit) && (
              <div className="mt-3 text-center">
                {images[selectedIndex].caption && (
                  <p className="text-white text-sm">{images[selectedIndex].caption}</p>
                )}
                {images[selectedIndex].credit && (
                  <p className="text-white/60 text-xs mt-1">Credit: {images[selectedIndex].credit}</p>
                )}
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
                  className={`w-12 h-12 rounded flex-shrink-0 overflow-hidden border-2 transition-colors ${
                    index === selectedIndex ? 'border-primary' : 'border-transparent hover:border-white/50'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}

          <p className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {selectedIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
});

ImageGallery.displayName = 'ImageGallery';
