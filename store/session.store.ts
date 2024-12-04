import type { ILayoutSessionHeaderProgress } from '~/components/layout/session/Header.vue';
import { getGuestQuickSessionService } from '~/services/post/guest';
import type { ISession, ISessionItem } from '~/types/session';

export const useSessionStore = defineStore({
  id: 'session-store',
  state: (): ISession => ({
    currentCardIndex: 0,
    currentProgress: 0,
    prayerCount: 0,
    isLoading: true,
    lists: [],
  }),
  getters: {
    isUserOrGuestLoggedIn(): 'guest' | 'user' | null {
      const { isGuestLoggedIn, isLoggedIn } = useAuth();
      return isLoggedIn.value ? 'user' : isGuestLoggedIn.value ? 'guest' : null;
    },
    currentCard(): ISessionItem | undefined | null {
      return this.lists[this.currentCardIndex];
    },
    progress(): ILayoutSessionHeaderProgress {
      return {
        current: this.currentProgress,
        total: this.lists.length,
      };
    },
    isLastCard(): boolean {
      return this.currentCardIndex! >= this.lists.length - 1;
    },
  },
  actions: {
    nextCard() {
      if (this.isLastCard) return;
      this.currentCardIndex! += 1;
    },
    incrementCurrentProgress() {
      if (this.currentProgress >= 50) return;
      this.currentProgress += 1;
      this.prayerCount += 1;
      this.incrementPrayedCount();
    },
    decrementCurrentProgress() {
      if (this.currentProgress <= 1) return;
      this.currentProgress -= 1;
      this.prayerCount -= 1;
    },
    incrementPrayedCount() {
      this.lists[this.currentCardIndex!].prayedCount += 1;
    },

    initSession() {
      if (this.isUserOrGuestLoggedIn == 'guest') {
        getGuestQuickSessionService().then(({ data }) => {
          this.lists = data.posts;
        });
      }
      this.isLoading = false;
    },
  },
});
