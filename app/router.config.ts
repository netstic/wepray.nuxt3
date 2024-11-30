import type { RouterConfig } from '@nuxt/schema';

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: 'welcome',
      path: '/welcome',
      component: () => import('~/pages/welcome.vue'),
    },
  ],
} satisfies RouterConfig;
