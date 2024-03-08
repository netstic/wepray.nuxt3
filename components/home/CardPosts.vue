<template>
  <div>
    <div class="flex flex-col gap-4">
      <CardPost
        class="absolute ease-in-out duration-300"
        v-for="(item, index) in posts"
        :key="index"
        :item="item"
        :class="{
          'z-10': isAtivo(index),
          'z-0': !isAtivo(index),
          'mt-0': isAtivo(index),
          'mt-4 ml-4': !isAtivo(index),
        }"
      >
        <template #nav>
          <div class="join">
            <button
              class="join-item btn"
              @click="btnPrevious"
              :disabled="!isPrevious"
            >
              «
            </button>
            <!-- <button class="join-item btn">Page 22</button> -->
            <button class="join-item btn" @click="btnNext" :disabled="!isNext">
              »
            </button>
          </div>
        </template>
      </CardPost>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IPostResponse } from '~/types/post/public';
import CardPost from './CardPost.vue';

const { data, pending, error } = useFetch<IPostResponse>(
  'https://euoro.wepray.org/api-local/api/v1/pub/post/thelast5posts?sort=NEW'
);
const indexItem = ref(0);
const currentIndex = ref(0);

const totalPosts = computed(() => {
  return data.value?.data.length ?? 0;
});

const posts = computed(() => {
  try {
    return (data.value?.data ?? [])
      .slice(currentIndex.value, currentIndex.value + 2)
      .reverse();
  } catch (error) {
    // currentIndex.value = 0;
    // indexItem.value = 0;
  }
});

// methods: {
//   btnNext() {
//     this.currentIndex++;
//   },
//   btnPrevious() {
//     this.currentIndex--;
//   },
// },

const isAtivo = (index: number) => {
  return indexItem.value === index;
};

const isNext = computed(() => {
  return currentIndex.value < totalPosts.value - 1;
});

const isPrevious = computed(() => {
  return currentIndex.value > 0;
});

const btnNext = () => {
  if (isNext.value) {
    currentIndex.value++;
    indexItem.value = currentIndex.value % 2 ? 1 : 0;
    console.log('currentIndex.value', currentIndex.value);
    console.log('indexItem.value', indexItem.value);
  }
};

const btnPrevious = () => {
  if (isPrevious.value) {
    currentIndex.value--;
    indexItem.value = currentIndex.value % 2 ? 1 : 0;
  } else {
    indexItem.value = 0;
    currentIndex.value = 0;
  }
};
</script>
