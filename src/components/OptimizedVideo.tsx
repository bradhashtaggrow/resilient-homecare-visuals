
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
  const [isInView, setIsInView] = useState(false);

  // Optimized video loading with better performance and error handling
  useEffect(() => {
    const video = videoRef.current;
    if (video && src) {
      console.log('Video src changed, reloading:', src);
      
      // Reset loading state
      setIsLoaded(false);
      
      // Optimized error handling with exponential backoff
      let retryCount = 0;
      const maxRetries = 3;
      
      const handleLoadError = () => {
        retryCount++;
        if (retryCount <= maxRetries) {
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.warn(`Video load failed, retrying in ${delay}ms (attempt ${retryCount}/${maxRetries}):`, src);
          setTimeout(() => {
            if (video && !video.error && retryCount <= maxRetries) {
              video.load();
            }
          }, delay);
        } else {
          console.error('Video failed to load after max retries:', src);
        }
      };
      
      const handleCanPlay = () => {
        setIsLoaded(true);
        retryCount = 0; // Reset on successful load
      };
      
      video.addEventListener('error', handleLoadError);
      video.addEventListener('canplay', handleCanPlay);
      
      // Use requestAnimationFrame for smooth loading
      requestAnimationFrame(() => {
        video.load();
      });
      
      return () => {
        video.removeEventListener('error', handleLoadError);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting && !isLoaded) {
          // Preload video when it comes into view
          console.log('Loading video:', src);
          video.load();
          setIsLoaded(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Start loading 100px before it comes into view
      }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, [isLoaded, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView && isLoaded) {
      video.play().catch(() => {
        // Handle autoplay policy restrictions silently
      });
    } else if (!isInView) {
      video.pause();
    }
  }, [isInView, isLoaded]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default OptimizedVideo;
