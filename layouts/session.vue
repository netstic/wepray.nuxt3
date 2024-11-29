<template>
  <div id="session-layout">
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

const sessionStore = useSessionStore();
const { progress } = storeToRefs(sessionStore);

const hasWindowHistory = ref(false);

const closeDialogRef = ref<InstanceType<typeof LayoutSessionCloseDialog>>();

const openCloseDialog = () => {
  closeDialogRef.value?.openDialog();
};

onMounted(() => {
  if (window.history.length > 1) {
    hasWindowHistory.value = true;
  }
});
</script>
