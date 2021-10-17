import { FavoriteColors } from '@/core/services/contact/types';

export type FormState = {
  isLoading: boolean;
  favoriteColors: FavoriteColors[];
  successMessages: string[];
};
