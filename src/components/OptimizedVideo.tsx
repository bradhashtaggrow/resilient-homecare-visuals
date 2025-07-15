
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

  // Reload video when src changes with better error handling
  useEffect(() => {
    const video = videoRef.current;
    if (video && isLoaded && src) {
      console.log('Video src changed, reloading:', src);
      
      // Reset loading state
      setIsLoaded(false);
      
      // Add error handling
      const handleLoadError = () => {
        console.warn('Video load failed, retrying...', src);
        setTimeout(() => {
          if (video && !video.error) {
            video.load();
          }
        }, 1000);
      };
      
      video.addEventListener('error', handleLoadError);
      video.load();
      
      if (isInView) {
        video.play().catch((error) => {
          console.warn('Video autoplay failed:', error);
        });
      }
      
      return () => {
        video.removeEventListener('error', handleLoadError);
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
