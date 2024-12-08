<template>
  <WeprayDialog max-width="30rem" v-model="isOpen">
    <h2 class="text-2xl text-gray-800 dark:text-white font-bold">
      {{ $t(dialogTitle) }}
    </h2>
    <h3 class="text-xl text-gray-600 dark:text-gray-400">
      {{ $t('You need to be logged in to send a comment.') }}
    </h3>

    <form @submit.prevent="onSubmit" class="mt-4 flex flex-col gap-2">
      <WeprayFormInput
        v-model="row.name"
        :label="$t('Name (optional)')"
        :placeholder="$t('Enter your name')"
      />
      <WeprayFormInput
        v-model="row.username"
        :label="$t('Username')"
        :placeholder="$t('Enter your username')"
        required
      />
      <WeprayFormInput
        v-model="row.email"
        :label="$t('Email')"
        :placeholder="$t('Enter your email')"
        required
      />

      <WeprayFormInput
        v-model="row.password"
        :label="$t('Password')"
        :placeholder="$t('Create a password')"
        :type="isShowPassword ? 'text' : 'password'"
        required
        class="mb-4"
      >
        <template #append>
          <button type="button" @click="isShowPassword = !isShowPassword">
            <IconEyeSlashOutline v-if="isShowPassword" />
            <IconEyeOutline v-else />
          </button>
        </template>
      </WeprayFormInput>

      <div
        class="w-full flex gap-2 sm:flex-row flex-col items-center md:grid md:grid-cols-12"
      >
        <WeprayFormAutocomplete
          v-model="row.country"
          :label="$t('Country')"
          :placeholder="$t('Enter your country')"
          :options="useCountries().countries"
          class="col-span-4 w-full"
          required
        />
        <WeprayFormInput
          v-model="row.city"
          :label="$t('City')"
          :placeholder="$t('Enter your city')"
          class="col-span-8 w-full"
          required
        />
      </div>

      <WeprayButton
        type="submit"
        class="mt-4 wp-btn wp-btn-blue"
        :loading="isSubmitLoading"
      >
        {{ $t('Create Account') }}
      </WeprayButton>
    </form>

    <WeprayNotifyBanner ref="notifyBannerRef" />
  </WeprayDialog>
</template>

<script setup lang="ts">
import type { WeprayNotifyBanner } from '#build/components';
import { guestBecomeUserService } from '~/services/guest';
import type { ISessionGuestRegister } from '~/types/session';

const emit = defineEmits(['submit']);

const notifyBannerRef = ref<InstanceType<typeof WeprayNotifyBanner>>();

const defaultRow = (): ISessionGuestRegister => ({
  name: null,
  username: null,
  email: null,
  country: null,
  city: null,
  password: null,
});

const row = ref<ISessionGuestRegister>(defaultRow());

const isOpen = ref(false);
const isSubmitLoading = ref(false);
const isShowPassword = ref(false);

const dialogType = ref<'comment' | 'note'>('comment');
const dialogTitle = computed(() =>
  dialogType.value === 'comment' ? 'Send Comment' : 'Send Note'
);

const { executeRecaptcha } = useGoogleRecaptcha();

const onSubmit = async () => {
  isSubmitLoading.value = true;

  const { token } = await executeRecaptcha(RecaptchaAction.guestBecomeUser);

  guestBecomeUserService({ ...row.value, 'g-recaptcha-response': token })
    .then(() => {
      notifyBannerRef.value?.notifySuccess('You are now signed up.');
      row.value = defaultRow();
      emit('submit');
    })
    .catch(() => {
      notifyBannerRef.value?.notifyError(
        'An error occurred while signing up. Please try again.'
      );
    })
    .finally(() => {
      isSubmitLoading.value = false;
    });
};

const openDialog = (type: 'comment' | 'note') => {
  dialogType.value = type;
  row.value = defaultRow();
  isOpen.value = true;
};

const closeDialog = () => {
  row.value = defaultRow();
  isOpen.value = false;
};

defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style scoped></style>
