<template>
  <div>
    <h1>Google Callback</h1>
  </div>
</template>
<script setup lang="ts">
const { query } = useRoute();
const { callbackAuth } = useAuth();

onMounted(() => {
  callbackAuth('google', query).then(({ data }) => {
    window.opener.postMessage(
      { responseToken: data.authorisation.token },
      window.location.origin
    );
    window.close();
  });
});
</script>
