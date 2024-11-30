import type { CookieRef } from '#app';

export const useWelcomeSession = () => {
  const welcomeCookie: CookieRef<any> = useCookie('welcome');

  const setWelcomeCookie = (value: any) => {
    useCookie('welcome').value = value;
  };

  const updateTodayWelcomeCookie = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!welcomeCookie.value?.today || welcomeCookie.value?.today !== today) {
      welcomeCookie.value.today = today;
      welcomeCookie.value.prayerCount = 0;
    }
    setWelcomeCookie(welcomeCookie.value);
  };

  const incrementTodayPrayerCount = () => {
    if (!welcomeCookie.value.prayerCount) {
      welcomeCookie.value.prayerCount = 0;
    }
    welcomeCookie.value.prayerCount++;
    setWelcomeCookie(welcomeCookie.value);
  };

  return {
    welcomeCookie,
    setWelcomeCookie,
    updateTodayWelcomeCookie,
    incrementTodayPrayerCount,
  };
};
