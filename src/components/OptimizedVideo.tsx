
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

  // Ultra-fast video loading for millisecond performance
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    setHasError(false);
    setIsLoaded(false);
    setIsPlaying(false);

    const handleLoadStart = () => {
      // Set loaded immediately on loadstart for faster rendering
      setIsLoaded(true);
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
      // Immediate play attempt
      video.play().catch(() => {
        // Autoplay may fail, but that's expected
      });
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      setIsPlaying(true);
    };

    const handleError = () => {
      setHasError(true);
    };

    // Add event listeners for fastest response
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Force immediate load
    video.load();

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
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
