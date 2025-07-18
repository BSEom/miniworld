// src/utils/theme.js
export const getThemeClass2 = (mood) => {
  switch (mood) {
    case '😊':
    case '😄':
    case '😆':
    case '🥰':
    case '🤗':
      console.log(mood)
      return 'theme-happy';
    case '😎':
       console.log("paly")
      return 'theme-play';
    case '😴':
      return 'theme-sleepy';
    case '😵‍💫':
    case '😢':
    case '🥹':
      return 'theme-sad';
    case '😡':
      return 'theme-angry';
    default:
       console.log(mood)
      return 'theme-happy';
  }
};
