<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <LogoWp size="xl" class="text-blue-600 dark:text-blue-400" />
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >{{ userStreak }} day streak</span
              >
            </div>
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                v-if="isDarkMode"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
            <Avatar :username="'Eu'" :alt="'Eu'" />
            <!-- <img class="h-8 w-8 rounded-full" src="" alt="User avatar" /> -->
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Daily Progress -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Daily Progress
          </h2>
          <span class="text-sm text-gray-500 dark:text-gray-400"
            >{{ completedToday }}/{{ dailyGoal }} prayers today</span
          >
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            class="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            :style="{ width: `${(completedToday / dailyGoal) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Prayer Sessions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Quick Prayer -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Quick Prayer
              </h3>
              <span
                class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-medium px-2.5 py-0.5 rounded"
                >5 min</span
              >
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Start a quick prayer session to maintain your daily streak.
            </p>
            <button
              @click="navigateTo('/session')"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Start Session
            </button>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-6 py-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400"
                >Completed today</span
              >
              <span class="font-medium text-gray-900 dark:text-white">{{
                quickPrayerCount
              }}</span>
            </div>
          </div>
        </div>

        <!-- Community Prayer -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Community Prayer
              </h3>
              <span
                class="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-xs font-medium px-2.5 py-0.5 rounded"
                >15 min</span
              >
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Join others in prayer and share your prayer intentions.
            </p>
            <button
              @click="startSession('community')"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Join Session
            </button>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-6 py-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Active now</span>
              <span class="font-medium text-gray-900 dark:text-white"
                >{{ activeUsers }} people</span
              >
            </div>
          </div>
        </div>

        <!-- Guided Prayer -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Guided Prayer
              </h3>
              <span
                class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded"
                >10 min</span
              >
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Follow a structured prayer session with guidance.
            </p>
            <button
              @click="startSession('guided')"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Start Guide
            </button>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-6 py-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400"
                >Available guides</span
              >
              <span class="font-medium text-gray-900 dark:text-white">{{
                guidedSessions
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievement Section -->
      <div class="mt-8 relative">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Achievements
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          <div
            v-if="!isLoggedIn"
            class="absolute rounded-lg inset-0 bg-white dark:bg-gray-800 background-opacity-75 flex items-center justify-center"
          >
            <div class="text-center">
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
              >
                Unlock Achievements!
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Sign up to track your progress and earn special achievements on
                your prayer journey.
              </p>
              <button
                @click="navigateToSignUp"
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Sign Up Now
              </button>
            </div>
          </div>
          <div
            v-for="achievement in recentAchievements"
            :key="achievement.id"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center text-center"
          >
            <div
              class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2"
            >
              <component
                :is="achievement.icon"
                class="h-6 w-6 text-blue-600 dark:text-blue-400"
              />
            </div>
            <h3 class="font-medium text-gray-900 dark:text-white text-sm">
              {{ achievement.title }}
            </h3>
            <p class="text-gray-500 dark:text-gray-400 text-xs">
              {{ achievement.description }}
            </p>
          </div>
        </div>

        <!-- Overlay for non-registered users -->
        <!-- <div
          v-if="!isLoggedIn"
          class="absolute inset-0 bg-white dark:bg-gray-800 background-opacity-75 flex items-center justify-center"
        >
          <div class="text-center">
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              Unlock Achievements!
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Sign up to track your progress and earn special achievements on
              your prayer journey.
            </p>
            <button
              @click="navigateToSignUp"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Sign Up Now
            </button>
          </div>
        </div> -->
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'application',
  middleware: 'welcome',
  colorMode: 'dark',
});

const router = useRouter();

// User stats
const userStreak = ref(7);
const completedToday = ref(3);
const dailyGoal = ref(5);
const quickPrayerCount = ref(2);
const activeUsers = ref(124);
const guidedSessions = ref(15);
const isDarkMode = ref(false);

// New: Login state
const isLoggedIn = ref(false);

// Recent achievements
const recentAchievements = ref([
  {
    id: 1,
    title: '7 Day Streak',
    description: 'Completed prayers for 7 days in a row',
    icon: 'FireIcon',
  },
  {
    id: 2,
    title: 'Community Leader',
    description: 'Joined 5 community prayer sessions',
    icon: 'UsersIcon',
  },
  {
    id: 3,
    title: 'Early Bird',
    description: 'Completed morning prayer 3 days in a row',
    icon: 'SunIcon',
  },
  {
    id: 4,
    title: 'Guide Master',
    description: 'Completed all beginner guided prayers',
    icon: 'StarIcon',
  },
]);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark');
};

const startSession = (type) => {
  router.push(`/prayer-session/${type}`);
};

// New: Navigation to sign up page
const navigateToSignUp = () => {
  navigateTo('/register');
};
</script>

<style>
.background-opacity-75 {
  --tw-bg-opacity: 0.8;
}
</style>
