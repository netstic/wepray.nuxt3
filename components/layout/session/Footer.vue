<template>
  <footer
    class="sm:bg-white sm:dark:bg-gray-900 sm:border-t sm:border-gray-200 sm:dark:border-gray-700"
  >
    <div
      class="app-layout-width mx-auto app-layout-padding h-20 sm:h-28 flex items-center justify-between"
    >
      <slot v-if="!$slots.prepend && !$slots.append"></slot>
      <template v-else>
        <div>
          <slot name="prepend"> </slot>
        </div>
        <div>
          <slot name="append"> </slot>
        </div>
      </template>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
