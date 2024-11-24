<template>
  <div>
    <template v-if="props.label">
      <label :for="textareaId" class="wp-input-label">{{ props.label }}</label>
    </template>
    <div class="relative">
      <textarea
        :id="textareaId"
        v-model="model"
        :required="props.required"
        :class="props.textareaClass ?? 'wp-input-textarea-sm'"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :rows="props.rows"
        @input="autoGrow"
      ></textarea>
      <template v-if="$slots.append">
        <div
          class="absolute right-0 inset-y-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
        >
          <slot name="append" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInputId } from '~/composables/useInputId';

const props = withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    textareaClass?: string;
    rows?: number | string;
    autoGrow?: boolean;
  }>(),
  {
    rows: 4,
    autoGrow: true,
  }
);

const model = defineModel<string>();

const textareaId = useInputId(props.label);

const autoGrow = (event: Event) => {
  if (!props.autoGrow) return;
  const target = event.target as HTMLTextAreaElement;
  target.style.height = 'auto';
  target.style.height = target.scrollHeight + 'px';
};
</script>

<style scoped></style>
