<template>
  <label
    class="input-bordered flex items-center gap-2"
    :class="[classInputSize, { input: !props.disabled }]"
  >
    <slot name="prepend" v-if="!props.disabled"></slot>
    <input
      v-model="model"
      :type="props.type ?? 'text'"
      class="grow"
      :class="{ input: props.disabled }"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
    <slot name="append"></slot>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  placeholder?: string | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'password' | 'text';
}>();

const model = defineModel();

const classInputSize = computed(() => ({
  'input-xs': props.size === 'xs',
  'input-sm': props.size === 'sm',
  'input-md': props.size === 'md',
  'input-lg': props.size === 'lg',
}));
</script>
