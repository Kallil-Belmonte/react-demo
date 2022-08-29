/**
 * @name firstLetterToUpperCase
 * @description Convert the first letter to uppercase.
 */

const firstLetterToUpperCase = (text: string | null) =>
  text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : text;

export default firstLetterToUpperCase;
