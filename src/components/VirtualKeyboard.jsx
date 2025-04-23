import React from 'react';


//const characters = ['😊','⬅️','1','2','3','4','5','6','7','8','9','0', 'A', 'B', 'C', 'D', 'E', 'F', 'G','H', 'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const keyboards = {
  EN: ['⬅️', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  HE: ['⬅️', 'א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'],
  EMOJI: ['⬅️', '😊','😂','😍','👍','🔥','🎉','🙌','💡','🥳','😎','❤️','🤔','💻']
};

const VirtualKeyboard = ({ onCharClick, language = 'EN', showEmojis = false }) => {
  const layout = showEmojis ? keyboards.EMOJI : keyboards[language];

  const handleClick = (char) => {
    if (char === '⬅️') {
      onCharClick('BACKSPACE');
    } else {
      onCharClick(char);
    }
  };
  
  return (
    <div className="virtual-keyboard">
      {layout.map((char, idx) => (
        <button key={idx} onClick={() => handleClick(char)}>
          {char}
        </button>
      ))}
    </div>
  );
};

export default VirtualKeyboard;