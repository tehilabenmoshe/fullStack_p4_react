class FileManager {
  static loadUserFiles(username) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userFiles = users[username]?.files || {};

    return Object.entries(userFiles).map(([fileId, fileData]) => ({
      id: fileId,
      name: fileData.name || fileId,
      text: fileData.content || '',
      textFormat: fileData.format || {
        font: 'Arial',
        size: '16px',
        color: 'black',
        bold: false,
        italic: false,
        underline: false,
        align: 'left'
      }
    }));
  }

  static loadFileContent(username, fileId) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const file = users[username]?.files?.[fileId];

    if (!file) return null;

    return {
      id: fileId,
      name: file.name || fileId,
      text: file.content || '',
      textFormat: file.format || {
        font: 'Arial',
        size: '16px',
        color: 'black',
        bold: false,
        italic: false,
        underline: false,
        align: 'left'
      }
    };
  }

  static saveFileContent(username, fileId, fileData) {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[username]) {
      users[username] = { files: {} };
    }

    users[username].files[fileId] = {
      name: fileData.name,
      content: fileData.text,
      format: fileData.textFormat
    };

    localStorage.setItem('users', JSON.stringify(users));
  }

  static createNewFile(username, fileName) {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[username]) {
      users[username] = { files: {} };
    }

    // בודקים אם קיים קובץ עם אותו שם
    if (users[username].files[fileName]) {
      throw new Error('A file with this name already exists.');
    }

     // אם לא קיים - יוצרים
  users[username].files[fileName] = {
    name: fileName,
    content: '',
    format: {
      font: 'Arial',
      size: '16px',
      color: 'black',
      bold: false,
      italic: false,
      underline: false,
      align: 'left'
    }
  };

  localStorage.setItem('users', JSON.stringify(users));
  }
}

export default FileManager;
