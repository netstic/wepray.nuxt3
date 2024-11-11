import type { IRegisterForm } from '~/types/user/login';

export const checkEmailUserService = (email: string) => {
  return useApi().post('/api/v1/pub/user/check-email', { email });
};

export const createUserService = (payload: IRegisterForm) => {
  return useApi().post('/api/v1/pub/user/register', payload);
};
