import { useState } from 'react';

interface HoverLetterProps {
  text: string;
  isBold?: boolean;
}

const HoverLetter = ({ text, isBold = false }: HoverLetterProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Dividi il testo in parole
  const words = text.split(/(\s+)/);

  return (
    <span className={`inline ${isBold ? 'font-bold' : ''}`}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className={`inline-block transition-colors duration-300 ${
            isHovered ? 'text-supercompany-magenta' : 'text-supercompany-dark-gray'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export default HoverLetter;