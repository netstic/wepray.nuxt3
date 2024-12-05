<template>
  <transition name="fade" mode="out-in">
    <div v-if="!route.query.step" class="wp-loader-navigation">
      <LoaderNavigation />
    </div>
    <div v-else>
      <LayoutSessionHeader @back="goBack" />
      <LayoutSessionMain
        :class="[currentStep?.id === 'start' ? 'h-screen' : '']"
      >
        <transition name="fade" mode="out-in">
          <LayoutSessionMainContent
            v-if="currentStep"
            :key="currentStep.id"
            :title="$t(currentStep.title)"
            class="app-layout-width"
            :class="[currentStep?.id === 'start' ? 'pt-[64px] pb-[250px]' : '']"
          >
            <div
              v-if="currentStep.id === 'feature'"
              v-for="(item, index) in currentStep.options"
              :key="index"
              class="bg-white flex flex-col gap-2 sm:gap-4 lg:w-1/2 mx-auto w-full sm:w-2/3 dark:bg-gray-800 rounded-2xl p-4 transform transition-all duration-300 hover:scale-105"
            >
              <div
                class="flex items-center gap-4 text-blue-600 dark:text-blue-400"
              >
                <component :is="item.icon" v-if="item.icon" size="lg" />
                <h3 class="text-lg font-semibold">
                  {{ $t(item.title!) }}
                </h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                {{ $t(item.text) }}
              </p>
            </div>

            <div
              v-else-if="currentStep.id === 'start'"
              class="flex flex-1 flex-col gap-4 text-center my-auto justify-center items-center"
            >
              <h1 class="text-4xl font-bold">
                {{ $t('Lets start!') }}
              </h1>
              <h2 class="text-lg text-gray-700 dark:text-gray-300 max-w-lg">
                {{ $t(currentStep.options[0].text) }}
              </h2>
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
              <template v-if="currentStep.id === 'daily_goal'">
                <div class="w-full flex items-center gap-2 justify-between">
                  <span class="wp-btn-session-item-text">{{
                    $t(option.text)
                  }}</span>
                  <span class="text-gray-500 dark:text-gray-400">
                    {{ option.value }} {{ $t('prayers / day') }}
                  </span>
                </div>
              </template>
              <template v-else>
                <component
                  :is="option.icon"
                  v-if="option.icon"
                  class="wp-btn-session-item-icon"
                  size="xl"
                />
                <span class="wp-btn-session-item-text">{{
                  $t(option.text)
                }}</span>
              </template>
            </button>
          </LayoutSessionMainContent>
        </transition>
      </LayoutSessionMain>

      <LayoutSessionFooter>
        <template #append>
          <WeprayButton
            @click="nextStep"
            :disabled="!canContinue"
            :loading="isNextStepLoading"
            class="wp-btn-session-submit w-full sm:w-auto"
          >
            {{
              currentStep?.id === 'start' ? $t('Start Praying') : $t('Continue')
            }}
          </WeprayButton>
        </template>
      </LayoutSessionFooter>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import AlarmOutline from '~/components/icon/AlarmOutline.vue';
import UserHeartOutline from '~/components/icon/UserHeartOutline.vue';
import BookOutline from '~/components/icon/BookOutline.vue';
import HeartShareOutline from '~/components/icon/HeartShareOutline.vue';
import UsersGroupOutline from '~/components/icon/UsersGroupOutline.vue';
import StarsOutline from '~/components/icon/StarsOutline.vue';
import { updateGuestWelcomeService } from '~/services/guest';

definePageMeta({
  colorMode: 'dark',
});

const { guest } = useAuth();
const isNextStepLoading = ref(false);
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
      text: 'Daily prayer routine',
      icon: markRaw(AlarmOutline),
    },
    {
      value: 'community_connection',
      text: 'Connect with community',
      icon: markRaw(UserHeartOutline),
    },
    {
      value: 'study_prayer',
      text: 'Find new ways to pray',
      icon: markRaw(BookOutline),
    },
  ],
  feature: [
    {
      title: 'Upgrade your prayer life',
      text: 'Take your prayer life to a new level, receiving new requests and suggestions daily',
      icon: markRaw(StarsOutline),
    },
    {
      title: 'Share your heart',
      text: 'Submit prayer requests and receive support from a caring community',
      icon: markRaw(HeartShareOutline),
    },
    {
      title: 'Connect with Others',
      text: 'Help other people praying for them and sending encouragement messages',
      icon: markRaw(UsersGroupOutline),
    },
  ],
  daily: [
    {
      value: 3,
      text: "I'm new to praying",
      // icon: markRaw(ThreeSmall),
    },
    {
      value: 5,
      text: 'I already pray daily',
      // icon: markRaw(FiveSmall),
    },
    {
      value: 10,
      text: 'I want to grow',
      // icon: markRaw(TenSmall),
    },
    {
      value: 20,
      text: 'I want a challenge',
      // icon: markRaw(TwentySmall),
    },
  ],
  start: [
    {
      text: 'Start your first prayer session, praying for the requests we have specially prepared for you.',
    },
  ],
};

interface IStepper {
  id: string;
  title: string;
  options: IStepperOption[];
  selectedOption: IStepperOption | null | { value: true };
}

const stepper = ref<IStepper[]>([
  {
    id: 'goal',
    title: 'My goal is...',
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
    id: 'daily_goal',
    title: 'What is your daily goal?',
    options: stepperOptions.daily,
    selectedOption: null,
  },
  {
    id: 'start',
    title: '',
    options: stepperOptions.start,
    selectedOption: { value: true },
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

const nextStep = async () => {
  if (!currentStep.value) return;
  isNextStepLoading.value = true;
  const currentStepIndex = stepper.value.indexOf(currentStep.value);

  if (!['feature', 'start'].includes(currentStep.value?.id) && guest.value) {
    if (currentStep.value?.id === 'goal') {
      guest.value.goal = currentStep.value?.selectedOption?.value as string;
    } else if (currentStep.value?.id === 'daily_goal') {
      guest.value.daily_goal = currentStep.value?.selectedOption
        ?.value as number;
    }

    await updateGuestWelcomeService(guest.value);
  }

  isNextStepLoading.value = false;

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
  if (route.query.step) {
    currentStep.value = stepper.value.find(
      (step) => step.id === route.query.step
    );
  }
});

onBeforeMount(() => {
  if (!route.query.step) {
    navigateTo({ name: 'welcome', query: { step: stepper.value[0].id } });
  }

  useAuth().guestLoginOrCreate();
});
</script>
