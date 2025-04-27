import React, { useState } from 'react';
import '../styles/VirtualKeyboard.css';

const mainLayouts = {
  EN: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"],
    ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["caps lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "return"],
    ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift"],
  ],
  HE: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"],
    ["tab", "/", "'", "ק", "ר", "א", "ט", "ו", "ן", "ם", "פ", "[", "]", "\\"],
    ["caps lock", "ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף", "return"],
    ["shift", "ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ", "shift"],
  ]
};

const emojiLayout = [
  ["😊", "😂", "😍", "👍", "🔥", "🎉"],
  ["🙌", "💡", "🥳", "😎", "❤️", "🤔"],
  ["💻", "📚", "✈️", "🎵", "🏆", "🌟"],
];

const VirtualKeyboard = ({ onCharClick }) => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [capsLock, setCapsLock] = useState(false);
  const [pressedKey, setPressedKey] = useState(null);

  const isEmoji = currentLanguage === 'EMOJI';
  const layout = isEmoji ? emojiLayout : mainLayouts[currentLanguage];

  const handleClick = (key) => {
    setPressedKey(key);

    if (key.toLowerCase() === 'emoji') {
      setCurrentLanguage('EMOJI');
    } else if (key.toLowerCase() === 'toggle-lang') {
      if (currentLanguage === 'EN') setCurrentLanguage('HE');
      else if (currentLanguage === 'HE') setCurrentLanguage('EN');
    } else if (key.toLowerCase() === 'space') {
      onCharClick(' ');
    } else if (key.toLowerCase() === 'delete' || key.toLowerCase() === 'backspace') {
      onCharClick('BACKSPACE');
    } else if (key.toLowerCase() === 'caps lock') {
      setCapsLock(!capsLock);
    } else if (key === 'HE') {
      setCurrentLanguage('HE');
    } else if (key === 'EN') {
      setCurrentLanguage('EN');
    } else {
      if (capsLock && currentLanguage === 'EN') {
        onCharClick(key.toUpperCase());
      } else {
        onCharClick(key);
      }
    }

    setTimeout(() => {
      setPressedKey(null);
    }, 150);
  };

  const renderBottomRow = () => {
    if (isEmoji) {
      // במצב אימוג'ים – שתי שפות ורווח
      return (
        <div className="keyboard-row">
          <button
            className="key-button toggle-lang-button"
            onClick={() => handleClick('HE')}
          >
            עברית
          </button>
          <button
            className="key-button toggle-lang-button"
            onClick={() => handleClick('EN')}
          >
            ENG
          </button>
          <button
            className="key-button space-button"
            onClick={() => handleClick('space')}
          >
          </button>
        </div>
      );
    } else {
      // במצב אנגלית/עברית רגיל – אימוג'י, החלפת שפה, ורווח
      return (
        <div className="keyboard-row">
          <button
            className="key-button emoji-button"
            onClick={() => handleClick('emoji')}
          >
            😊
          </button>
          <button
            className="key-button toggle-lang-button"
            onClick={() => handleClick('toggle-lang')}
          >
            {currentLanguage === 'EN' ? 'עברית' : 'ENG'}
          </button>
          <button
            className="key-button space-button"
            onClick={() => handleClick('space')}
          >
          </button>
        </div>
      );
    }
  };

  return (
    <div className="keyboard-container">
      <div
        className="virtual-keyboard"
        style={{ direction: currentLanguage === 'HE' ? 'rtl' : 'ltr' }}
      >
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key, idx) => (
              <button
                key={idx}
                className={`
                  key-button 
                  ${key.toLowerCase() === 'shift' ? 'shift-button' : ''}
                  ${key.toLowerCase() === 'caps lock' ? 'capslock-button' : ''}
                  ${key.toLowerCase() === 'tab' ? 'tab-button' : ''}
                  ${key.toLowerCase() === 'return' ? 'return-button' : ''}
                  ${key.toLowerCase() === 'delete' || key.toLowerCase() === 'backspace' ? 'delete-button' : ''}
                  ${capsLock && key.toLowerCase() === 'caps lock' ? 'capslock-active' : ''}
                  ${pressedKey === key ? 'pressed' : ''}
                `}
                onClick={() => handleClick(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        {renderBottomRow()}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
