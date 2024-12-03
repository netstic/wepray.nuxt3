export default defineNuxtRouteMiddleware(() => {
  const { guestToken, token } = useAuth();
  if (!guestToken.value) {
    return navigateTo('/welcome');
  }

  if (!token.value && !guestToken.value) {
    return navigateTo('/');
  }
});
