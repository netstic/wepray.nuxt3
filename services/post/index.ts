export const getServicePosts = async (payload: any) => {
  return useApi().post('/api/v1/pub/post', payload);
};
