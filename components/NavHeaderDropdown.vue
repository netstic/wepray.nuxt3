<template>
  <div
    class="hidden lg:block text-gray-700"
    :class="{ 'lg:hidden': props.showStartBtn }"
    @mouseenter="openMenu()"
    @mouseleave="delayedCloseMenu()"
  >
    <div
      tabindex="0"
      role="button"
      class="wp-btn wp-btn-plain group flex font-semibold text-sm wp-btn-ghost uppercase text-gray-400 relative"
      @mouseenter="openMenu()"
      @mouseleave="delayedCloseMenu()"
    >
      <template v-if="props.label">
        {{ props.label }}
      </template>
      <slot v-else></slot>
      <IconChevronDown />
      <ul
        tabindex="0"
        class="bg-white rounded-lg z-[1] w-52 p-2 shadow absolute text-gray-600 mt-9 normal-case"
        :class="{ hidden: !isMenuOpen }"
      >
        <li
          v-for="(item, index) in props.items"
          :key="index"
          class="wp-btn"
          @click="item.callback"
        >
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  showStartBtn: boolean;
  label?: string;
  items: {
    label: string;
    callback: () => void;
  }[];
}>();

const isMenuOpen = ref(false);
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

const openMenu = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
  isMenuOpen.value = true;
};

const delayedCloseMenu = () => {
  closeTimeout = setTimeout(() => {
    if (closeTimeout) {
      isMenuOpen.value = false;
    }
  }, 600);
};
</script>

<style scoped></style>
