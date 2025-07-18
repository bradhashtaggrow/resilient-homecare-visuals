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

    // Force video to start from beginning
    video.currentTime = 0;
    
    // Set preload for faster loading
    video.preload = 'metadata';
    
    const handleCanPlay = () => {
      // Only reset if video hasn't started playing yet
      if (video.currentTime === 0 || video.paused) {
        video.currentTime = 0;
      }
      video.play().catch(() => {
        // Autoplay blocked, but video is ready
      });
    };

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
    };

    const handleLoadedData = () => {
      video.currentTime = 0;
    };

    // Add event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
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