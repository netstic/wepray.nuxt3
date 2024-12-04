import type { IDataPost } from '~/types/post/post';

export const getServicePosts = async (payload: any) => {
  return useApi().get<IDataPost>('/api/v1/posts', { params: payload });
};

export const getUsersPrayedService = async (postId: number) => {
  return useApi().get(`/api/v1/post/${postId}/users-prayed`);
};
