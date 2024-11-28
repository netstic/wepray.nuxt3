export const useSessionStore = defineStore({
  id: 'session-store',
  state: () => ({
    session: {
      count: 5,
      progress: 0,
      lists: [
        {
          id: 1,
          title: 'Weekly Prayer',
          items: [
            {
              id: 1,
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
        {
          id: 2,
          title: 'Community Prayers',
          items: [
            {
              id: 1,
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
      ],
    },
  }),
  getters: {
    progress(state) {
      const findSessionItem = state.session.find(
        (item) => item.id === state.currentSessionItemId
      );
      return findSessionItem
        ? {
            barWidth: (findSessionItem.count! / findSessionItem.progress) * 100,
            todayGoalCount: findSessionItem.count ?? 0,
            dailyGoalCount: findSessionItem.progress,
          }
        : {
            barWidth: 0,
            todayGoalCount: 0,
            dailyGoalCount: 0,
          };
    },
  },
  actions: {
    incrementSessionCount(index: number) {
      if (
        this.session[index].count === undefined ||
        this.session[index].count >= 50
      )
        return;
      this.session[index].count += 1;
    },
    decrementSessionCount(index: number) {
      if (
        this.session[index].count === undefined ||
        this.session[index].count <= 1
      )
        return;
      this.session[index].count -= 1;
    },
  },
});
