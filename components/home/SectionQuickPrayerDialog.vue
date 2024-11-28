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

      <WeprayButton
        type="submit"
        class="mt-4 wp-btn wp-btn-blue"
        :class="{ 'wp-btn-disabled': !row.body }"
        :loading="isSubmitLoading"
        :disabled="!row.body"
        >{{ $t('Send') }}</WeprayButton
      >
    </form>

    <WeprayNotifyBanner ref="notifyBannerRef" />
  </WeprayDialog>
</template>

<script setup lang="ts">
import type { WeprayNotifyBanner } from '#build/components';
import { useCountries } from '~/composables/useCountries';
import { postPublicQuickPrayerService } from '~/services/post';
import type { IPostPublicQuickPrayer } from '~/types/post/public';

const emit = defineEmits(['submit']);

const isDialogOpen = ref(false);

const defaultRow = (): IPostPublicQuickPrayer => ({
  name: null,
  email: null,
  country: null,
  city: null,
  body: null,
});

const { executeRecaptcha } = useGoogleRecaptcha();

const row = ref<IPostPublicQuickPrayer>(defaultRow());
const notifyBannerRef = ref<InstanceType<typeof WeprayNotifyBanner>>();
const isSubmitLoading = ref(false);

const onSubmit = async () => {
  isSubmitLoading.value = true;

  const { token } = await executeRecaptcha(RecaptchaAction.post);

  postPublicQuickPrayerService({ ...row.value, 'g-recaptcha-response': token })
    .then(() => {
      notifyBannerRef.value?.notifySuccess('Prayer sent successfully.');
      row.value = defaultRow();
      emit('submit');
    })
    .catch(() => {
      notifyBannerRef.value?.notifyError(
        'An error occurred while sending your prayer. Please try again.'
      );
    })
    .finally(() => {
      isSubmitLoading.value = false;
    });
};

const openDialog = (quickPrayer: string) => {
  row.value = defaultRow();
  isDialogOpen.value = true;
  row.value.body = quickPrayer;
};

const closeDialog = () => {
  row.value = defaultRow();
  isDialogOpen.value = false;
};

defineExpose({
  openDialog,
  closeDialog,
});
</script>
