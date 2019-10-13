// CAPITALIZE FIRST LETTER
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


// CAPITALIZE TEXT
export const capitalizeText = (text) => {
  return text.toLowerCase().split(' ').map((word, index) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
};


// LIMIT WORDS
export const limitWords = (text, numberOfWords) => {
  return text.split(' ').splice(0, numberOfWords).join(' ');
}
