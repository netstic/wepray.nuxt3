export const getGuestQuickSessionService = () => {
  return useApi().get('/api/v1/guest/session/quick');
};
