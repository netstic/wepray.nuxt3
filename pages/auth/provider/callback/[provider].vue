<template>
  <div>
    <h1>Authenticating....</h1>
  </div>
</template>
<script setup lang="ts">
import { validAuthProviders, type TAuthProvider } from '~/types/user/auth';

const { query, params } = useRoute();
const { callbackAuth } = useAuth();

const { t } = useI18n();

onMounted(() => {
  const provider = params.provider as TAuthProvider;

  if (!validAuthProviders.includes(provider)) {
    throw createError({
      statusCode: 422,
      message: `${t('Invalid auth provider')}: ${provider}`,
    });
  }

  callbackAuth(provider, query)
    .then(({ data }) => {
      window.opener.postMessage(
        { responseToken: data.authorization.token, provider },
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
