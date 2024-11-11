<template>
  <div class="min-h-screen bg-white">
    <!-- Persistent Header -->
    <header
      class="fixed top-0 left-0 right-0 bg-white border-b-2 border-b-gray-200 z-50"
    >
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <svg
              class="w-8 h-8 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M17 3V5V7H15V9H17V11V13H19V11V9V7V5V3H17ZM11 9V7V5V3H9V5V7V9V11V13H11V11V9ZM3 13V15V17V19V21H5V19V17V15V13V11H3V13ZM15 21V19V17H13V15H15V13H17V15V17V19V21H15ZM11 21V19V17V15V13H9V15V17V19V21H11ZM7 11V9V7H5V9V11V13H7V11Z"
              />
            </svg>
            <span class="text-2xl font-bold text-blue-600">PrayerConnect</span>
          </div>
          <div class="hidden md:block" :class="{ 'md:hidden': showGetStarted }">
            <select
              v-model="selectedLanguage"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <button
            v-if="showGetStarted"
            @click="startApp"
            class="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <main
      class="container mt-20 mx-auto px-4 pt-24 pb-12 md:py-32"
      ref="heroSection"
    >
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <h1
            class="text-5xl md:text-6xl font-bold text-gray-800 leading-tight"
          >
            Connect Through Prayer Every Day
          </h1>
          <p class="text-xl text-gray-600">
            Join millions of people sharing prayers, supporting each other, and
            growing in faith together.
          </p>
          <div class="space-y-4">
            <button
              @click="startApp"
              class="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg transition-colors transform hover:scale-105 duration-200"
            >
              Get Started
            </button>
            <p class="text-gray-500 text-sm">
              100% free • No ads • Spread love through prayer
            </p>
          </div>
        </div>
        <div class="relative hidden md:block">
          <div
            ref="smallCircle"
            class="absolute w-72 h-72 bg-blue-100 rounded-full opacity-50"
            :style="{
              transform: `translate(${circlePosition.x}px, ${circlePosition.y}px)`,
            }"
          ></div>
          <div class="relative z-10 flex justify-center items-center">
            <div
              class="w-96 h-96 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-48 h-48 text-white animate-pulse"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M17 3V5V7H15V9H17V11V13H19V11V9V7V5V3H17ZM11 9V7V5V3H9V5V7V9V11V13H11V11V9ZM3 13V15V17V19V21H5V19V17V15V13V11H3V13ZM15 21V19V17H13V15H15V13H17V15V17V19V21H15ZM11 21V19V17V15V13H9V15V17V19V21H11ZM7 11V9V7H5V9V11V13H7V11Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Quick Prayer Section -->
    <section class="py-24 bg-gray-50" ref="animatedSection">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8"
        >
          Share a Quick Prayer
        </h2>
        <form @submit.prevent="submitQuickPrayer" class="max-w-2xl mx-auto">
          <div class="flex flex-col md:flex-row gap-4">
            <input
              v-model="quickPrayer"
              type="text"
              placeholder="Type your prayer here..."
              class="flex-grow px-4 py-2 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
            >
              Share Prayer
            </button>
          </div>
        </form>
        <div class="mt-8 text-center">
          <p class="text-gray-600">
            Your prayer will be shared anonymously with our community
          </p>
        </div>
        <div class="mt-12 flex justify-center">
          <div class="relative w-64 h-64">
            <svg
              v-for="(circle, index) in animatedCircles"
              :key="index"
              :class="`absolute inset-0 text-blue-${300 + index * 100}`"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                :style="{ 'animation-delay': `${index * 0.5}s` }"
                class="animate-ping origin-center"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24" ref="animatedSection">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16"
        >
          Why Join PrayerConnect?
        </h2>
        <div class="grid md:grid-cols-3 gap-12">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="text-center space-y-4"
          >
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path :d="feature.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 bg-gray-50" ref="animatedSection">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16"
        >
          Testimonials
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-white p-6 rounded-lg shadow-md"
          >
            <p class="text-gray-600 mb-4">"{{ testimonial.quote }}"</p>
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

    <!-- Mobile App Section -->
    <section class="py-24 bg-blue-600 overflow-hidden" ref="mobileAppSection">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
              Take PrayerConnect Everywhere
            </h2>
            <p class="text-xl text-blue-100 mb-8">
              Download our mobile app and stay connected with your prayer
              community anytime, anywhere.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                class="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
              >
                <svg
                  class="w-6 h-6 inline-block mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.08-.46-2.07-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                  />
                </svg>
                App Store
              </button>
              <button
                class="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
              >
                <svg
                  class="w-6 h-6 inline-block mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.609-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.799-3.8l-2.301-2.301 8.634-8.634L13.696 3.4 2.76 9.733l-.001.001L0 11.196l2.76 1.464v.001l10.935 6.332 10.935-6.332 2.76-1.464-2.76-1.462-.008-.005-6.323-3.662z"
                  />
                </svg>
                Google Play
              </button>
            </div>
          </div>
          <div class="md:w-1/2 relative">
            <img
              src="https://via.placeholder.com/300x600/4299e1/ffffff?text=PrayerConnect+App"
              alt="PrayerConnect Mobile App"
              class="w-64 mx-auto"
              :style="{ transform: `translateY(${mobileAppOffset}px)` }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Start CTA -->
    <section class="py-24 bg-gray-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Ready to Start Your Prayer Journey?
        </h2>
        <button
          @click="startApp"
          class="px-8 py-4 bg-blue-600 text-white font-bold rounded-full text-lg hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200"
        >
          Join PrayerConnect Now
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white py-12">
      <div class="container mx-auto px-4 text-center text-gray-500">
        <p>
          &copy; {{ new Date().getFullYear() }} PrayerConnect. All rights
          reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useIntersectionObserver } from '@vueuse/core';

const router = useRouter();
const selectedLanguage = ref('en');
const showGetStarted = ref(false);
const quickPrayer = ref('');
const mobileAppSection = ref(null);
const mobileAppOffset = ref(0);
const animatedSections = ref([]);
const heroSection = ref(null);
const smallCircle = ref(null);
const circlePosition = ref({ x: 200, y: 50 });
const isHeroVisible = ref(false);
let animationFrameId = null;

const features = [
  {
    icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    title: 'Share Your Heart',
    description:
      'Submit prayer requests and receive support from a caring community',
  },
  {
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    title: 'Connect with Others',
    description: 'Join a global community of believers supporting each other',
  },
  {
    icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    title: 'Track Your Journey',
    description: 'See how God works through prayers and testimonies',
  },
];

const testimonials = [
  {
    quote:
      'PrayerConnect has transformed my spiritual life. I feel more connected to God and my community than ever before.',
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

const animatedCircles = [1, 2, 3];

const startApp = () => {
  router.push('/register');
};

const submitQuickPrayer = () => {
  // Here you would typically send the prayer to your backend
  console.log('Prayer submitted:', quickPrayer.value);
  quickPrayer.value = '';
  // You might want to show a success message to the user
};

const checkScroll = () => {
  const heroSection = document.querySelector('main');
  if (heroSection) {
    const rect = heroSection.getBoundingClientRect();
    showGetStarted.value = rect.bottom <= 0;
  }

  if (mobileAppSection.value) {
    const rect = mobileAppSection.value.getBoundingClientRect();
    const offset = Math.max(
      0,
      Math.min(200, (window.innerHeight - rect.top) / 2)
    );
    mobileAppOffset.value = offset - 100;
  }
};

const observeAnimatedSections = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  animatedSections.value.forEach((section) => {
    observer.observe(section);
  });
};

const moveCircle = () => {
  if (!isHeroVisible.value) return;

  // const angle = Math.random() * Math.PI * 2;
  // const distance = Math.random() * 40 + 20; // Reduced distance for slower movement
  const angle = Math.random() * Math.PI * 2;
  const distance = 1000;
  const newX = Math.cos(angle) * distance;
  const newY = Math.sin(angle) * distance;

  circlePosition.value = {
    x: circlePosition.value.x + newX / 10, // Divide by 10 for slower movement
    y: circlePosition.value.y + newY / 10, // Divide by 10 for slower movement
  };

  // Ensure the circle stays within bounds
  const maxDistance = 100; // Maximum distance from the center
  const currentDistance = Math.sqrt(
    circlePosition.value.x ** 2 + circlePosition.value.y ** 2
  );
  if (currentDistance > maxDistance) {
    const scale = maxDistance / currentDistance;
    circlePosition.value.x *= scale;
    circlePosition.value.y *= scale;
  }

  setTimeout(() => {
    animationFrameId = requestAnimationFrame(moveCircle);
  }, 2000);
};

const startAnimation = () => {
  if (!animationFrameId) {
    moveCircle();
  }
};

const stopAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

useIntersectionObserver(heroSection, ([{ isIntersecting }]) => {
  isHeroVisible.value = isIntersecting;
  if (isIntersecting) {
    console.log('isIntersecting');
    startAnimation();
  } else {
    console.log('isNOTIntersecting');
    stopAnimation();
  }
});

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  checkScroll();
  animatedSections.value = document.querySelectorAll('[ref="animatedSection"]');
  observeAnimatedSections();
  startAnimation();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
  stopAnimation();
});

watch(isHeroVisible, (newValue) => {
  if (newValue) {
    startAnimation();
  } else {
    stopAnimation();
  }
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.absolute {
  transition: transform 2s ease-out;
}
</style>
