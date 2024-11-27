<template>
  <LayoutSessionHeader
    @click="hasWindowHistory ? $router.go(-1) : navigateTo('/session')"
  />
  <LayoutSessionMain>
    <LayoutSessionMainContent title="Prayer Session" class="app-layout-width">
      <div class="text-xl text-center font-semibold mb-2">
        <p>Let's pray together!</p>

        <p class="text-lg font-normal">Choose your path:</p>
      </div>

      <div class="flex flex-col gap-4 sm:grid sm:grid-cols-2">
        <button
          class="wp-btn-session-item text-2xl justify-center"
          @click.self="navigateTo('/session/suggestions')"
        >
          Weekly Prayer
        </button>
        <button
          class="wp-btn-session-item text-2xl justify-center"
          @click.self="navigateTo('/session/community')"
        >
          Community Prayers
        </button>
        <button class="wp-btn-session-item text-2xl justify-center">
          World Missions
        </button>
        <button class="wp-btn-session-item text-2xl justify-center">
          Family Intercessions
        </button>
        <button class="wp-btn-session-item text-2xl justify-center">
          Friends Intercessions
        </button>
      </div>
    </LayoutSessionMainContent>
  </LayoutSessionMain>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'session',
  colorMode: 'dark',
  middleware: 'session',
});

const hasWindowHistory = ref(false);

onMounted(() => {
  if (window.history.length > 1) {
    hasWindowHistory.value = true;
  }
});
</script>
