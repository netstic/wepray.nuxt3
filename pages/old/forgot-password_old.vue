<template>
  <div
    class="container mx-auto flex px-5 py-24 items-center justify-center flex-col"
  >
    <div class="lg:w-2/3 w-full">
      <h2 class="w-full text-3xl font-semibold text-gray-800 md:text-4xl">
        {{ $t('Forgot your password?') }}
      </h2>
      <ul class="lg:flex justify-start flex-1 items-center"></ul>
      <div class="prose lg:prose-xl text-justify">
        {{
          $t(
            'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.'
          )
        }}

        <!-- <form-input-error :errors="errors"></form-input-error> -->

        <div
          v-if="msg"
          class="flex items-center bg-white shadow mb-2 font-semibold text-md"
        >
          <div class="bg-green-100 rounded px-3 py-3 font-mono">
            <i class="text-green-800 mdi mdi-check-circle-outline"></i>
            {{ msg }}
          </div>
        </div>

        <form method="POST" @submit.prevent="onSubmit">
          <div class="flex items-center justify-between mt-4">
            <div class="w-full md:w-full px-3 mb-6">
              <label
                for="email"
                class="block font-medium text-sm text-gray-700"
              >
                {{ $t('E-mail') }}
              </label>
              <t-input
                id="email"
                v-model="row.email"
                name="email"
                type="email"
                :variant="isCheckError('email') ? 'error' : undefined"
              />
            </div>
          </div>
          <div class="flex items-center justify-center mt-4 px-3">
            <recaptcha
              id="g-recaptcha"
              class="inline-flex items-center px-4 py-2"
              @error="onError"
              @success="onSuccess"
              @expired="onExpired"
            />
          </div>
          <div class="flex items-center justify-center mt-4 px-3">
            <button
              v-if="row['g-recaptcha-response']"
              type="submit"
              class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4 request"
            >
              {{ $t('Send password reset link') }}
            </button>
          </div>
        </form>
        <form-input-error :errors="errors"></form-input-error>
        <div
          v-if="msg"
          class="flex items-center bg-white shadow mb-2 font-semibold text-md"
        >
          <div class="bg-green-100 rounded px-3 py-3 font-mono">
            <i class="text-green-800 mdi mdi-check-circle-outline"></i>
            {{ msg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout() {
    return 'public';
  },
  data() {
    return {
      row: { email: null, 'g-recaptcha-response': null },
      errors: {},
      msg: null,
    };
  },
  mounted() {
    // if (this.$store.state.auth.loggedIn) {
    //   setTimeout(() => {
    //     window.history.back()
    //   }, 0)
    // }
  },
  methods: {
    onError() {},
    onSubmit(e) {
      this.$axios
        .get(this.$config.baseApi + '/sanctum/csrf-cookie')
        .then((response) => {
          // Login...

          this.$axios
            .post(this.$config.baseApi + '/forgot-password', this.row)
            .then(
              ({ data }) => {
                // alert(data.message)
                this.msg = this.$t(
                  'We have emailed you a link to reset your password.\n\nCheck your mailbox.\n\nPs. It may be in the Spam list. To receive our messages, please, add info@wepray.org to your contact list.'
                );
                this.errors = {};
                this.row = {
                  email: null,
                };
              },
              (e) => {
                const { status, data } = e.response;
                if (status === 422) {
                  this.errors = data.errors;
                } else {
                  alert(this.$t('Erro'));
                }
              }
            );
        });
    },
    onSuccess(token) {
      this.row['g-recaptcha-response'] = token;
    },
    isCheckError(field) {
      // eslint-disable-next-line no-prototype-builtins
      return this.errors.hasOwnProperty(field);
    },
    onExpired() {
      this.row['g-recaptcha-response'] = null;
    },
  },
};
</script>
