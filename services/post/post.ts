import type { IDataPost } from '~/types/post/post';

export const getServicePosts = async (payload: any) => {
  return useApi().get<IDataPost>('/api/v1/posts', { params: payload });
};
