<template>
  <div>
    <template v-if="props.label">
      <label :for="selectId" class="wp-input-label">{{ props.label }}</label>
    </template>
    <div class="relative">
      <select
        :id="selectId"
        v-model="model"
        :required="props.required"
        :class="props.selectClass ?? 'wp-input-sm'"
        :disabled="props.disabled"
      >
        <option v-if="props.placeholder" value="" disabled selected>
          {{ props.placeholder }}
        </option>
        <option
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
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

interface SelectOption {
  value: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    selectClass?: string;
  }>(),
  {
    options: () => [],
  }
);

const model = defineModel();

const selectId = useInputId(props.label);
</script>

<style scoped></style>
