import { VueHooksFormField } from '@/shared/files/types';

/**
 * @name clearFormMessage
 */

const clearFormMessage = (errorMessages: string[], index: number) => {
  errorMessages.splice(index, 1);
};

export default clearFormMessage;
