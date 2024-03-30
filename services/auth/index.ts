import { useApi } from '~/composables/useFetch';
import type { IUser } from '~/types/user/login';

export const authUserMe = async () => {
  return useApi().get<IUser>('/api/user');
};
