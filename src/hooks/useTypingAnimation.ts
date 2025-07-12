
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
    if (!text) return;

    // Trim the text to remove any trailing spaces
    const trimmedText = text.trim();
    
    setDisplayedText('');
    setIsComplete(false);

    const startTyping = () => {
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
    };

    const delayTimeout = setTimeout(startTyping, delay);
    
    return () => {
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay]);

  return { displayedText, isComplete };
};
