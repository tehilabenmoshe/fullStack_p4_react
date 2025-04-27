import React from 'react';
import '../styles/VirtualKeyboard.css';

const keyboards = {
  EN: ['⬅️', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','SPACE'],
  HE: ['⬅️', 'א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת','SPACE'],
  EMOJI: ['⬅️', '😊','😂','😍','👍','🔥','🎉','🙌','💡','🥳','😎','❤️','🤔','💻','SPACE']
};

const VirtualKeyboard = ({ onCharClick, language = 'EN', showEmojis = false }) => {
  const layout = showEmojis ? keyboards.EMOJI : keyboards[language];

  const handleClick = (char) => {
    if (char === 'SPACE') {
      onCharClick(' ');
    }
    else if (char === '⬅️') {
      onCharClick('BACKSPACE');
    } else {
      onCharClick(char);
    }
  };
  
  return (
    <div className="virtual-keyboard">
      {layout.map((char, idx) => (
        <button
          key={idx}
          className={char === 'SPACE' ? 'space-button' : ''}
          onClick={() => handleClick(char)}
        >
          {char === 'SPACE' ? ' ' : char}
        </button>
      ))}

    </div>
  );
};

export default VirtualKeyboard;