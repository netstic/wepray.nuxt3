<template>
  <WeprayDialog
    no-close-button
    max-width="350px"
    v-model="isDialogOpen"
    class="p-4"
  >
    <div class="flex flex-col gap-8 mt-6 text-center px-2 py-1">
      <p class="px-2 text-xl font-bold">
        {{ $t('Wait! If you leave now, your progress will be lost') }}
      </p>
      <div class="flex flex-col gap-1">
        <WeprayButton class="wp-btn wp-btn-blue-light" @click="closeDialog">
          {{ $t('Keep Praying') }}
        </WeprayButton>
        <WeprayButton
          @click="endSession"
          class="wp-btn-plain wp-btn text-red-500"
        >
          {{ $t('End Session') }}
        </WeprayButton>
      </div>
    </div>
  </WeprayDialog>
</template>

<script setup lang="ts">
import { useSessionStore } from '~/store/session.store';

const isDialogOpen = ref(false);

const endSession = () => {
  useSessionStore().reset();
  navigateTo('/pray');
};

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

defineExpose({
  openDialog,
  closeDialog,
});
</script>
