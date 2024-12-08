import type { ISessionGuestRegister } from '~/types/session';
import type { IGuest } from '~/types/user/login';

export const updateGuestWelcomeService = (payload: IGuest) => {
  return useApi().put('/api/v1/guest/welcome', payload);
};

export const updateGuestTodayService = () => {
  return useApi().put('/api/v1/guest/today-session');
};

export const guestBecomeUserService = (payload: ISessionGuestRegister) => {
  return useApi().post('/api/v1/guest/become-user', payload);
};
