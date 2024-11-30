<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :class="$attrs.class ?? 'wp-btn'"
  >
    <template v-if="props.loading">
      <LoaderButtonSubmit />
    </template>
    <template v-else>
      <template v-if="props.text"> {{ props.text }} </template>
      <slot v-else></slot>
    </template>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string;
    type?: 'submit' | 'button';
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: 'button',
  }
);
</script>

<style scoped></style>
