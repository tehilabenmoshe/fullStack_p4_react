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
  { value: 'purple', label: 'סגול' }
];

const TextFormatControls = ({ onFormatChange, currentFont, currentSize, currentColor }) => {

  const handleFontChange = (e) => onFormatChange('font', e.target.value);
  const handleSizeChange = (e) => onFormatChange('size', e.target.value);
  const handleColorChange = (e) => onFormatChange('color', e.target.value);

  return (
    <div className="text-format-controls">
      <div className="format-control">
        <label>גופן:</label>
        <select value={currentFont} onChange={handleFontChange}>
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="format-control">
        <label>גודל:</label>
        <select value={currentSize} onChange={handleSizeChange}>
          {sizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="format-control">
        <label>צבע:</label>
        <select value={currentColor} onChange={handleColorChange}>
          {colorOptions.map((color) => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TextFormatControls;
