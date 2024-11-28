<template>
  <div v-if="!progress" class="wp-loader-navigation">
    <LoaderNavigation />
  </div>
  <div v-else id="session-layout">
    <LayoutSessionHeader :progress="progress" @back="openCloseDialog" />
    <LayoutSessionMain>
      <slot></slot>
    </LayoutSessionMain>

    <LayoutSessionCloseDialog ref="closeDialogRef" />
  </div>
</template>

<script setup lang="ts">
import type { LayoutSessionCloseDialog } from '#build/components';
import { useSessionStore } from '~/store/session.store';

// const { sessionCookie, setSessionCookie, progress } = useSession();
const sessionStore = useSessionStore();
const { progress } = storeToRefs(sessionStore);

const hasWindowHistory = ref(false);

const closeDialogRef = ref<InstanceType<typeof LayoutSessionCloseDialog>>();

const openCloseDialog = () => {
  closeDialogRef.value?.openDialog();
};

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
