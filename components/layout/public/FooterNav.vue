<template>
  <footer class="bg-white py-8 w-full">
    <div class="mx-auto public-layout-padding public-layout-width">
      <div class="table w-full">
        <!-- <div class="block sm:table-cell mb-5">
          <p class="uppercase text-grey sm:mb-2">&nbsp;</p>
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
        </div> -->
        <div class="block sm:table-cell mb-6 text-gray-900">
          <p class="uppercase mb-4">{{ $t('Legal') }}</p>
          <ul class="list-reset space-y-2">
            <li>
              <nuxt-link
                class="text-gray-500 hover:text-gray-700"
                to="/page/terms"
              >
                {{ $t('Terms of Use') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="text-gray-500 hover:text-gray-700"
                to="/page/privacy"
              >
                {{ $t('Privacy policy') }}
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="block sm:table-cell">
          <p class="uppercase mb-4">Company</p>
          <ul class="list-reset space-y-2">
            <li class="text-gray-500 hover:text-gray-700">
              <a
                href="https://revivalandreformation.org/uip/blog"
                target="_black"
                class="text-grey hover:text-grey-dark"
                rel="noreferrer noopener"
              >
                {{ $t('Official Blog') }}
              </a>
            </li>
            <li class="text-gray-500 hover:text-gray-700">
              <nuxt-link
                to="/page/aboutus"
                class="text-grey hover:text-grey-dark"
                >{{ $t('About Us') }}</nuxt-link
              >
            </li>
            <li class="text-gray-500 hover:text-gray-700">
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
  <!-- <footer class="footer p-10 bg-base-200 text-base-content">
    <aside class="flex justify-center items-center text-center">
      <a
        href="https://www.revivalandreformation.org/"
        target="_black"
        rel="noreferrer noopener"
        class="m-auto"
      >
        <img
          src="https://euoro.wepray.org/img/R-R-Logo.png"
          alt="REVIVAL & REFORMATION"
          title="REVIVAL & REFORMATION"
        />
      </a>
    </aside>
    <nav>
      <h6 class="footer-title">{{ $t('Legal') }}</h6>
      <nuxt-link class="link link-hover" to="/terms">
        {{ $t('Terms of Use') }}
      </nuxt-link>
      <nuxt-link class="link link-hover" to="/privacy">
        {{ $t('Privacy policy') }}
      </nuxt-link>
    </nav>
    <nav>
      <h6 class="footer-title">{{ $t('Company') }}</h6>
      <a class="link link-hover">{{ $t('About us') }}</a>
      <a class="link link-hover">{{ $t('Contact') }}</a>
      <a class="link link-hover">{{ $t('Jobs') }}</a>
      <a class="link link-hover">{{ $t('Press kit') }}</a>
    </nav>
  </footer> -->
</template>
<script setup lang="ts"></script>
