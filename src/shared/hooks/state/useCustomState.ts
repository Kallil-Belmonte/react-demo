import { useState, useCallback } from 'react';

/**
 * @name useCustomState
 * @description Hook for state management.
 */

type TUseCustomState<Type> = [Type, (modifiedProps: Partial<Type>) => void];

const useCustomState = <Type>(initialState: Type): TUseCustomState<Type> => {
  const [customState, setCustomState] = useState<Type>(initialState);

  const handleSetCustomState = useCallback((modifiedProps: Partial<Type>) => {
    setCustomState(prevState => ({ ...prevState, ...modifiedProps }));
  }, []);

  return [customState, handleSetCustomState];
};

export default useCustomState;
