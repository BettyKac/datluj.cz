import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false);

  useEffect(() => {
    if (!active) return;

    const handleKeyUp = (event: KeyboardEvent) => {
      const isMistake = event.key !== lettersLeft[0];
      setMistake(isMistake);

      if (isMistake) {
        onMistake();
      }

      if (lettersLeft.length > 0 && event.key === lettersLeft[0]) {
        const newLettersLeft = lettersLeft.slice(1);
        setLettersLeft(newLettersLeft);

        if (newLettersLeft.length === 0) {
          onFinish();
        }
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft, onFinish, active, onMistake]);

  return (
    <div className={`wordbox ${mistake ? 'wordbox--mistake' : ''}`}>
      {lettersLeft}
    </div>
  );
};

export default Wordbox;
