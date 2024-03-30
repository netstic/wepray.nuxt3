export default defineNuxtPlugin(async () => {
  const { token, user, getAuthMe } = useAuth();

  if (token.value != null && user.value == null) {
    await getAuthMe();
  }
});
