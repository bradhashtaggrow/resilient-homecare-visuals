
import { useState, useEffect } from 'react';

interface UseTypingAnimationOptions {
  text: string;
  speed?: number;
  delay?: number;
}

export const useTypingAnimation = ({ text, speed = 100, delay = 0 }: UseTypingAnimationOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // If no text or delay is 0, don't start animation
    if (!text || delay === 0) {
      setDisplayedText('');
      setIsComplete(false);
      return;
    }

    // Trim the text to remove any trailing spaces
    const trimmedText = text.trim();
    
    setDisplayedText('');
    setIsComplete(false);

    const delayTimeout = setTimeout(() => {
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < trimmedText.length) {
          setDisplayedText(trimmedText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(typeInterval);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);
    
    return () => {
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay]);

  return { displayedText, isComplete };
};
