/**
 * @function formatters
 */

export const removeAccent = (text: string) =>
  typeof text === 'string' ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : text;
