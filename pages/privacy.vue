<template>
  <main class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <ContentRenderer :value="data!">
      <h1
        class="w-full text-3xl font-semibold text-gray-800 dark:text-white md:text-4xl py-4"
      >
        {{ data?.title }}
      </h1>

      <div class="prose lg:prose-xl text-justify dark:text-gray-300">
        <ContentRendererMarkdown :value="data!" />
      </div>
    </ContentRenderer>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'public',
  colorMode: 'light',
});

const { locale } = useI18n();

const path = 'privacy';

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
