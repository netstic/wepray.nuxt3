<template>
  <transition name="fade" mode="out-in">
    <div v-if="!route.query.step" class="wp-loader-navigation">
      <LoaderNavigation />
    </div>
    <div
      class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
      v-else
    >
      <LayoutSessionHeader @back="goBack" />
      <LayoutSessionMain>
        <transition name="fade" mode="out-in">
          <LayoutSessionMainContent
            v-if="currentStep"
            :key="currentStep.id"
            :title="currentStep.title"
            class="app-layout-width"
          >
            <div
              v-if="currentStep.id === 'feature'"
              v-for="(item, index) in currentStep.options"
              :key="index"
              class="bg-white flex gap-4 lg:w-1/2 mx-auto w-full sm:w-2/3 dark:bg-gray-800 rounded-lg p-4 transform transition-all duration-300 hover:scale-105"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                class="w-16 h-16 text-blue-600 dark:text-blue-400"
              />
              <div class="flex-1">
                <h3
                  class="text-lg flex items-center font-semibold mb-2 text-blue-600 dark:text-blue-400"
                >
                  {{ item.title }}
                </h3>
                <p class="text-gray-700 dark:text-gray-300">
                  {{ item.text }}
                </p>
              </div>
            </div>
            <button
              v-else
              v-for="(option, optionId) in currentStep.options"
              :key="optionId"
              @click="selectOption(option)"
              class="wp-btn-session-item-raw lg:w-1/2 mx-auto w-full sm:w-2/3"
              :class="[
                isSelected(option)
                  ? 'wp-btn-session-item-selected'
                  : 'wp-btn-session-item-unselected',
              ]"
            >
              <component
                :is="option.icon"
                v-if="option.icon"
                class="wp-btn-session-item-icon"
              />
              <span class="wp-btn-session-item-text">{{ option.text }}</span>
            </button>
          </LayoutSessionMainContent>
        </transition>
      </LayoutSessionMain>
      <LayoutSessionFooter>
        <div class="flex-1 flex justify-end">
          <button
            @click="nextStep"
            :disabled="!canContinue"
            class="wp-btn-session-submit flex-1 sm:flex-none"
          >
            Continue
          </button>
        </div>
      </LayoutSessionFooter>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Wp from '~/components/logo/Wp.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
  colorMode: 'dark',
  middleware: (from) => {
    if ((useCookie('welcome').value as any)?.daily) {
      return navigateTo('/pray');
    }
  },
});

const { t } = useI18n();

const { welcomeCookie, setWelcomeCookie } = useSession();

const route = useRoute();

interface IStepperOption {
  title?: string;
  value?: string | number;
  text: string;
  icon?: any;
}
const stepperOptions: Record<string, IStepperOption[]> = {
  goal: [
    {
      value: 'daily_habit',
      text: t('Daily prayer routine'),
      icon: markRaw(Wp),
    },
    {
      value: 'community_connection',
      text: t('Connect with prayer community'),
      icon: markRaw(Wp),
    },
    {
      value: 'study_prayer',
      text: t('Find new ways to pray'),
      icon: markRaw(Wp),
    },
  ],
  feature: [
    {
      title: t('Upgrade your prayer life'),
      text: t(
        'Take your prayer life to a new level, receiving new requests and suggestions daily'
      ),
      icon: markRaw(Wp),
    },
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
    selectedOption: { value: true },
  },
  {
    id: 'daily',
    title: 'What is your daily goal?',
    options: stepperOptions.daily,
    selectedOption: null,
  },
]);

const currentStep = ref(
  stepper.value.find((step) => step.id === route.query.step)
);

const canContinue = computed(() => {
  return !!currentStep.value?.selectedOption?.value;
});

const selectOption = (option: any) => {
  if (!currentStep.value) return;
  currentStep.value.selectedOption = option;
};

const isSelected = (option: any) => {
  return currentStep.value?.selectedOption === option;
};

const nextStep = () => {
  if (!currentStep.value) return;
  const currentStepIndex = stepper.value.indexOf(currentStep.value);

  if (currentStep.value?.id !== 'feature') {
    if (!welcomeCookie.value) {
      setWelcomeCookie({});
    }

    welcomeCookie.value[currentStep.value?.id] =
      currentStep.value?.selectedOption?.value;

    setWelcomeCookie(welcomeCookie.value);
  }

  if (currentStepIndex < stepper.value.length - 1) {
    return navigateTo({
      name: 'welcome',
      query: { step: stepper.value[currentStepIndex + 1].id },
    });
  }

  navigateTo('/session');
};

const goBack = () => {
  if (!currentStep.value) return;
  const currentStepIndex = stepper.value.indexOf(currentStep.value);
  if (currentStepIndex > 0) {
    return navigateTo({
      name: 'welcome',
      query: { step: stepper.value[currentStepIndex - 1].id },
    });
  }
  navigateTo('/pray');
};

watch(route, () => {
  currentStep.value = stepper.value.find(
    (step) => step.id === route.query.step
  );
});

onBeforeMount(() => {
  if (!route.query.step) {
    navigateTo({ name: 'welcome', query: { step: stepper.value[0].id } });
  }
});

onMounted(() => {
  if (!welcomeCookie.value) {
    setWelcomeCookie({});
  }
});
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
