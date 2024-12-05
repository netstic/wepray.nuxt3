import type { AxiosResponse } from 'axios';
import type { ILayoutSessionHeaderProgress } from '~/components/layout/session/Header.vue';
import {
  getGuestQuickSessionService,
  updateGuestPostPrayedService,
} from '~/services/post/guest';
import { getPostCommentsService } from '~/services/post/post';
import type { ISession, ISessionItem } from '~/types/session';

export const useSessionStore = defineStore({
  id: 'session-store',
  state: (): ISession => ({
    prayedMessages: [
      'God bless you!',
      'May peace be with you!',
      'Wishing you joy and blessings!',
      'Stay blessed!',
    ],
    currentCardIndex: 0,
    currentProgress: 0,
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
    randomPrayedMessage(): string {
      return this.currentCard?.isPrayed
        ? this.prayedMessages[
            Math.floor(Math.random() * this.prayedMessages.length)
          ]
        : '';
    },
    isLastCard(): boolean {
      return this.currentProgress >= this.lists.length;
    },
  },
  actions: {
    initSession() {
      if (this.isUserOrGuestLoggedIn == 'guest') {
        const resp = getGuestQuickSessionService()
          .then(({ data }) => {
            this.lists = data.posts;
          })
          .finally(() => (this.isLoading = false));

        return resp;
      }
    },

    nextCard() {
      if (this.isLastCard) return;
      this.currentCardIndex! += 1;
    },

    pray() {
      if (!this.currentCard) return Promise.resolve();

      let resp: Promise<void | AxiosResponse<any, any>> = Promise.resolve();

      if (this.isUserOrGuestLoggedIn == 'guest') {
        resp = updateGuestPostPrayedService(this.currentCard?.id!);
      } else if (this.isUserOrGuestLoggedIn == 'user') {
        // resp = updatePostPrayedService(this.currentCard?.id!);
      }

      resp.then(() => {
        this.incrementCurrentProgress();
        this.incrementCardPrayedCount();
      });

      return resp;
    },

    incrementCurrentProgress() {
      if (this.currentProgress >= this.lists.length) return;
      this.currentProgress += 1;
    },

    incrementCardPrayedCount() {
      this.lists[this.currentCardIndex!].prayedCount += 1;
      this.lists[this.currentCardIndex!].isPrayed = true;
    },

    showCurrentCardComments() {
      if (this.currentCard?.commentCount && !this.currentCard?.comments) {
        const resp = getPostCommentsService(this.currentCard?.id).then(
          ({ data: { data } }) => {
            if (this.currentCard) {
              this.currentCard.comments = data;
            }
          }
        );
        return resp;
      }

      return Promise.resolve();
    },
  },
});
