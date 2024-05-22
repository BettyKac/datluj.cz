import { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size?: number) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState<string[]>([
    generateWord(Math.floor(Math.random() * (10 - 3 + 1)) + 3) as string,
    generateWord(Math.floor(Math.random() * (10 - 3 + 1)) + 3) as string,
    generateWord(Math.floor(Math.random() * (10 - 3 + 1)) + 3) as string,
  ]);
  const [mistakes, setMistakes] = useState<number>(0);

  const handleFinish = () => {
    const newWord = generateWord(Math.floor(Math.random() * (10 - 3 + 1)) + 3);
    if (newWord) {
      setWords((prevWords) => {
        const updatedWords = prevWords.slice(1);
        updatedWords.push(newWord);
        return updatedWords;
      });
    }
  };

  const handleMistake = () => {
    setMistakes((prevMistakes) => prevMistakes + 1);
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            word={word}
            key={word}
            onFinish={handleFinish}
            active={index === 0}
            onMistake={handleMistake}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
