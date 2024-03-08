<template>
  <div></div>
</template>
<script>
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
