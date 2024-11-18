<template>
  <footer
    class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
  >
    <div
      class="app-layout-width mx-auto app-layout-padding h-20 flex items-center justify-between"
    >
      <div>
        <slot name="prepend"> </slot>
      </div>
      <div>
        <slot name="append"> </slot>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
