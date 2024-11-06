<template>
  <div
    class="w-full max-w-6xl mx-auto flex flex-row justify-center items-start sm:px-4"
  >
    <div class="flex justify-center items-center gap-8 flex-wrap">
      <div class="card shrink-0 shadow-2xl bg-base-100 w-screen max-w-[1024px]">
        <div class="card-body gap-4">
          <h2 class="card-title">
            {{ $t('Send a Prayer Request') }}
          </h2>

          <!-- <form-input-error :errors="errors"></form-input-error> -->
          <form method="POST" class="flex flex-col gap-4">
            <label class="input input-bordered flex items-center gap-2">
              {{ $t('Full name') }}
              <input
                type="text"
                class="grow"
                id="full_name"
                v-model="row.full_name"
                required
              />
            </label>

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
            <label class="input input-bordered flex items-center gap-2">
              {{ $t('Subject') }}
              <input
                type="text"
                class="grow"
                id="name"
                v-model="row.subject"
                required
              />
            </label>
            <div class="hidden">
              <label class="sr-only"> </label>
              <input
                v-model="username"
                name="user-field"
                placeholder=""
                type="text"
                class="form-input block w-full py-3 px-4 placeholder-gray-500 transition ease-in-out duration-150"
              />
            </div>

            <label class="form-control">
              <div class="label">
                <span class="label-text">
                  {{ $t('Message') }}
                </span>
              </div>
              <textarea
                class="textarea textarea-bordered h-24"
                id="body"
                ref="body"
                v-model="row.message"
                name="body"
              ></textarea>
            </label>

            <div class="form-control">
              <button type="button" class="btn btn-primary" @click="onSubmit">
                {{ $t('Send') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const row = ref({
  full_name: '',
  email: '',
  subject: '',
  message: '',
});

const username = ref('');

const { t } = useI18n();

useHead({
  title: t('Send a Prayer Request'),
  htmlAttrs: {
    'data-theme': 'wp',
  },
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: '',
    },
  ],
});
</script>
