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
            :title="currentStep.title"
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
                  {{ item.title }}
                </h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                {{ item.text }}
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
                {{ currentStep.options[0].text }}
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
              <component
                :is="option.icon"
                v-if="option.icon"
                class="wp-btn-session-item-icon"
                size="xl"
              />
              <span class="wp-btn-session-item-text">{{ option.text }}</span>
            </button>
          </LayoutSessionMainContent>
        </transition>
      </LayoutSessionMain>

      <LayoutSessionFooter>
        <template #append>
          <button
            @click="nextStep"
            :disabled="!canContinue"
            class="wp-btn-session-submit w-full sm:w-auto"
          >
            {{
              currentStep?.id === 'start' ? t('Start Praying') : t('Continue')
            }}
          </button>
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
import ThreeSmall from '~/components/icon/ThreeSmall.vue';
import FiveSmall from '~/components/icon/FiveSmall.vue';
import TenSmall from '~/components/icon/TenSmall.vue';
import TwentySmall from '~/components/icon/TwentySmall.vue';
import { useWelcomeSession } from '~/composables/useWelcomeSession';

definePageMeta({
  colorMode: 'dark',
  middleware: (from) => {
    const { guest, isLoggedIn, isGuestLoggedIn, guestLoginOrCreate } =
      useAuth();
    if (guest.value?.daily_goal || isLoggedIn.value) {
      return navigateTo('/pray');
    }

    if (!isGuestLoggedIn.value) {
      guestLoginOrCreate();
    }
  },
});

const { t } = useI18n();

const { welcomeCookie, setWelcomeCookie } = useWelcomeSession();

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
      icon: markRaw(AlarmOutline),
    },
    {
      value: 'community_connection',
      text: t('Connect with community'),
      icon: markRaw(UserHeartOutline),
    },
    {
      value: 'study_prayer',
      text: t('Find new ways to pray'),
      icon: markRaw(BookOutline),
    },
  ],
  feature: [
    {
      title: t('Upgrade your prayer life'),
      text: t(
        'Take your prayer life to a new level, receiving new requests and suggestions daily'
      ),
      icon: markRaw(StarsOutline),
    },
    {
      title: t('Share your heart'),
      text: t(
        'Submit prayer requests and receive support from a caring community'
      ),
      icon: markRaw(HeartShareOutline),
    },
    {
      title: t('Connect with Others'),
      text: t(
        'Help other people praying for them and sending encouragement messages'
      ),
      icon: markRaw(UsersGroupOutline),
    },
  ],
  daily: [
    {
      value: 3,
      text: t("I'm new to praying"),
      icon: markRaw(ThreeSmall),
    },
    {
      value: 5,
      text: t('I already pray daily'),
      icon: markRaw(FiveSmall),
    },
    {
      value: 10,
      text: t("I'm growing"),
      icon: markRaw(TenSmall),
    },
    {
      value: 20,
      text: t('I want a challenge'),
      icon: markRaw(TwentySmall),
    },
  ],
  start: [
    {
      text: t(
        'Start your first prayer session, praying for the requests we have specially prepared for you.'
      ),
    },
  ],
};

const stepper = ref([
  {
    id: 'goal',
    title: t('My goal is...'),
    options: stepperOptions.goal,
    selectedOption: null,
  },
  {
    id: 'feature',
    title: t('We can help you!'),
    options: stepperOptions.feature,
    selectedOption: { value: true },
  },
  {
    id: 'daily_goal',
    title: t('What is your daily goal?'),
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

const nextStep = () => {
  if (!currentStep.value) return;
  const currentStepIndex = stepper.value.indexOf(currentStep.value);

  if (!['feature', 'start'].includes(currentStep.value?.id)) {
    if (!welcomeCookie.value) {
      setWelcomeCookie({});
    }

    if (currentStep.value?.id === 'daily_goal') {
      welcomeCookie.value.isFirstTimeUser = true;
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
});
</script>
