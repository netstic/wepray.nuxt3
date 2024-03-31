export default defineNuxtRouteMiddleware(async () => {
  const { token, user } = useAuth();
  if (token.value == null && user.value == null) {
    return navigateTo({ name: 'login' });
  }
});
