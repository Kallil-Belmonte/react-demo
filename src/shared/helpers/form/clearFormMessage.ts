import { removeItemsFromArray } from '@/shared/helpers';

/**
 * @name clearFormMessage
 */

const clearFormMessage = (field: string, index: number, state: any, setState: any) => {
  setState({
    serverErrors: {
      ...state.serverErrors,
      [field]: removeItemsFromArray(state.serverErrors[field], [index], true),
    },
  });
};

export default clearFormMessage;
