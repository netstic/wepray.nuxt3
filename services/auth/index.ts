import { useApi } from '~/composables/useFetch';
import type { IGuest, IUser } from '~/types/user/login';

export const authUserMe = () => {
  return useApi().get<IUser>('/api/user');
};

export const authGuestMe = () => {
  return useApi().get<IGuest>('/api/v1/guest/me');
};
