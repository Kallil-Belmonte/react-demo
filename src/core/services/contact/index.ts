import request from '@/core/services/_files/request';
import type { FavoriteColors } from './types';

export const getFavoriteColors = (): Promise<FavoriteColors[]> =>
  request(`36696cfd-1deb-44f6-b2e7-419350d89232`);
