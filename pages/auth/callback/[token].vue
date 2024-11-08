<template>
  <div>Autenticando...</div>
</template>
<script setup lang="ts">
const { setTokenAndAuthMe } = useAuth();
const { params } = useRoute();

onMounted(() => {
  const token = params.token as string;
  setTokenAndAuthMe(token);
  window.opener.postMessage({ token }, window.location.origin);
  window.close();
});
</script>
