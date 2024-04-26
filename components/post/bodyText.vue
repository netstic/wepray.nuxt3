<template>
  <div
    class="py-8 overflow-hidden text-wrap flex items-center"
    :class="[textSize]"
  >
    {{ text }}
  </div>
</template>
<script setup lang="ts">
import { type IPost } from '~/types/post/post';

interface IProps {
  item: IPost;
}

const props = defineProps<IProps>();

const text = computed(() => {
  return props.item?.text?.body ?? '';
});

const textSize = computed(() => {
  const size = text.value.trim().length;
  switch (true) {
    case size < 100:
      return 'text-4xl';
    case size < 200:
      return 'text-3xl';
    case size < 300:
      return 'text-2xl';
    case size < 400:
      return 'text-xl';
    default:
      return 'text-base';
  }
});
</script>
