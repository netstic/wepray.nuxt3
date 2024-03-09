<template>
  <div class="card shrink-0 shadow-2xl bg-base-100">
    <div class="card-body gap-4">
      <h2 class="card-title">
        {{ $t('Send a Prayer Request') }}
      </h2>

      <!-- <form-input-error :errors="errors"></form-input-error> -->
      <form method="POST" class="flex flex-col gap-4">
        <div role="alert" class="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-slate-500 shrink-0 w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span class="text-slate-600">
            {{ $t('E-mail (It will not be published)') }}</span
          >
        </div>

        <label class="input input-bordered flex items-center gap-2">
          {{ $t('Name') }}
          <input
            type="text"
            class="grow"
            id="name"
            v-model="row.name"
            required
          />
        </label>
        <div class="form-control justify-start items-start gap-4">
          <label class="label cursor-pointer gap-4">
            <input
              v-model="row.anonymous"
              type="checkbox"
              name="anonymous"
              class="checkbox"
            />
            <span class="label-text">{{
              $t('Please do not post my name.')
            }}</span>
          </label>
        </div>
        <label class="input input-bordered flex items-center gap-2">
          {{ $t('Email') }}
          <input
            type="email"
            class="grow"
            id="email"
            v-model="row.email"
            required
          />
        </label>
        <label class="form-control">
          <div class="label">
            <span class="label-text">
              {{ $t('What would you like us to pray about?') }}
            </span>
          </div>
          <textarea
            class="textarea textarea-bordered h-24"
            id="body"
            ref="body"
            v-model="row.body"
            name="body"
          ></textarea>
        </label>

        <div class="form-control">
          <button type="button" class="btn btn-primary" @click="onSubmit">
            {{ $t('Publish') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
const sucesso = ref(false);
const row = ref({
  name: null,
  email: null,
  body: null,
  anonymous: false,
});
const errors = ref({});
const getErrorMsg = computed(() => {
  const data = [];

  Object.keys(errors.value).forEach((key) => {
    const values = errors.value[key];
    if (values.length > 0) {
      values.forEach((v) => {
        data.push(v);
      });
    }
  });
  return data;
});
const onError = (e) => {};
const onSubmit = (e) => {
  sucesso.value = false;
  // this.$axios
  //   .post(this.$config.baseApi + '/api/v1/pub/post', row.value)
  //   .then(
  //     (res) => {
  //       row.value = {
  //         name: null,
  //         email: null,
  //         body: null,
  //         anonymous: false,
  //       }
  //       sucesso.value = true
  //       if (this.$refs.body) {
  //         this.$refs.body.$el.value = ''
  //       }
  //     },
  //     (e) => {
  //       const { status, data } = e.response
  //       if (status === 422) {
  //         errors.value = data.errors
  //       } else if (status === 404) {
  //         this.error({ statusCode: 404, message: 'not found' })
  //       } else if (status === 500) {
  //         this.error({
  //           statusCode: 500,
  //           message: 'Internal Server Error',
  //         })
  //       } else {
  //         this.error({ statusCode: status, message: 'Error' })
  //       }
  //     }
  //   )
};

const onSuccess = (token) => {
  row.value['g-recaptcha-response'] = token;
};
const isCheckError = (field) => {
  return errors.value.hasOwnProperty(field);
};
const onExpired = () => {
  row.value['g-recaptcha-response'] = null;
};

// export default {
//   data() {
//     return {
//       sucesso: false,
//       row: {
//         name: null,
//         email: null,
//         body: null,
//         anonymous: false,
//       },
//       errors: {},
//     }
//   },
//   computed: {
//     getErrorMsg() {
//       const data = []

//       Object.keys(this.errors).forEach((key) => {
//         const values = this.errors[key]
//         if (values.length > 0) {
//           values.forEach((v) => {
//             data.push(v)
//           })
//         }
//       })
//       return data
//     },
//   },
//   methods: {
//     onError(e) {},
//     onSubmit(e) {
//       this.sucesso = false
//       this.$axios
//         .post(this.$config.baseApi + '/api/v1/pub/post', this.row)
//         .then(
//           (res) => {
//             this.row = {
//               name: null,
//               email: null,
//               body: null,
//               anonymous: false,
//             }
//             this.sucesso = true
//             if (this.$refs.body) {
//               this.$refs.body.$el.value = ''
//             }
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
//     isCheckError(field) {
//       // eslint-disable-next-line no-prototype-builtins
//       return this.errors.hasOwnProperty(field)
//     },
//     onExpired() {
//       this.row['g-recaptcha-response'] = null
//     },
//   },
// }
</script>
<style></style>
