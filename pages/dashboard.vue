<template>
  <div class="px-1 py-8">
    <div class="flex flex-col gap-8">
      <Post
        v-for="n in 10"
        :item="{
          id: n,
          title: `Post ${n}`,
          body: `Post ${n} body`,
        }"
        :key="n"
      ></Post>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'private',
});
const { token, login, user } = useAuth();

const isShowImg = ref(false);
</script>
