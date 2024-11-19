<template>
  <div class="w-full flex flex-col">
    <LayoutSessionMainTitle>
      <template v-if="props.title"> {{ props.title }} </template>
      <slot name="title" v-else></slot>
    </LayoutSessionMainTitle>

    <div class="flex flex-col gap-4 flex-1 app-layout-margin mt-20">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();
</script>

<style scoped></style>
