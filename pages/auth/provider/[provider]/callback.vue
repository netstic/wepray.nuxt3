<template>
  <div>
    <h1>Autenticando....</h1>
  </div>
</template>
<script setup lang="ts">
import { validAuthProviders, type TAuthProvider } from '~/types/user/auth';

const { query, params } = useRoute();
const { callbackAuth } = useAuth();

onMounted(() => {
  const provider = params.provider as TAuthProvider;

  if (!validAuthProviders.includes(provider)) {
    console.error(`Invalid auth provider: ${provider}`);
    window.close();
    return;
  }

  callbackAuth(provider, query)
    .then(({ data }) => {
      window.opener.postMessage(
        { responseToken: data.authorisation.token },
        window.location.origin
      );
      window.close();
    })
    .catch((error) => {
      console.error('Auth callback failed:', error);
      window.close();
    });
});
</script>
