import type { IPostPublicQuickPrayer } from '~/types/post/public';

export const getPostsService = (payload: any) => {
  return useApi().get('/api/v1/pub/posts', payload);
};

export const postPublicQuickPrayerService = (
  payload: IPostPublicQuickPrayer
) => {
  return useApi().post('/api/v1/pub/post', payload);
};
