<template>
  <LayoutSessionMainContent title="Prayer Session" class="app-layout-width">
    <RouterView />
    <button
      class="wp-btn-session-item-lg"
      @click="navigateTo('/session/suggestions')"
    >
      Prayers of the Week
    </button>

    <div class="flex flex-col sm:grid sm:grid-cols-2 gap-4">
      <button class="wp-btn-session-item">Community Prayers</button>
      <button class="wp-btn-session-item">World Missions</button>
      <button class="wp-btn-session-item">Family Intercessory</button>
      <button class="wp-btn-session-item">Friends Intercessory</button>
    </div>
  </LayoutSessionMainContent>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'session',
  colorMode: 'dark',
  middleware: 'session',
});
</script>
