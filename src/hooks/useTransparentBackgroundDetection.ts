import { useState, useEffect } from 'react';

export const useTransparentBackgroundDetection = (imageUrl: string | undefined): boolean => {
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setIsTransparent(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.naturalWidth, img.naturalHeight, 64);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, size, size);

        // Sample corner pixels for alpha
        const corners: [number, number][] = [
          [0, 0],
          [size - 1, 0],
          [0, size - 1],
          [size - 1, size - 1],
        ];

        let transparentCount = 0;
        for (const [x, y] of corners) {
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          if (pixel[3] < 128) transparentCount++;
        }

        setIsTransparent(transparentCount >= 2);
      } catch {
        // CORS or other canvas errors — assume opaque
        setIsTransparent(false);
      }
    };

    img.onerror = () => setIsTransparent(false);
    img.src = imageUrl;
  }, [imageUrl]);

  return isTransparent;
};
