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
    
    // Instant play when ready
    const handleLoadedData = () => {
      video.play().catch(() => {
        // Autoplay blocked, but video is ready
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);
    return () => video.removeEventListener('loadeddata', handleLoadedData);
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

export default OptimizedVideo;