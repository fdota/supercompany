import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterText = ({ text, speed = 50, className = "" }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`typewriter ${className}`}>
      {displayText}
    </span>
  );
};

export default TypewriterText;