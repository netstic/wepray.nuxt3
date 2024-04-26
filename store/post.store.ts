import { getServicePosts } from '~/services/post/post';
import type { IPost } from '~/types/post/post';

export const usePostStore = defineStore({
  id: 'post-store',
  state: () => ({
    posts: [] as IPost[],
  }),
  actions: {
    fetchPosts(payload: any) {
      const response = getServicePosts(payload);
      response.then(({ data }) => {
        this.posts = data.data;
      });
      return response;
    },
  },
});
