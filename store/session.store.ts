import type { ILayoutSessionHeaderProgress } from '~/components/layout/session/Header.vue';

export const useSessionStore = defineStore({
  id: 'session-store',
  state: () => ({
    progress: {
      barWidth: 0,
      todayGoalCount: 0,
      dailyGoalCount: 0,
    } as ILayoutSessionHeaderProgress,
  }),
  actions: {
    setProgress(payload: ILayoutSessionHeaderProgress) {
      this.progress = payload;
    },
  },
});
