<template>
  <div>
    <h1>GitHub Callback</h1>
  </div>
</template>
<script setup lang="ts">
// get query params
const { query } = useRoute();
const { callbackAuth } = useAuth();
// const { query } = useRoute();
// console.log(query);

onMounted(() => {
  callbackAuth('github', query);
});
</script>
