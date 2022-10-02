import { FavoriteColors } from '@/core/services/contact/types';

export type ContactFormState = {
  loading: boolean;
  formSubmitted: boolean;
  favoriteColors: FavoriteColors[];
  successMessages: string[];
};
