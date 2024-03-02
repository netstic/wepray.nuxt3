<template>
  <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <div class="card-body gap-4">
      <h2 class="card-title">
        {{ $t("Login") }}
      </h2>

      <form-input-error :errors="errors"></form-input-error>
      <form method="POST" class="flex flex-col gap-4">
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
            />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
            />
          </svg>
          <input type="text" class="grow" :placeholder="$t('E-mail')" />
        </label>

        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            :type="showPassword ? 'text' : 'password'"
            class="grow"
            value="password"
          />
          <!-- <kbd class="kbd kbd-sm">⌘</kbd> -->
        </label>
        <div class="form-control justify-start items-start gap-4">
          <label class="label cursor-pointer gap-4">
            <input
              v-model="row.remember"
              type="checkbox"
              name="remember"
              class="checkbox"
            />
            <span class="label-text">{{ $t("Remember Me") }}</span>
          </label>
        </div>
        <!-- <div class="block mt-4">
          <label class="flex items-center">
            <input
              v-model="row.remember"
              type="checkbox"
              class="form-checkbox"
              name="remember"
            />
            <span class="ml-2 text-sm text-gray-600">{{
              $t("Remember Me")
            }}</span>
          </label>
        </div> -->

        <nuxt-link class="link" to="/auth/forgot-password">
          {{ $t("Forgot your password?") }}
        </nuxt-link>

        <div class="form-control">
          <button type="button" class="btn btn-primary" @click="postLogin">
            {{ $t("Login") }}
          </button>
        </div>
      </form>
      <!-- <nuxt-link v-if="this.$auth.loggedIn" :to="'/'">{{
          $t("HOME")
        }}</nuxt-link> -->
      <!-- <button v-if="this.$auth.loggedIn" @click="back">VOLTA</button> -->
    </div>
  </div>
</template>
<script setup lang="ts">
const showPassword = ref(false);
const row = ref({
  email: "",
  password: "",
  remember: false,
});
const errors = ref({});
const onShowPassword = () => {
  showPassword.value = !showPassword.value;
};
const back = () => {
  window.history.back();
};
const postLogin = () => {
  //   this.$auth.reset('laravelSanctum')
  //   this.$auth
  //     .loginWith('laravelSanctum', {
  //       data: row.value,
  //     })
  //     .then(
  //       (res) => {
  //         this.$nuxt.setLayout(
  //           this.$store.state.auth.loggedIn ? 'private' : 'public'
  //         )
  //       },
  //       (e) => {
  //         const { data } = e.response
  //         errors.value = data.errors
  //       }
  //     )
  //     .catch((e) => {
  //       this.$auth.logout('laravelSanctum')
  //     })
};

//   export default {
//     data() {
//       return {
//         showPassword: false,
//         row: {
//           email: '',
//           password: '',
//           remember: false,
//         },
//         errors: {},
//       }
//     },
//     mounted() {
//       setTimeout(async () => {
//         if (this.$store.state.auth.loggedIn) {
//           await this.$auth.fetchUser()
//         }
//       }, 800)
//     },

//     methods: {
//       onShowPassword() {
//         this.showPassword = !this.showPassword
//       },
//       back() {
//         window.history.back()
//       },
//       postLogin() {
//         this.$auth.reset('laravelSanctum')
//         this.$auth
//           .loginWith('laravelSanctum', {
//             data: this.row,
//           })
//           .then(
//             (res) => {
//               this.$nuxt.setLayout(
//                 this.$store.state.auth.loggedIn ? 'private' : 'public'
//               )
//             },
//             (e) => {
//               const { data } = e.response

//               this.errors = data.errors
//             }
//           )
//           .catch((e) => {
//             this.$auth.logout('laravelSanctum')
//           })
//       },
//     },
//   }
</script>
