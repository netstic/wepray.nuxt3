<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
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
            <span class="text-xl font-bold text-blue-600">PrayerConnect</span>
          </div>
          <button
            @click="toggleMenu"
            class="text-gray-600 focus:outline-none focus:text-gray-900"
          >
            <svg
              v-if="!isMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div v-if="isMenuOpen" class="mt-4 py-2 border-t border-gray-200">
          <a href="#" class="block py-2 text-gray-600 hover:text-gray-900"
            >Home</a
          >
          <a href="#" class="block py-2 text-gray-600 hover:text-gray-900"
            >Features</a
          >
          <a href="#" class="block py-2 text-gray-600 hover:text-gray-900"
            >Testimonials</a
          >
          <a href="#" class="block py-2 text-gray-600 hover:text-gray-900"
            >Download App</a
          >
          <div class="relative mt-2">
            <select
              v-model="selectedLanguage"
              class="block w-full py-2 pl-3 pr-10 text-gray-600 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
            <svg
              class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <main ref="heroSection" class="container mx-auto px-4 pt-24 pb-12">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 leading-tight mb-4">
          Connect Through Prayer Every Day
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Join millions of people sharing prayers, supporting each other, and
          growing in faith together.
        </p>
        <button
          @click="startApp"
          class="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg transition-colors transform hover:scale-105 duration-200 mb-4"
        >
          Get Started
        </button>
        <p class="text-gray-500 text-sm">
          100% free • No ads • Spread love through prayer
        </p>
      </div>
      <div class="relative mt-12 h-64">
        <div
          ref="smallCircle"
          class="absolute w-32 h-32 bg-blue-100 rounded-full opacity-50"
          :style="{
            transform: `translate(${circlePosition.x}px, ${circlePosition.y}px)`,
            transition: 'transform 2s ease-out',
          }"
        ></div>
        <div class="absolute inset-0 flex justify-center items-center">
          <div
            class="w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-24 h-24 text-white animate-pulse"
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
    </main>

    <!-- Quick Prayer Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          Share a Quick Prayer
        </h2>
        <form @submit.prevent="submitQuickPrayer" class="max-w-md mx-auto">
          <div class="flex flex-col gap-4">
            <input
              v-model="quickPrayer"
              type="text"
              placeholder="Type your prayer here..."
              class="w-full px-4 py-2 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              class="w-full px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
            >
              Share Prayer
            </button>
          </div>
        </form>
        <p class="mt-4 text-center text-gray-600">
          Your prayer will be shared anonymously with our community
        </p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">
          Why Join PrayerConnect?
        </h2>
        <div class="space-y-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="text-center"
          >
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <component :is="feature.icon" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">
          Testimonials
        </h2>
        <div class="space-y-6">
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
    <section class="py-12 bg-blue-600">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold text-white mb-6">
          Take PrayerConnect Everywhere
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Download our mobile app and stay connected with your prayer community
          anytime, anywhere.
        </p>
        <div class="flex flex-col gap-4">
          <button
            class="w-full bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 3v18m0 0l-8-8m8 8l8-8m-9 0h18"
              />
            </svg>
            App Store
          </button>
          <button
            class="w-full bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            Google Play
          </button>
        </div>
      </div>
    </section>

    <!-- Start CTA -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Ready to Start Your Prayer Journey?
        </h2>
        <button
          @click="startApp"
          class="w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-full text-lg hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200"
        >
          Join PrayerConnect Now
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white py-8">
      <div class="container mx-auto px-4 text-center text-gray-500">
        <p>
          &copy; {{ new Date().getFullYear() }} PrayerConnect. All rights
          reserved.
        </p>
      </div>
    </footer>

    <!-- Floating Get Started Button -->
    <button
      v-if="showGetStarted"
      @click="startApp"
      class="fixed bottom-4 right-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
    >
      Get Started
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMenuOpen = ref(false);
const selectedLanguage = ref('en');
const showGetStarted = ref(false);
const quickPrayer = ref('');
const circlePosition = ref({ x: 0, y: 0 });
const heroSection = ref(null);
const smallCircle = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const startApp = () => {
  router.push('/register');
};

const submitQuickPrayer = () => {
  console.log('Prayer submitted:', quickPrayer.value);
  quickPrayer.value = '';
  // You might want to show a success message to the user
};

const checkScroll = () => {
  if (heroSection.value) {
    const rect = heroSection.value.getBoundingClientRect();
    showGetStarted.value = rect.bottom <= 0;
  }
};

const moveCircle = () => {
  if (!smallCircle.value) return;

  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 20 + 10; // Reduced distance for mobile
  const newX = Math.cos(angle) * distance;
  const newY = Math.sin(angle) * distance;

  circlePosition.value = {
    x: circlePosition.value.x + newX / 10,
    y: circlePosition.value.y + newY / 10,
  };

  const maxDistance = 50; // Maximum distance from the center for mobile
  const currentDistance = Math.sqrt(
    circlePosition.value.x ** 2 + circlePosition.value.y ** 2
  );
  if (currentDistance > maxDistance) {
    const scale = maxDistance / currentDistance;
    circlePosition.value.x *= scale;
    circlePosition.value.y *= scale;
  }

  requestAnimationFrame(moveCircle);
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  moveCircle();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});

const features = [
  {
    icon: 'Heart',
    title: 'Share Your Heart',
    description:
      'Submit prayer requests and receive support from a caring community',
  },
  {
    icon: 'Users',
    title: 'Connect with Others',
    description: 'Join a global community of believers supporting each other',
  },
  {
    icon: 'Star',
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
</style>
