<template>
  <footer class="bg-white py-8 w-full">
    <div class="mx-auto px-8 max-w-[1024px]">
      <div class="table w-full">
        <div class="block sm:table-cell mb-5">
          <p class="uppercase text-grey text-sm sm:mb-2">&nbsp;</p>
          <a
            href="https://www.revivalandreformation.org/"
            target="_black"
            rel="noreferrer noopener"
          >
            <img
              src="https://euoro.wepray.org/img/R-R-Logo.png"
              alt="REVIVAL & REFORMATION"
              title="REVIVAL & REFORMATION"
            />
          </a>
        </div>
        <div class="block sm:table-cell">
          <p class="uppercase text-grey text-sm sm:mb-6">{{ $t('Legal') }}</p>
          <ul class="list-reset text-xs mb-6">
            <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
              <nuxt-link
                class="text-grey hover:text-grey-dark"
                to="/page/terms"
              >
                {{ $t('Terms of Use') }}
              </nuxt-link>
            </li>
            <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
              <nuxt-link
                class="text-grey hover:text-grey-dark"
                to="/page/privacy"
              >
                {{ $t('Privacy policy') }}
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="block sm:table-cell">
          <p class="uppercase text-grey text-sm sm:mb-6">Company</p>
          <ul class="list-reset text-xs mb-6">
            <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
              <a
                href="https://revivalandreformation.org/uip/blog"
                target="_black"
                class="text-grey hover:text-grey-dark"
                rel="noreferrer noopener"
              >
                {{ $t('Official Blog') }}
              </a>
            </li>
            <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
              <nuxt-link
                to="/page/aboutus"
                class="text-grey hover:text-grey-dark"
                >{{ $t('About Us') }}</nuxt-link
              >
            </li>
            <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
              <nuxt-link
                class="text-grey hover:text-grey-dark"
                to="/page/contactus"
              >
                {{ $t('Contact Us') }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts"></script>
