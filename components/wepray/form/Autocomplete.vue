<template>
  <div ref="autocompleteRef">
    <template v-if="props.label">
      <label :for="inputId" class="wp-input-label">{{ props.label }}</label>
    </template>
    <div class="relative">
      <input
        :id="inputId"
        v-model="searchQuery"
        type="text"
        :class="props.selectClass ?? 'wp-input-sm'"
        :placeholder="props.placeholder"
        :required="props.required"
        :disabled="props.disabled"
        @focus="showOptions = true"
        @input="onInput"
      />

      <!-- Dropdown menu -->
      <div
        v-show="showOptions && filteredOptions.length > 0"
        class="absolute z-[999] w-full mt-1 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
      >
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>

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
const inputId = useInputId(props.label);
const autocompleteRef = ref();

const searchQuery = ref('');
const showOptions = ref(false);

// When component mounts or when model value changes, set initial search query
watch(
  model,
  (newValue) => {
    if (newValue) {
      const selectedOption = props.options.find(
        (opt) => opt.value === newValue
      );
      if (selectedOption) {
        searchQuery.value = selectedOption.label;
      }
    }
  },
  { immediate: true }
);

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;

  return props.options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectOption = (option: SelectOption) => {
  model.value = option.value;
  searchQuery.value = option.label;
  showOptions.value = false;
};

const onInput = () => {
  showOptions.value = true;
  // If user clears the input, clear the model value
  if (!searchQuery.value) {
    model.value = null;
  }
};

// Close dropdown when clicking outside
onClickOutside(autocompleteRef, () => {
  showOptions.value = false;
  // If no option is selected, reset the search query
  if (!model.value) {
    searchQuery.value = '';
  } else {
    // Restore the label of the selected option
    const selectedOption = props.options.find(
      (opt) => opt.value === model.value
    );
    if (selectedOption) {
      searchQuery.value = selectedOption.label;
    }
  }
});
</script>
