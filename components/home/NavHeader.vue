<template>
  <header
    class="fixed top-0 left-0 right-0 bg-white border-b-2 border-b-gray-200 z-50"
  >
    <nav class="container mx-auto px-4 py-2 public-layout-width">
      <div
        :class="{
          'justify-between': props.showStartBtn,
          'justify-center lg:justify-between': !props.showStartBtn,
        }"
        class="flex items-center"
      >
        <a href="/" class="flex space-x-2 items-end">
          <LogoWp custom-class="w-9 h-9 text-blue-600" />
          <span
            class="text-2xl font-bold text-blue-600"
            :class="{ 'hidden md:block': props.showStartBtn }"
            >WePray</span
          >
        </a>

        <div
          class="hidden lg:block dropdown dropdown-hover text-gray-700"
          :class="{ 'lg:hidden': props.showStartBtn }"
        >
          <div
            tabindex="0"
            role="button"
            class="wp-btn hover:bg-stone-200 flex font-semibold text-sm wp-btn-ghost uppercase text-gray-400"
          >
            {{ $t('Site Language') }}: {{ $t('lang.' + locale) }}
            <IconChevronDown />
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li v-for="locale in availableLocales">
              <a @click="setLocale(locale)">{{ $t('lang.' + locale) }}</a>
            </li>
          </ul>
        </div>

        <button
          v-if="showStartBtn"
          @click="navigateTo('/register')"
          class="wp-btn wp-btn-blue font-bold"
        >
          {{ $t('Get Started') }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { setLocale, availableLocales, locale } = useI18n();

const props = defineProps<{
  showStartBtn: boolean;
}>();
</script>
