// CAPITALIZE FIRST LETTER
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


// LIMIT WORDS
export const limitWords = (text, numberOfWords) => {
  if (text.split(' ').length > numberOfWords) {
    return text.split(' ').splice(0, numberOfWords).join(' ') + '...';
  }

  return text;
};
