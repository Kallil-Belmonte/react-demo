/**
 * limitWords
 * @param { string } value
 * @param { string } numberOfWords
 */

const limitWords = (text, numberOfWords) => {
  if (text.split(' ').length > numberOfWords) {
    return text.split(' ').splice(0, numberOfWords).join(' ') + '...';
  }

  return text;
};

export default limitWords;
