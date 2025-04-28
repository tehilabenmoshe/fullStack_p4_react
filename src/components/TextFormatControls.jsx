// src/components/TextFormatControls.jsx
import React from 'react';

// הגדרות קבועות מחוץ לקומפוננטה (כדי לא להיווצר מחדש בכל רינדור)
const fontOptions = ['Arial', 'Times New Roman', 'Courier New', 'David', 'Miriam'];
const sizeOptions = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
const colorOptions = [
  { value: 'black', label: 'שחור' },
  { value: 'red', label: 'אדום' },
  { value: 'blue', label: 'כחול' },
  { value: 'green', label: 'ירוק' },
  { value: 'purple', label: 'סגול' },
  { value: 'pink', label: 'ורוד' }
];

const TextFormatControls = ({ onFormatChange, currentFont, currentSize, currentColor }) => {

  const handleFontChange = (e) => onFormatChange('font', e.target.value);
  const handleSizeChange = (e) => onFormatChange('size', e.target.value);
  const handleColorChange = (color) => onFormatChange('color', color); 

  return (
    <div className="text-format-controls">
      <div className="format-control">
        <label>font:</label>
        <select value={currentFont} onChange={handleFontChange}>
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="format-control">
        <label>size:</label>
        <select value={currentSize} onChange={handleSizeChange}>
          {sizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="format-control">
        <label>color:</label>
        <div className="color-options">
          {colorOptions.map((color) => (
            <div
                key={color.value}
                className={`color-circle ${currentColor === color.value ? 'selected' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => handleColorChange(color.value)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextFormatControls;
