import type { ILayoutSessionHeaderProgress } from '~/components/layout/session/Header.vue';
import type { ISession, ISessionItem } from '~/types/session';

export const useSessionStore = defineStore({
  id: 'session-store',
  state: (): ISession => ({
    currentCardIndex: 0,
    currentProgress: 0,
    prayerCount: 0,
    isLoading: true,
    lists: [
      {
        id: 1,
        list: {
          id: 1,
          title: 'Weekly Prayer',
        },
        avatar: '/favicon.ico',
        title: "Jack O' Brien",
        content:
          'Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer.',
        notes: [],
        comments: [
          {
            id: 1,
            name: 'John Doe',
            avatar: '/favicon.ico',
            location: 'California, USA',
            content: "Praying for your mother's recovery.",
            reactions: {
              '👍': 2,
              '❤️': 1,
              '🙏': 3,
              '😊': 1,
              '🕯️': 1,
            },
            showReactions: false,
          },
          {
            id: 2,
            name: 'Jane Smith',
            avatar: '/favicon.ico',
            location: 'London, UK',
            content: 'Sending positive thoughts your way.',
            reactions: {},
            showReactions: false,
          },
        ],
        prayedCount: 156,
      },
      {
        id: 2,
        list: {
          id: 1,
          title: 'Weekly Prayer',
        },
        avatar: '/favicon.ico',
        title: 'Prayer for Guidance',
        content:
          "I'm facing a difficult decision in my career. Please pray for wisdom and clarity.",
        notes: [],
        comments: [],
        prayedCount: 89,
      },
      {
        id: 3,
        list: {
          id: 1,
          title: 'Weekly Prayer',
        },
        avatar: '/favicon.ico',
        title: 'Prayer for Peace',
        content: 'Praying for peace in conflict-ridden areas around the world.',
        notes: [],
        comments: [],
        prayedCount: 234,
      },
      {
        id: 1,
        list: {
          id: 2,
          title: 'Community Prayers',
        },
        avatar: '/favicon.ico',
        title: "Jack O' Brien",
        content:
          'Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer. Please pray for my mother who is battling cancer.',
        notes: [],
        comments: [
          {
            id: 1,
            name: 'John Doe',
            avatar: '/favicon.ico',
            location: 'California, USA',
            content: "Praying for your mother's recovery.",
            reactions: {},
            showReactions: false,
          },
          {
            id: 2,
            name: 'Jane Smith',
            avatar: '/favicon.ico',
            location: 'London, UK',
            content: 'Sending positive thoughts your way.',
            reactions: {},
            showReactions: false,
          },
        ],
        prayedCount: 156,
      },
      {
        id: 2,
        list: {
          id: 2,
          title: 'Community Prayers',
        },
        avatar: '/favicon.ico',
        title: 'Prayer for Guidance',
        content:
          "I'm facing a difficult decision in my career. Please pray for wisdom and clarity.",
        notes: [],
        comments: [],
        prayedCount: 89,
      },
      {
        id: 3,
        list: {
          id: 2,
          title: 'Community Prayers',
        },
        avatar: '/favicon.ico',
        title: 'Prayer for Peace',
        content: 'Praying for peace in conflict-ridden areas around the world.',
        notes: [],
        comments: [],
        prayedCount: 234,
      },
    ],
  }),
  getters: {
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
      if (this.isLastCard) return;
      this.lists[this.currentCardIndex!].prayedCount += 1;
    },

    initSession() {
      this.isLoading = false;
    },
  },
});
