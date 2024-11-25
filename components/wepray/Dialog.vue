<template>
  <div v-if="model" class="custom-dialog">
    <div class="rounded-lg bg-white pt-6 pb-4 px-4 relative">
      <div
        class="absolute bg-white rounded-full p-2 cursor-pointer -top-4 -right-4"
        @click="onClose"
      >
        <IconX class="text-gray-600" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ default: false });

const emit = defineEmits<{
  close: [value: void];
}>();

const onClose = () => {
  model.value = false;
  emit('close');
};
</script>

<style scoped>
.custom-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
