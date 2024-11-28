<template>
  <div v-if="!currentProgress" class="wp-loader-navigation">
    <LoaderNavigation />
  </div>
  <div v-else id="session-layout">
    <LayoutSessionHeader
      :progress="currentProgress"
      @click="hasWindowHistory ? $router.go(-1) : navigateTo('/session')"
    />
    <LayoutSessionMain>
      <slot></slot>
    </LayoutSessionMain>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '~/store/session.store';

// const { sessionCookie, setSessionCookie, progress } = useSession();
const sessionStore = useSessionStore();
const { currentProgress } = storeToRefs(sessionStore);

const hasWindowHistory = ref(false);

// const today = new Date().toISOString().split('T')[0];
// if (sessionCookie.value) {
//   if (sessionCookie.value?.today !== today) {
//     setSessionCookie({
//       today,
//       prayerCount: 0,
//     });
//   }
// } else {
//   setSessionCookie({
//     today,
//     prayerCount: 0,
//   });
// }

onMounted(() => {
  if (window.history.length > 1) {
    hasWindowHistory.value = true;
  }
});
</script>

<style scoped></style>
