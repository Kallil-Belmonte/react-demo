import { reactive, computed } from 'vue';

import { LoginUser } from '@/core/services/auth/types';

type User = Pick<LoginUser, 'firstName' | 'lastName' | 'email'>;

type State = {
  user: User;
};

const state = reactive<State>({
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
});

const user = computed(() => state.user);
const fullName = computed(() => `${state.user.firstName} ${state.user.lastName}`);

const setUser = (payload: User) => {
  state.user = payload;
};

const resetUser = () => {
  state.user = {
    firstName: '',
    lastName: '',
    email: '',
  };
};

export { user, fullName, setUser, resetUser };
