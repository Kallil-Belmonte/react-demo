import { FavoriteColors } from '@/core/services/contact/types';

export type ContactFormState = {
  isLoading: boolean;
  favoriteColors: FavoriteColors[];
  successMessages: string[];
};
