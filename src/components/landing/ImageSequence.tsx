'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue } from 'framer-motion';

interface ImageSequenceProps {
  progress: MotionValue<number>;
  frameCount: number;
  basePath: string;
  extension: string;
  className?: string;
}

export function ImageSequence({ 
  progress, 
  frameCount, 
  basePath, 
  extension, 
  className 
}: ImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const preloadImages = async () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `${basePath}${paddedIndex}${extension}`;
        
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
          if (loadedCount === frameCount) {
            setIsLoaded(true);
            // Draw the first frame once loaded
            drawFrame(0);
          }
        };
        images.push(img);
      }
      imagesRef.current = images;
    };

    preloadImages();
  }, [frameCount, basePath, extension]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesRef.current[index]) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    
    // Set canvas dimensions to match image on first draw or if changed
    if (canvas.width !== img.width || canvas.height !== img.height) {
      canvas.width = img.width;
      canvas.height = img.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // Sync scroll progress to frame drawing
  useEffect(() => {
    if (!isLoaded) return;

    const unsubscribe = progress.on('change', (v) => {
      const frameIndex = Math.min(
        Math.floor(v * frameCount),
        frameCount - 1
      );
      requestAnimationFrame(() => drawFrame(frameIndex));
    });

    return () => unsubscribe();
  }, [isLoaded, progress, frameCount]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Canvas for ultra-smooth rendering */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          willChange: 'transform',
          imageRendering: 'crisp-edges' 
        }}
      />

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50 backdrop-blur-sm z-10">
          <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
             <div 
               className="h-full bg-blue-500 transition-all duration-300"
               style={{ width: `${loadProgress}%` }}
             />
          </div>
          <p className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Loading Assets {loadProgress}%
          </p>
        </div>
      )}
    </div>
  );
}
