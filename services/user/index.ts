import type { IRegisterForm, IResetPasswordForm } from '~/types/user/login';

export const checkEmailUserService = (email: string) => {
  return useApi().post('/api/v1/pub/user/check-email', { email });
};

export const createUserService = (payload: IRegisterForm) => {
  return useApi().post('/api/v1/pub/user/register', payload);
};

export const forgotPasswordService = (payload: { email: string | null }) => {
  return useApi().post('/api/v1/pub/user/forgot-password', payload);
};

export const resetPasswordService = (payload: IResetPasswordForm) => {
  return useApi().post('/api/v1/pub/user/reset-password', payload);
};
