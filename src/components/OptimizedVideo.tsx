
import React, { useRef, useEffect } from 'react';

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

  // Ultra-fast video loading - NO states, NO delays, instant rendering
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Immediate load and play - no waiting for events
    video.load();
    
    // Aggressive autoplay attempt
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        // Silent fail for autoplay restrictions
        console.log('Autoplay prevented, user interaction required');
      }
    };
    
    // Play immediately when any data is available
    video.addEventListener('loadstart', playVideo);
    video.addEventListener('canplay', playVideo);
    
    return () => {
      video.removeEventListener('loadstart', playVideo);
      video.removeEventListener('canplay', playVideo);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      autoPlay
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default OptimizedVideo;
