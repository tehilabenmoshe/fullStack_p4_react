// src/components/TextEditorArea.jsx
import React, { useState } from 'react';
import TextEditor from './TextEditor';
import TextDisplay from './TextDisplay';
import TextFormatControls from './TextFormatControls';

const TextEditorArea = ({ renderVirtualKeyboard }) => {
    const [text, setText] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
  
    const [textFormat, setTextFormat] = useState({
      font: 'Arial',
      size: '16px',
      color: 'black'
    });
  
    const handleFormatChange = (formatType, value) => {
      setTextFormat(prev => ({
        ...prev,
        [formatType]: value
      }));
    };
  
//   return (
//     <div className="text-editors">
//       <TextDisplay 
//         text={"כאן יוצג טקסט"}
//         cursorPosition={0}
//         textFormat={{ font: "Arial", size: "16px", color: "black" }}
//       />
      
//       <TextEditor 
//         text={"כאן עורך טקסט"}
//         setText={() => {}} 
//         cursorPosition={0}
//         setCursorPosition={() => {}}
//         textFormat={{ font: "Arial", size: "16px", color: "black" }}
//       >
//         {renderVirtualKeyboard}
//       </TextEditor>
//     </div>
//   );
return (
    <div className="text-editors">
      {/* שליטה על פורמט */}
      <TextFormatControls
        onFormatChange={handleFormatChange}
        currentFont={textFormat.font}
        currentSize={textFormat.size}
        currentColor={textFormat.color}
      />

      {/* תצוגת טקסט */}
      <TextDisplay 
        text={text}
        cursorPosition={cursorPosition}
        textFormat={textFormat}
      />

      {/* עורך טקסט */}
      <TextEditor 
        text={text}
        setText={setText}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        textFormat={textFormat}
      >
        {renderVirtualKeyboard}
      </TextEditor>
    </div>
  );
};

export default TextEditorArea;
