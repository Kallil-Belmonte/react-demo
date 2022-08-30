import { MOCKY_URL } from '@/core/services/_files/endpoints';
import request from '@/core/services/_files/request';
import { FavoriteColors } from './types';

export const getFavoriteColors = async (): Promise<FavoriteColors[]> =>
  request(() => fetch(`${MOCKY_URL}/7003ac49-c6e9-4207-9e1f-994526ff649e`));
