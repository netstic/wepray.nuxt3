export default defineNuxtPlugin(async () => {
  const { token, user, getAuthMe, guest, guestToken, getGuestAuthMe } =
    useAuth();

  if (token.value != null && user.value == null) {
    await getAuthMe();
  } else if (guestToken.value != null && guest.value == null) {
    await getGuestAuthMe();
  }
});
