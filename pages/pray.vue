<template>
  <div>
    <h1>Pray</h1>
    <p class="text-black">{{ userName }}</p>
    <button @click="onLogout">Logout</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: (from) => {
    // const {isGuestLoggedIn} = useAuth();
    // const guestToken = useCookie('guest_token');
    // const token = useCookie('token');
    // if (!guestToken.value || !token.value || !guestToken.value?.daily) {
    //   return navigateTo({ path: '/welcome', query: { step: 'daily_goal' } });
    // }
  },
});

const { userName, logout } = useAuth();

const onLogout = () => {
  logout().finally(() => {
    navigateTo('/login');
  });
};
</script>

<style scoped></style>
