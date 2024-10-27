import { type TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

import type { RootState } from '@/core/redux/store';

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default useSelector;
