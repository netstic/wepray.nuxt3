<template>
  <div class="layout-public-content-wrapper mx-auto bg-base-100">
    <div v-if="!user" class="card-body gap-4 max-w-3xl mx-auto">
      <h2
        class="w-full text-3xl font-semibold text-gray-800 md:text-4xl aos-init aos-animate"
      >
        {{ $t('Login') }}
      </h2>

      <form
        @submit.prevent="onSubmit"
        class="mt-4 form-control flex flex-col gap-4"
      >
        <WeprayFormInput v-model="row.email" :placeholder="$t('E-mail')">
          <template #prepend>
            <IconEmail size="sm" />
          </template>
        </WeprayFormInput>

        <WeprayFormInput
          v-model="row.password"
          :type="isShowPassword ? 'text' : 'password'"
          :placeholder="$t('Password')"
          class="col-span-6"
        >
          <template #prepend>
            <IconKey size="sm" />
          </template>
          <template #append>
            <button type="button" @click="isShowPassword = !isShowPassword">
              <IconEyeOutline v-if="!isShowPassword" />
              <IconEyeSlashOutline v-else />
            </button>
          </template>
        </WeprayFormInput>

        <label class="flex items-center cursor-pointer gap-2">
          <input
            v-model="row.remember"
            type="checkbox"
            class="checkbox checkbox-sm"
          />
          <span class="text-sm text-gray-600">{{ $t('Remember Me') }}</span>
        </label>

        <nuxt-link
          class="underline text-sm text-gray-600 hover:text-gray-900"
          to="/auth/forgot-password"
        >
          {{ $t('Forgot your password?') }}
        </nuxt-link>

        <button class="btn btn-primary mt-4">
          {{ $t('Ok') }}
        </button>

        <div class="flex gap-4 items-center mt-6">
          <span class="font-semibold text-gray-600 md:text-lg"
            >Ou se preferir</span
          >
          <button class="btn btn-neutral-content flex-1">
            <IconGoogle />
            <span class="text-lg"> Entre com Google </span>
          </button>
        </div>
      </form>
    </div>

    <div v-else class="mx-auto mt-40 text-center gap-4 flex flex-col">
      <div class="text-gray-700 text-lg">
        Olá {{ user.username }}, parece que você já está logado...
      </div>
      <div class="flex gap-4 items-center justify-center">
        <button class="btn btn-neutral-content" @click="navigateTo('/')">
          <IconHomeOutline size="sm" /> Voltar para página inicial
        </button>

        <button class="btn btn-error" @click="logout">
          <IconLogout size="sm" /> Sair
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ILogin } from '~/types/user/login';

useHead({
  title: 'Login - WePray',
});

const { login, user, logout } = useAuth();

const row = ref<ILogin>({
  email: '',
  password: '',
  remember: false,
});

const isShowPassword = ref(false);

const onSubmit = async () => {
  login(row.value)
    .then(() => {})
    .catch((err) => useHandleError(err));
  // createUserService(row.value)
  //   .then(() => {})
  //   .catch((err) => useHandleError(err));

  // try {
  //   await nuxtApp.$auth.loginWith('laravelSanctum', {
  //     data: row,
  //   });

  //   const layout = nuxtApp.$store.state.auth.loggedIn ? 'private' : 'public';
  //   nuxtApp.setLayout(layout);
  // } catch (err: any) {
  //   errors.value = useHandleError(err);
  // }
};
</script>
