<template>
  <div class="card shrink-0 shadow-2xl bg-base-100">
    <div class="card-body gap-4">
      <h2 class="card-title">
        {{ $t('Sign Up') }}
      </h2>

      <p>
        <span class="text-primary font-medium">Faça a diferença!</span> Seja
        parte de uma comunidade engajada em oração e contribua para um mundo
        melhor.
      </p>

      <!-- <form-input-error :errors="errors"></form-input-error> -->
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
          <input
            v-model="row.email"
            type="text"
            class="grow"
            placeholder="Email"
          />
        </label>
        <div class="form-control">
          <button
            type="button"
            class="btn btn-primary"
            @click="onSubmit"
            :disabled="!row.email"
          >
            {{ $t('Check') }}
          </button>
        </div>
      </form>
      <dialog
        :open="openDialog"
        id="my_modal_5"
        class="modal modal-bottom sm:modal-middle"
      >
        <div class="modal-box">
          <h3 class="font-bold text-lg">Hello!</h3>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <div class="modal-action">
            <button
              class="btn"
              @click="
                () => {
                  openDialog = false;
                }
              "
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
const row = ref({
  email: null,
});

const openDialog = ref(false);
const onSubmit = () => {
  openDialog.value = true;
};
// export default {
//   data() {
//     return {
//       showForm: false,
//       showPassword: false,
//       row: {
//         username: '',
//         email: null,
//         password: null,
//         password_confirmation: null,
//       },
//       errors: {},
//     }
//   },
//   methods: {
//     isCheckError(field) {
//       // eslint-disable-next-line no-prototype-builtins
//       return this.errors.hasOwnProperty(field)
//     },
//     onShowPassword() {
//       this.showPassword = !this.showPassword
//     },
//     checkUsername() {
//       const { username } = this.row
//       this.$axios
//         .post(this.$config.baseApi + '/api/v1/pub/user/check', { username })
//         .then(
//           (res) => {
//             this.errors = {}
//             this.showForm = true
//           },
//           (e) => {
//             const { status, data } = e.response
//             // eslint-disable-next-line eqeqeq
//             if (status == 422) {
//               this.errors = data.errors
//             } else if (status === 404) {
//               this.error({ statusCode: 404, message: 'not found' })
//             } else if (status === 500) {
//               this.error({
//                 statusCode: 500,
//                 message: 'Internal Server Error',
//               })
//             } else {
//               this.error({ statusCode: status, message: 'Error' })
//             }
//           }
//         )
//     },
//     checkEmail() {
//       const { email } = this.row
//       this.$axios
//         .post(this.$config.baseApi + '/api/v1/pub/user/check', { email })
//         .then(
//           (res) => {
//             this.errors = {}
//             this.showForm = true
//           },
//           (e) => {
//             const { status, data } = e.response
//             // eslint-disable-next-line eqeqeq
//             if (status == 422) {
//               this.errors = data.errors
//             } else if (status === 404) {
//               this.error({ statusCode: 404, message: 'not found' })
//             } else if (status === 500) {
//               this.error({
//                 statusCode: 500,
//                 message: 'Internal Server Error',
//               })
//             } else {
//               this.error({ statusCode: status, message: 'Error' })
//             }
//           }
//         )
//     },
//     onError(e) {},
//     onSubmit(e) {
//       this.$axios
//         .post(this.$config.baseApi + '/api/v1/pub/user/register', this.row)
//         .then(
//           (res) => {
//             this.$auth
//               .loginWith('laravelSanctum', {
//                 data: this.row,
//               })
//               .then(
//                 (res) => {
//                   // this.$toast.success('Logged In!')
//                   this.$nuxt.setLayout(
//                     this.$store.state.auth.loggedIn ? 'private' : 'public'
//                   )
//                 },
//                 (e) => {
//                   const { status, data } = e.response
//                   if (status === 422) {
//                     this.errors = data.errors
//                   } else if (status === 404) {
//                     this.error({ statusCode: 404, message: 'not found' })
//                   } else if (status === 500) {
//                     this.error({
//                       statusCode: 500,
//                       message: 'Internal Server Error',
//                     })
//                   } else {
//                     this.error({ statusCode: status, message: 'Error' })
//                   }
//                 }
//               )
//           },
//           (e) => {
//             const { status, data } = e.response

//             if (status === 422) {
//               this.errors = data.errors
//             } else if (status === 404) {
//               this.error({ statusCode: 404, message: 'not found' })
//             } else if (status === 500) {
//               this.error({
//                 statusCode: 500,
//                 message: 'Internal Server Error',
//               })
//             } else {
//               this.error({ statusCode: status, message: 'Error' })
//             }
//           }
//         )
//     },
//     onSuccess(token) {
//       this.row['g-recaptcha-response'] = token
//     },

//     onExpired() {
//       this.row['g-recaptcha-response'] = null
//     },
//   },
// }
</script>
