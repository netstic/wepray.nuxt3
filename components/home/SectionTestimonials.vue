<template>
  <section class="py-24 bg-gray-50 relative z-20">
    <div class="top-0 left-0 absolute">
      <div v-for="i in 20" :key="i" class="petal absolute"></div>
    </div>
    <div
      class="public-layout-width mx-auto public-layout-padding relative z-10"
    >
      <h2
        class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16"
      >
        {{ $t('Testimonials') }}
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-2 justify-between"
        >
          <p class="text-gray-600 mb-4 line-clamp-3 overflow-hidden">
            "{{ testimonial.quote }}"
          </p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4"
            >
              <span class="text-blue-600 font-bold text-xl">{{
                testimonial.name[0]
              }}</span>
            </div>
            <div>
              <h4 class="font-bold text-gray-800">{{ testimonial.name }}</h4>
              <p class="text-gray-500 text-sm">{{ testimonial.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    quote:
      'WePray has transformed my spiritual life. I feel more connected to God and my community than ever before.',
    name: 'Sarah Johnson',
    location: 'California, USA',
  },
  {
    quote:
      "The support I've received through this app during tough times has been incredible. It's a blessing to have such a caring community.",
    name: 'Michael Chen',
    location: 'Ontario, Canada',
  },
];
</script>

<style lang="scss" scoped>
@use 'sass:math';

.petal {
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.3));
  opacity: 0.8;
  animation: float 15s linear infinite;
}

@for $i from 1 through 20 {
  .petal:nth-child(#{$i}) {
    left: -50px;
    top: #{math.random(100)}vh;
    animation-delay: #{math.random(15) * -1}s;
    animation-duration: #{10 + math.random(10)}s;
    transform: scale(#{0.5 + math.random(5) * 0.1});
  }
}

@keyframes float {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  100% {
    transform: translateX(calc(100vw + 100px)) rotate(360deg);
  }
}
</style>
