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
    if (!(useCookie('welcome').value as any)?.daily) {
      return navigateTo({ path: '/welcome', query: { step: 'daily' } });
    }
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
