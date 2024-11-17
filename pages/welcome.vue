<template>
  <div
    class="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4"
  >
    <div class="w-full max-w-md">
      <transition name="fade" mode="out-in">
        <div v-if="currentStep === 'goal'" key="goal" class="space-y-6">
          <h1 class="text-3xl font-bold text-center mb-8">Choose your goal</h1>
          <button
            v-for="goal in goals"
            :key="goal.id"
            @click="selectGoal(goal.id)"
            class="w-full text-left px-6 py-4 bg-gray-800 rounded-lg transition-colors duration-200 flex items-center hover:bg-gray-700"
          >
            <component :is="goal.icon" class="w-6 h-6 mr-4 text-blue-400" />
            <span class="text-lg font-medium">{{ goal.text }}</span>
          </button>
        </div>

        <div v-else-if="currentStep === 'time'" key="time" class="space-y-6">
          <h2 class="text-3xl font-bold text-center mb-8">
            How much time can you dedicate daily?
          </h2>
          <button
            v-for="time in times"
            :key="time.value"
            @click="selectTime(time.value)"
            class="w-full text-left px-6 py-4 bg-gray-800 rounded-lg transition-colors duration-200 hover:bg-gray-700"
          >
            <span class="text-lg font-medium">{{ time.text }}</span>
          </button>
        </div>

        <div
          v-else-if="currentStep === 'summary'"
          key="summary"
          class="space-y-6"
        >
          <h2 class="text-3xl font-bold text-center mb-8">
            Your Prayer Journey
          </h2>
          <div class="bg-gray-800 rounded-lg p-6">
            <p class="text-lg mb-4">
              Your goal:
              <span class="font-semibold">{{ getGoalText(selectedGoal) }}</span>
            </p>
            <p class="text-lg mb-4">
              Daily commitment:
              <span class="font-semibold">{{ getTimeText(selectedTime) }}</span>
            </p>
          </div>
          <button
            @click="startJourney"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Start Your Prayer Journey
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentStep = ref('goal');
const selectedGoal = ref('');
const selectedTime = ref(null);

const goals = [
  { id: 'daily', text: 'Daily prayer routine', icon: 'CalendarIcon' },
  { id: 'community', text: 'Connect with prayer community', icon: 'UsersIcon' },
  { id: 'study', text: 'Study scripture', icon: 'BookOpenIcon' },
];

const times = [
  { value: 5, text: '5 minutes' },
  { value: 10, text: '10 minutes' },
  { value: 15, text: '15 minutes' },
  { value: 20, text: '20+ minutes' },
];

const selectGoal = (goal) => {
  selectedGoal.value = goal;
  currentStep.value = 'time';
};

const selectTime = (time) => {
  selectedTime.value = time;
  currentStep.value = 'summary';
};

const getGoalText = (goalId) => {
  const goal = goals.find((g) => g.id === goalId);
  return goal ? goal.text : '';
};

const getTimeText = (timeValue) => {
  const time = times.find((t) => t.value === timeValue);
  return time ? time.text : '';
};

const startJourney = () => {
  console.log('Starting journey with:', {
    goal: selectedGoal.value,
    time: selectedTime.value,
  });
  // Here you would typically navigate to the next page or start the user's journey
  // For example: router.push('/dashboard')
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
