/**
 * @function formatters
 */

export const removeAccent = (text: string) =>
  // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
  typeof text === 'string' ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : text;
