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

    // Set preload for faster loading
    video.preload = 'metadata';
    
    // Reset video to start and handle loading
    const handleLoadedData = () => {
      // Ensure video always starts from the beginning
      video.currentTime = 0;
      video.play().catch(() => {
        // Autoplay blocked, but video is ready
      });
    };

    // Handle metadata loaded to ensure proper timing
    const handleLoadedMetadata = () => {
      video.currentTime = 0;
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
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