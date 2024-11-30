import { ref } from 'vue';

const counters = ref(new Map<string, number>());

export function useInputId(prefix: string = 'input') {
  // Ensure prefix is a string and normalize it
  const safePrefix = String(prefix || 'input')
    .toLowerCase()
    .replace(/\s+/g, '-');

  // Get or initialize counter for this prefix
  const currentCount = counters.value.get(safePrefix) ?? 0;

  // Store the incremented count
  counters.value.set(safePrefix, currentCount + 1);

  // Return a stable ID
  return computed(() => `${safePrefix}-${currentCount}`);
}
