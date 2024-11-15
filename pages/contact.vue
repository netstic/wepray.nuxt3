<template>
  <main class="flex-grow public-layout-width mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <h1
      class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
    >
      Contact Us
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
      >
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Get in touch with the PrayerConnect team
          </h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >Name</label
              >
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                for="subject"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >Subject</label
              >
              <select
                id="subject"
                v-model="form.subject"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership Opportunities</option>
              </select>
            </div>
            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >Message</label
              >
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
      >
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Other ways to reach us
          </h2>
          <div class="space-y-4">
            <div class="flex items-center">
              <MailIcon class="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <span class="text-gray-700 dark:text-gray-300"
                >support@prayerconnect.com</span
              >
            </div>
            <div class="flex items-center">
              <PhoneIcon
                class="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2"
              />
              <span class="text-gray-700 dark:text-gray-300"
                >+1 (555) 123-4567</span
              >
            </div>
            <div class="flex items-center">
              <MapPinIcon
                class="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2"
              />
              <span class="text-gray-700 dark:text-gray-300"
                >123 Prayer Street, Faith City, PC 12345</span
              >
            </div>
          </div>
          <div class="mt-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Follow us
            </h3>
            <div class="flex space-x-4">
              <a
                href="#"
                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span class="sr-only">Facebook</span>
                <FacebookIcon class="h-6 w-6" />
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span class="sr-only">Twitter</span>
                <TwitterIcon class="h-6 w-6" />
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span class="sr-only">Instagram</span>
                <InstagramIcon class="h-6 w-6" />
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
});

import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  subject: 'general',
  message: '',
});

const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form.value);
  // Reset the form after submission
  form.value = {
    name: '',
    email: '',
    subject: 'general',
    message: '',
  };
  // You might want to show a success message to the user
  alert('Thank you for your message. We will get back to you soon!');
};
</script>
