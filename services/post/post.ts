import type { IDataPost } from '~/types/post/post';

export const getServicePosts = (payload: any) => {
  return useApi().get<IDataPost>('/api/v1/posts', { params: payload });
};

export const getUsersPrayedService = (postId: number) => {
  return useApi().get(`/api/v1/post/${postId}/users-prayed`);
};

export const getPostCommentsService = (postId: number) => {
  return useApi().get(`/api/v1/post/${postId}/comments`);
};

export const addPostCommentService = (postId: number, comment: string) => {
  return useApi().post(`/api/v1/post/${postId}/comment`, { comment });
};

export const getPostNotesService = (postId: number) => {
  return useApi().get(`/api/v1/post/${postId}/notes`);
};

export const updatePostPrayedService = (postId: number) => {
  return useApi().post(`/api/v1/post/${postId}/pray`);
};
