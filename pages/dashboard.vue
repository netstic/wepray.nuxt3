<template>
  <div>main</div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'private',
});
const { token, login, user } = useAuth();

const isShowImg = ref(false);
</script>
