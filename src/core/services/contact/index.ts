import request from '@/core/services/_files/request';
import { FavoriteColors } from './types';

export const getFavoriteColors = (): Promise<FavoriteColors[]> =>
  request(`7003ac49-c6e9-4207-9e1f-994526ff649e`);
