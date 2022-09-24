import { FavoriteColors } from '@/core/services/contact/types';

export type ContactFormState = {
  isLoading: boolean;
  isFormSubmitted: boolean;
  favoriteColors: FavoriteColors[];
  successMessages: string[];
};
