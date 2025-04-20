import React from 'react';
import '../styles/main.css';

const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H', 'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','😊', '🔤', '⬅️'];

const VirtualKeyboard = ({ onCharClick }) => {
  const handleClick = (char) => {
    if (char === '⬅️') {
      onCharClick('BACKSPACE');
    } else {
      onCharClick(char);
    }
  };
  return (
    <div className="virtual-keyboard">
      {/* {characters.map((char, idx) => (
        <button key={idx} onClick={() => onCharClick(char)}>{char}</button>
      ))} */}
      {characters.map((char, idx) => (
        <button key={idx} onClick={() => handleClick(char)}>
          {char}
        </button>
      ))}
    </div>
  );
};

export default VirtualKeyboard;