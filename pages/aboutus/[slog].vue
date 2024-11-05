<template>
  <div class="flex justify-center items-center gap-8 flex-wrap">
    <div class="hero max-w-[1024px] my-auto">
      <div class="hero-content">
        <div>
          <ContentRenderer :value="data">
            <h1
              class="w-full text-3xl font-semibold text-gray-800 md:text-4xl py-4"
            >
              {{ data.title }}
            </h1>
            <div class="flex justify-start">
              <nuxt-link :to="link.href" class="text-primary text-2xl">
                <svg
                  class="inline stroke-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m11.9 21l4.358-11h1.023l4.357 11h-1.08l-1.19-3.05H14.17L12.981 21zm-7.88-2.885l-.708-.707l4.896-4.916q-.856-.875-1.703-2.154Q5.658 9.06 5.25 8h1.08q.366.84 1.107 1.93q.74 1.091 1.478 1.855q1.306-1.325 2.319-2.909Q12.246 7.292 12.58 6H2.385V5H8.5V3.77h1V5h6.115v1H13.62q-.448 1.57-1.527 3.344q-1.079 1.775-2.469 3.16l2.535 2.604l-.385 1.03l-2.858-2.932zm10.488-1.069h4.523l-2.262-5.811z"
                  />
                </svg>

                {{ link.text }}
                <svg
                  class="inline"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M10 17V7l5 5z" />
                </svg>
              </nuxt-link>
            </div>

            <div class="prose lg:prose-xl text-justify">
              <ContentRendererMarkdown :value="data" />
            </div>
          </ContentRenderer>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
const { data } = await useAsyncData('about-us-data', () =>
  queryContent('page', 'about-us')
    .where({ lang: route.params.slog ?? 'en' })
    .findOne()
);

useHead({
  title: data.value?.title ?? 'About Us',
  htmlAttrs: {
    'data-theme': 'wp',
  },
  meta: [],
});

// definePageMeta({
//   title: data.value.title,
//   description: data.value.description,
//   lang: data.value.lang,
// });

const link = computed(() => {
  const lang = route.params.slog === 'en' ? 'pt' : 'en';
  return {
    href: `/aboutus/${lang}`,
    text: lang !== 'en' ? 'Português' : 'English',
  };
});
</script>
