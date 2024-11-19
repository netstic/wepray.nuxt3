<template>
  <div v-if="!progress" class="wp-loader-navigation">
    <LoaderNavigation />
  </div>
  <div
    v-else
    id="session-layout"
    class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <LayoutSessionHeader
      :progress="progress"
      @click="hasWindowHistory ? $router.go(-1) : navigateTo('/session')"
    />
    <LayoutSessionMain>
      <slot></slot>
    </LayoutSessionMain>
  </div>
</template>

<script setup lang="ts">
const { sessionCookie, setSessionCookie, progress } = useSession();

const hasWindowHistory = ref(false);

const today = new Date().toISOString().split('T')[0];
if (sessionCookie.value) {
  if (sessionCookie.value?.today !== today) {
    setSessionCookie({
      today,
      prayerCount: 0,
    });
  }
} else {
  setSessionCookie({
    today,
    prayerCount: 0,
  });
}

onMounted(() => {
  if (window.history.length > 1) {
    hasWindowHistory.value = true;
  }
});
</script>

<style scoped></style>
