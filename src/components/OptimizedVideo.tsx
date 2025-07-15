
import React, { useRef, useEffect, useState } from 'react';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  poster?: string;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({ 
  src, 
  className = '', 
  style = {},
  poster 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Aggressive video loading for hero sections - load immediately
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    console.log('OptimizedVideo: Loading video:', src);
    setHasError(false);
    setIsLoaded(false);
    setIsPlaying(false);

    let retryCount = 0;
    const maxRetries = 3;

    const handleLoadedData = () => {
      console.log('OptimizedVideo: Video loaded successfully:', src);
      setIsLoaded(true);
      setHasError(false);
      retryCount = 0;
      
      // Immediately try to play for hero sections
      tryPlay();
    };

    const handleError = (event: Event) => {
      retryCount++;
      console.warn(`OptimizedVideo: Load error (attempt ${retryCount}/${maxRetries}):`, src, event);
      
      if (retryCount <= maxRetries) {
        const delay = Math.pow(2, retryCount) * 500; // 500ms, 1s, 2s
        setTimeout(() => {
          if (video && retryCount <= maxRetries) {
            console.log(`OptimizedVideo: Retrying load attempt ${retryCount}:`, src);
            video.load();
          }
        }, delay);
      } else {
        console.error('OptimizedVideo: Failed to load after max retries:', src);
        setHasError(true);
      }
    };

    const handleCanPlay = () => {
      console.log('OptimizedVideo: Can play:', src);
      setIsLoaded(true);
      tryPlay();
    };

    const tryPlay = async () => {
      if (!video || hasError) return;
      
      try {
        console.log('OptimizedVideo: Attempting to play:', src);
        await video.play();
        setIsPlaying(true);
        console.log('OptimizedVideo: Playing successfully:', src);
      } catch (error) {
        console.warn('OptimizedVideo: Autoplay failed (this is normal):', error);
        // Don't set error state for autoplay failures - this is expected
      }
    };

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    // Force load immediately
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  // Simple intersection observer for performance optimization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isLoaded && !isPlaying) {
          // Try to play when coming into view
          video.play().catch(() => {
            // Autoplay failed, but that's ok
          });
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, [isLoaded, isPlaying]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload="auto" // Changed from "none" to "auto" for immediate loading
      poster={poster}
      autoPlay={false} // Let our logic handle play attempts
    >
      <source src={src} type="video/mp4" />
      {/* Fallback for unsupported video */}
      Your browser does not support the video tag.
    </video>
  );
};

export default OptimizedVideo;
