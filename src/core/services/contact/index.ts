import type { FavoriteColor } from './types';

export const getFavoriteColors = async (): Promise<FavoriteColor[]> => [
  {
    value: 'red',
    text: 'Red',
  },
  {
    value: 'green',
    text: 'Green',
  },
  {
    value: 'blue',
    text: 'Blue',
  },
];
