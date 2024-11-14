<template>
  <main class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- <h1 class="text-3xl font-bold mb-6">Terms and Conditions of Service</h1> -->

    <!-- <p class="text-gray-600 mb-6">Last updated: November 14, 2024</p> -->

    <ContentRenderer :value="data!">
      <h1 class="w-full text-3xl font-semibold text-gray-800 md:text-4xl py-4">
        {{ data?.title }}
      </h1>

      <div class="prose lg:prose-xl text-justify">
        <ContentRendererMarkdown :value="data!" />
      </div>
    </ContentRenderer>

    <!-- <div class="space-y-6 text-gray-700">
      <section v-for="(section, index) in sections" :key="index">
        <h2 class="text-xl font-semibold mb-2">{{ section.title }}</h2>
        <p
          v-for="(paragraph, pIndex) in section.content"
          :key="pIndex"
          class="mb-2"
        >
          {{ paragraph }}
        </p>
      </section>
    </div> -->

    <!-- <div class="mt-8">
      <p class="text-gray-600">
        If you have any questions about these Terms, please contact us at
        <a
          href="mailto:support@prayerconnect.com"
          class="text-blue-600 hover:underline"
        >
          support@prayerconnect.com </a
        >.
      </p>
    </div> -->
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'public',
});

const { locale } = useI18n();

const path = 'terms';

const { data } = await useAsyncData(`${path}-data`, () =>
  queryContent(path)
    .where({ lang: locale.value ?? 'en' })
    .findOne()
);

useHead({
  title: data.value?.title,
  htmlAttrs: {
    'data-theme': 'wp',
  },
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: data.value?.description,
    },
  ],
});

watch(locale, async (oldValue, newValue) => {
  if (oldValue !== newValue) {
    const { data: newFetchedData } = await useAsyncData(`${path}-data`, () =>
      queryContent(path)
        .where({ lang: locale.value ?? 'en' })
        .findOne()
    );
    data.value = newFetchedData.value;
  }
});
</script>

<style scoped></style>
