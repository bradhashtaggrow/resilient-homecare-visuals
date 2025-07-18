
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

  // Instant video loading - no delays
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Immediate play on load
    const handleCanPlay = () => {
      video.play().catch(() => {
        console.log('Autoplay blocked, but video is ready');
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
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
      autoPlay
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default OptimizedVideo;
