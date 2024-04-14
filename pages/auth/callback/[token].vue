<template>
  <div>....</div>
</template>
<script setup lang="ts">
const { setTokenAndAuthMe } = useAuth();
const { params } = useRoute();

onMounted(async () => {
  await setTokenAndAuthMe(params.token as string);
  navigateTo('/');
});
</script>
