import { useState, useCallback, useEffect } from 'react';

/**
 * @name useCustomState
 * @description Hook for state management.
 */


type TUseCustomState<Type> = [Type, (modifiedProps: Partial<Type>) => void];

const useCustomState = <Type>(initialState: Type): TUseCustomState<Type> => {
  const [mounted, setMounted] = useState(true);
  const [customState, setCustomState] = useState<Type>(initialState);

  const handleSetCustomState = useCallback(
    (modifiedProps: Partial<Type>) => {
      if (mounted) setCustomState((prevState) => ({ ...prevState, ...modifiedProps }));
    },
    [mounted],
  );

  // LIFECYCLE HOOKS
  useEffect(() => {
    // Unmount
    return () => {
      setMounted(false);
    };
  }, []);

  return [customState, handleSetCustomState];
};

export default useCustomState;
