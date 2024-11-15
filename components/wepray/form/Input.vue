<template>
  <div>
    <template v-if="props.label">
      <label :for="inputId" class="wp-input-label">{{ props.label }}</label>
    </template>
    <input
      :id="inputId"
      v-model="model"
      :type="props.type"
      :required="props.required"
      class="wp-input-sm"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useInputId } from '~/composables/useInputId';

const props = withDefaults(
  defineProps<{
    label?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: 'text',
  }
);

const model = defineModel();

const inputId = useInputId(props.label);
</script>

<style scoped></style>
