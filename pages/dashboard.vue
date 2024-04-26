<template>
  <div class="px-1 py-8">
    <div class="flex flex-col gap-8">
      <Post
        v-for="(item, index) in postStore.posts"
        :item="item"
        :key="index"
      ></Post>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePostStore } from '~/store/post.store';

definePageMeta({
  middleware: ['auth'],
  layout: 'private',
});

const { token, login, user } = useAuth();
const isShowImg = ref(false);

const postStore = usePostStore();

// onServerPrefetch(async () => {
//   await postStore.fetchPosts({});
// });
// await useAsyncData('user', async () => postStore.fetchPosts({}));
onMounted(() => {
  postStore.fetchPosts({});
});
</script>
