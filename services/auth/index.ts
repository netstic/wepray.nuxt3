import { useApi } from '~/composables/useFetch';
import type { IResponse } from '~/types';
import type { IGuest, IUser } from '~/types/user/login';

export const authUserMe = () => {
  return useApi().get<IResponse<IUser>>('/api/user');
};

export const authGuestMe = (headers?: Record<string, string>) => {
  return useApi().get<IResponse<IGuest>>('/api/v1/guest/me', { headers });
};
