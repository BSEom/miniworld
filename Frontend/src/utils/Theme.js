// src/utils/theme.js
export const getThemeClass = (mood) => {
  switch (mood) {
    case '😊':
    case '😄':
    case '😆':
    case '🥰':
    case '🤗':
      return 'theme-happy';
    case '😎':
      return 'theme-play';
    case '😴':
      return 'theme-sleepy';
    case '😵‍💫':
    case '😢':
    case '🥹':
      return 'theme-sad';
    case '😡':
      return 'theme-angry';
  }
};
