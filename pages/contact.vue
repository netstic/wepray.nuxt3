<template>
  <main class="flex-grow public-layout-width mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <h1
      class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
    >
      {{ $t('Contact Us') }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
      >
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {{ $t('Get in touch with the WePray team') }}
          </h2>
          <form @submit.prevent="onSubmitContact" class="space-y-6">
            <WeprayFormInput
              v-model="row.full_name"
              :label="$t('Full name')"
              :placeholder="$t('Enter your full name')"
              required
            />
            <WeprayFormInput
              v-model="row.email"
              :label="$t('Email')"
              type="email"
              required
              :placeholder="$t('Enter your email')"
            />
            <WeprayFormSelect
              v-model="row.subject"
              :label="$t('Subject')"
              :options="[
                { value: 'general', label: $t('General Inquiry') },
                { value: 'support', label: $t('Technical Support') },
                { value: 'feedback', label: $t('Feedback') },
                {
                  value: 'partnership',
                  label: $t('Partnership Opportunities'),
                },
              ]"
            />
            <WeprayFormTextarea
              v-model="row.message"
              :label="$t('Message')"
              :placeholder="$t('Enter your message')"
              required
            />
            <button type="submit" class="wp-btn wp-btn-blue">
              {{ $t('Send Message') }}
            </button>
          </form>
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
      >
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {{ $t('Other ways to reach us') }}
          </h2>
          <div class="space-y-4">
            <div class="flex items-start">
              <IconMailOutline class="text-blue-600 dark:text-blue-400 mr-2" />
              <span class="text-gray-700 dark:text-gray-300">{{
                $t('wp_contact_email')
              }}</span>
            </div>
            <div class="flex items-start">
              <IconPhoneOutline class="text-blue-600 dark:text-blue-400 mr-2" />
              <span class="text-gray-700 dark:text-gray-300">{{
                $t('wp_contact_phone')
              }}</span>
            </div>
            <div class="flex items-start">
              <IconMapPinOutline
                size="xl"
                class="text-blue-600 dark:text-blue-400 mr-2"
              />
              <span class="text-gray-700 dark:text-gray-300">{{
                $t('wp_contact_address')
              }}</span>
            </div>
          </div>
          <div class="mt-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {{ $t('Follow us') }}
            </h3>
            <div class="flex space-x-4">
              <a
                href="#"
                class="flex items-center gap-2 flex-nowrap text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <IconFacebookOutline />
                <span>{{ $t('Facebook') }}</span>
              </a>
              <a
                href="#"
                class="flex items-center gap-2 flex-nowrap text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <IconTwitterOutline />
                <span>{{ $t('Twitter') }}</span>
              </a>
              <a
                href="#"
                class="flex items-center gap-2 flex-nowrap text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <IconInstagramOutline />
                <span>{{ $t('Instagram') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'public',
  colorMode: 'light',
});

import { ref } from 'vue';

const defaultRow = () => ({
  full_name: null,
  email: null,
  subject: 'general',
  message: null,
});

const row = ref(defaultRow());

const onSubmitContact = () => {
  alert('Thank you for your message. We will get back to you soon!');
  row.value = defaultRow();
};
</script>
