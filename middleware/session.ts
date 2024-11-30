export default defineNuxtRouteMiddleware(async () => {
  if (!useCookie('welcome').value) {
    return navigateTo('/');
  }
});
