import React from 'react';

const TextDisplay = ({ text, textFormat, searchQuery = '', onSearchChange }) => {
  // The design of the text display area
  const displayStyle = {
    fontFamily: textFormat.font,
    fontSize: textFormat.size,
    color: textFormat.color
  };

  const getHighlightedText = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="text-display">
      
      {/* שדה חיפוש מעל התצוגה */}
      <input 
        type="text" 
        placeholder="חפש תו או טקסט..." 
        value={searchQuery}
        // When the user types, call it with the new value
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      {/* תצוגת הטקסט */}
      <div className="text-output" style={displayStyle}>
        {getHighlightedText(text, searchQuery)}
      </div>
    </div>
  );
};

export default TextDisplay;
