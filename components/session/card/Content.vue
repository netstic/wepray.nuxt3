<template>
  <div>
    <p
      class="text-gray-700 dark:text-gray-300"
      :class="{
        'line-clamp-4': !isReadMore && contentLengthCap,
      }"
    >
      {{ props.content }}
    </p>
    <p
      v-if="!isReadMore && contentLengthCap"
      class="text-blue-400 cursor-pointer text-end w-full"
      @click="isReadMore = true"
    >
      {{ $t('Read more') }}
    </p>
    <p
      v-else-if="isReadMore"
      class="text-blue-400 cursor-pointer text-end w-full"
      @click="isReadMore = false"
    >
      {{ $t('Show less') }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string;
  contentLength?: number;
}>();

const isReadMore = ref(false);
const contentLengthCap = computed(
  () => props.content?.split(' ').length > (props.contentLength || 62)
);
</script>

<style scoped></style>
