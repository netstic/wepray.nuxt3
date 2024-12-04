export const getGuestQuickSessionService = () => {
  return useApi().get('/api/v1/guest/session/quick');
};

export const updateGuestPostPrayedService = (postId: number) => {
  return useApi().post(`/api/v1/guest/post/${postId}/pray`);
};
