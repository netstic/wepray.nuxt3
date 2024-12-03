import type { IGuest } from '~/types/user/login';

export const updateGuestWelcomeService = (payload: IGuest) => {
  return useApi().put('/api/v1/guest/welcome', payload);
};

export const updateGuestTodayService = () => {
  return useApi().put('/api/v1/guest/today-session');
};
