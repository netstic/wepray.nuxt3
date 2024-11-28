import type { ILayoutSessionHeaderProgress } from '~/components/layout/session/Header.vue';

export const useSessionStore = defineStore({
  id: 'session-store',
  state: () => ({
    session: {
      currentProgress: 0,
      lists: [
        {
          id: 1,
          lista: {
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
          lista: {
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
          lista: {
            id: 1,
            title: 'Weekly Prayer',
          },
          avatar: '/favicon.ico',
          title: 'Prayer for Peace',
          content:
            'Praying for peace in conflict-ridden areas around the world.',
          notes: [],
          comments: [],
          prayedCount: 234,
        },
        {
          id: 1,
          lista: {
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
          lista: {
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
          lista: {
            id: 2,
            title: 'Community Prayers',
          },
          avatar: '/favicon.ico',
          title: 'Prayer for Peace',
          content:
            'Praying for peace in conflict-ridden areas around the world.',
          notes: [],
          comments: [],
          prayedCount: 234,
        },
      ],
    },
  }),
  getters: {
    progress(state): ILayoutSessionHeaderProgress {
      return {
        current: state.session.currentProgress,
        total: state.session.lists.length,
      };
    },
  },
  actions: {
    incrementCurrentProgress() {
      if (this.session.currentProgress >= 50) return;
      this.session.currentProgress += 1;
    },
    decrementCurrentProgress() {
      if (this.session.currentProgress <= 1) return;
      this.session.currentProgress -= 1;
    },
  },
});
