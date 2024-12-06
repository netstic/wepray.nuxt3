<template>
  <WeprayDialog v-model="isOpen"> test </WeprayDialog>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const openDialog = () => {
  isOpen.value = true;
};

const closeDialog = () => {
  isOpen.value = false;
};

defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style scoped></style>
