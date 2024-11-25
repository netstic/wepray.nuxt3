<template>
  <WeprayDialog v-model="isDialogOpen" class="p-4">
    <p class="text-3xl text-gray-800 font-bold">{{ $t('Send Prayer') }}</p>
    <p class="text-xl mb-4 text-gray-600">
      {{ $t('Fill the form to finish sending your prayer.') }}
    </p>
    <form
      @submit.prevent="onSubmit"
      class="lg:min-w-[35rem] flex flex-col gap-2"
    >
      <WeprayFormInput
        v-model="row.name"
        :label="$t('Name')"
        :placeholder="$t('Enter your name')"
        input-class="w-full wp-input"
        required
      />
      <WeprayFormInput
        v-model="row.email"
        :label="$t('Email')"
        :placeholder="$t('Enter your email')"
        input-class="w-full wp-input"
        required
      />
      <div
        class="w-full flex gap-2 sm:flex-row flex-col items-center md:grid md:grid-cols-12"
      >
        <WeprayFormAutocomplete
          v-model="row.country"
          :label="$t('Country')"
          :placeholder="$t('Enter your country')"
          :options="useCountries().countries"
          class="col-span-4 w-full"
          select-class="wp-input w-full"
          required
        />
        <WeprayFormInput
          v-model="row.city"
          :label="$t('City')"
          :placeholder="$t('Enter your city')"
          class="col-span-8 w-full"
          input-class="wp-input w-full"
          required
        />
      </div>

      <recaptcha
        id="g-recaptcha-quick-prayer"
        class="inline-flex items-center px-4 py-2"
        @error="onError"
        @success="onSuccess"
        @expired="onExpired"
      />

      <WeprayButton type="submit" class="mt-4 wp-btn wp-btn-blue">{{
        $t('Send')
      }}</WeprayButton>
    </form>
  </WeprayDialog>
</template>

<script setup lang="ts">
import { useCountries } from '~/composables/useCountries';
import type { IPostPublicQuickPrayer } from '~/types/post/public';

const isDialogOpen = ref(false);

const row = ref<IPostPublicQuickPrayer>({
  name: null,
  email: null,
  country: null,
  city: null,
  'g-recaptcha-response': null,
});

const onSubmit = () => {};

const onSuccess = (token: string) => {
  row.value['g-recaptcha-response'] = token;
};

const onError = () => {};

const onExpired = () => {
  row.value['g-recaptcha-response'] = null;
};

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

defineExpose({
  openDialog,
  closeDialog,
});
</script>
