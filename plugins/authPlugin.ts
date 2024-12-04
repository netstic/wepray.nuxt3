export default defineNuxtPlugin(async () => {
  const {
    token,
    user,
    getAuthMe,
    guest,
    guestToken,
    getGuestAuthMe,
    refreshGuestToken,
  } = useAuth();

  if (token.value != null && user.value == null) {
    await getAuthMe();
  } else if (guestToken.value != null && guest.value == null) {
    await getGuestAuthMe().catch(async (err) => {
      if (err?.response?.status == 401) {
        await refreshGuestToken();
        await getGuestAuthMe({
          Authorization: `Bearer ${guestToken.value}`,
        });
      }
    });
  }
});
