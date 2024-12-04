<template>
  <div>
    <h1>Pray</h1>
    <p class="text-black">{{ userName }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'application',
  middleware: 'welcome',
});

const { userName, logout } = useAuth();
</script>

<style scoped></style>
