import React, { useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  poster?: string;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = React.memo(({ 
  src, 
  className = '', 
  style = {},
  poster 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Force video to start from beginning - especially important for mobile
    video.currentTime = 0;
    
    // Set preload for faster loading
    video.preload = 'metadata';
    
    // Multiple event handlers to ensure video starts from beginning
    const resetVideoTime = () => {
      video.currentTime = 0;
    };

    const handleCanPlay = () => {
      video.currentTime = 0;
      video.play().catch(() => {
        // Autoplay blocked, but video is ready
      });
    };

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
    };

    const handleLoadedData = () => {
      video.currentTime = 0;
      video.play().catch(() => {
        // Autoplay blocked, but video is ready
      });
    };

    // Mobile browsers sometimes need this extra nudge
    const handleTimeUpdate = () => {
      // If video somehow jumped ahead, reset it (only on first few seconds)
      if (video.currentTime > 5 && video.currentTime < 10) {
        video.currentTime = 0;
      }
    };

    // Add all event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    // Immediate reset on mount
    resetVideoTime();
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [src]);

  if (!src) return null;

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload="metadata"
      autoPlay
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
});

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo;