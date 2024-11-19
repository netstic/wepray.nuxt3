<template>
  <div
    class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <LayoutSessionHeader
      :progress="{
        barWidth: progress,
        todayGoalCount: stepper.indexOf(currentStep),
        dailyGoalCount: goalCount,
      }"
      @back="goBack"
    />

    <LayoutSessionMain>
      <LayoutSessionMainContent title="Prayer Session" class="app-layout-width">
        <button
          class="text-left px-6 py-8 rounded-lg transition-colors duration-200 flex items-center bg-white dark:border shadow dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Prayer of Week
        </button>

        <div class="flex flex-col sm:grid sm:grid-cols-2 gap-4">
          <button
            class="text-left px-6 py-6 rounded-lg transition-colors duration-200 flex items-center bg-white dark:border shadow dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Community Prayers
          </button>
          <button
            class="text-left px-6 py-6 rounded-lg transition-colors duration-200 flex items-center bg-white dark:border shadow dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            World Missions
          </button>
          <button
            class="text-left px-6 py-6 rounded-lg transition-colors duration-200 flex items-center bg-white dark:border shadow dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Family Intercessory
          </button>
          <button
            class="text-left px-6 py-6 rounded-lg transition-colors duration-200 flex items-center bg-white dark:border shadow dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Friends Intercessory
          </button>
        </div>
      </LayoutSessionMainContent>
    </LayoutSessionMain>

    <LayoutSessionFooter>
      <template #append>
        <button
          @click="nextStep"
          :disabled="!canContinue"
          class="wp-btn-session-submit"
        >
          Continue
        </button>
      </template>
    </LayoutSessionFooter>
  </div>
</template>

<script setup>
import Wp from '~/components/logo/Wp.vue';
import { ref, computed, markRaw } from 'vue';

definePageMeta({
  colorMode: 'dark',
});

const { t } = useI18n();

const stepperOptions = {
  goal: [
    { value: 'daily', text: 'Daily prayer routine', icon: markRaw(Wp) },
    {
      value: 'community',
      text: 'Connect with prayer community',
      icon: markRaw(Wp),
    },
    { value: 'study', text: 'Study scripture', icon: markRaw(Wp) },
  ],
  feature: [
    {
      title: t('Share your heart'),
      text: t(
        'Submit prayer requests and receive support from a caring community'
      ),
      icon: markRaw(Wp),
    },
    {
      title: t('Connect with Others'),
      text: t(
        'Help other people praying for them and sending encouragement messages'
      ),
      icon: markRaw(Wp),
    },
    {
      title: t('Track Your Journey'),
      text: t(
        'Create the habit of praying, receiving new requests and suggestions daily'
      ),
      icon: markRaw(Wp),
    },
  ],
  daily: [
    { value: 3, text: "3 Prayers / Day - I'm new to praying" },
    { value: 5, text: '5 Prayers / Day - I already pray daily' },
    { value: 10, text: "10 Prayers / Day - I'm growing" },
    { value: 20, text: '20+ Prayers / Day - I want to challenge myself' },
  ],
};

const stepper = ref([
  {
    id: 'goal',
    title: 'Choose your goal...',
    options: stepperOptions.goal,
    selectedOption: null,
  },
  {
    id: 'feature',
    title: 'We can help you!',
    options: stepperOptions.feature,
    selectedOption: true,
  },
  {
    id: 'daily',
    title: 'What is your daily goal?',
    options: stepperOptions.daily,
    selectedOption: null,
  },
]);

const currentStep = ref(stepper.value[0]);

const goalCount = ref(stepper.value.length);
const progress = computed(
  () => (stepper.value.indexOf(currentStep.value) / goalCount.value) * 100
);

const canContinue = computed(() => {
  return currentStep.value.selectedOption !== null;
});

const selectOption = (option) => {
  currentStep.value.selectedOption = option;
};

const isSelected = (option) => {
  return currentStep.value.selectedOption === option;
};

const nextStep = () => {
  const currentStepIndex = stepper.value.indexOf(currentStep.value);
  if (currentStepIndex < stepper.value.length - 1) {
    return (currentStep.value = stepper.value[currentStepIndex + 1]);
  }
  startJourney();
};

const goBack = () => {
  const currentStepIndex = stepper.value.indexOf(currentStep.value);
  if (currentStepIndex > 0) {
    return (currentStep.value = stepper.value[currentStepIndex - 1]);
  }
  navigateTo('/pray');
};

const startJourney = () => {
  console.log('Starting journey with:', {
    goal: currentStep.value.selectedOption,
    time: currentStep.value.selectedOption,
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
