import type { CookieRef } from '#app';

export const useSession = () => {
  const welcomeCookie: CookieRef<any> = useCookie('welcome');
  const sessionCookie: CookieRef<any> = useCookie('session');

  const setWelcomeCookie = (value: any) => {
    useCookie('welcome').value = value;
  };

  const setSessionCookie = (value: any) => {
    useCookie('session').value = value;
  };

  const dailyGoalCount = computed(() => welcomeCookie.value?.daily);
  const todayGoalCount = computed(() => sessionCookie.value?.prayerCount || 0);
  const progress = computed(() => {
    if (!dailyGoalCount.value && !todayGoalCount.value)
      return {
        barWidth: 0,
        todayGoalCount: 0,
        dailyGoalCount: 0,
      };
    return {
      barWidth: (todayGoalCount.value / dailyGoalCount.value) * 100,
      todayGoalCount: todayGoalCount.value,
      dailyGoalCount: dailyGoalCount.value,
    };
  });

  return {
    welcomeCookie,
    setWelcomeCookie,
    sessionCookie,
    setSessionCookie,
    dailyGoalCount,
    todayGoalCount,
    progress,
  };
};
