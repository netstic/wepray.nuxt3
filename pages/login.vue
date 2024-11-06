<template>
  <div class="layout-public-content-wrapper mx-auto bg-base-100">
    <div class="card-body gap-4 max-w-3xl mx-auto">
      <div class="card-login">
        <div class="w-full">
          <h2
            class="w-full text-3xl font-semibold text-gray-800 md:text-4xl aos-init aos-animate"
          >
            {{ $t('Login') }}
          </h2>

          <div
            class="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
          >
            <!-- <form-input-error :errors="errors"></form-input-error> -->
            <!-- v-if="!this.$auth.loggedIn" -->
            <form @submit.prevent="onSubmit">
              <DaisyFormInput v-model="row.email" placeholder="E-mail">
                <template #prepend>
                  <IconEmail size="sm" />
                </template>
              </DaisyFormInput>
              <!-- <div>
            <label class="block font-medium text-sm text-gray-700">
              {{ $t('E-mail') }}
            </label>
            <t-input
              v-model="row.email"
              class="form-input rounded-md shadow-sm block mt-1 w-full"
              type="email"
              name="email"
              required="required"
              autofocus="autofocus"
            />
          </div>

          <div class="mt-4">
            <label class="block font-medium text-sm text-gray-700">
              {{ $t('Password') }}
            </label>
            <div class="relative">
              <t-input
                v-model="row.password"
                class="form-input rounded-md shadow-sm block mt-1 w-full"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                required="required"
                autocomplete="current-password"
                @keydown.enter="postLogin"
              />
              <div
                class="absolute inset-y-1 right-1 pr-3 flex items-center text-lg"
              >
                <button type="button" @click="onShowPassword()">
                  <i v-if="!showPassword" class="mdi mdi-eye-outline"></i>
                  <i
                    v-if="showPassword"
                    class="mdi mdi-eye-remove text-red-500"
                  ></i>
                </button>
              </div>
            </div>
          </div>

          <div class="block mt-4">
            <label class="flex items-center">
              <input
                v-model="row.remember"
                type="checkbox"
                class="form-checkbox"
                name="remember"
              />
              <span class="ml-2 text-sm text-gray-600">{{
                $t('Remember Me')
              }}</span>
            </label>
          </div>

          <nuxt-link
            class="underline text-sm text-gray-600 hover:text-gray-900"
            to="/auth/forgot-password"
          >
            {{ $t('Forgot your password?') }}
          </nuxt-link>
          <div class="flex items-center justify-center mt-4">
            <div class="flex flex-wrap justify-center">
              <div></div>
              <div></div>
            </div>

            <button
              type="button"
              class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4"
              @click="postLogin"
            >
              {{ $t('Ok') }}
            </button>
          </div> -->
            </form>
            <!-- <nuxt-link v-if="this.$auth.loggedIn" :to="'/'">{{
          $t('HOME')
        }}</nuxt-link> -->
            <!-- <button v-if="this.$auth.loggedIn" @click="back">VOLTA</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const row = ref({
  email: '',
  password: '',
  remember: false,
});

const onSubmit = async () => {
  console.log('login');
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
