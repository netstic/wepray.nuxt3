<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 w-full h-full bg-black/50 z-[9998]"
    >
      <div class="app-layout-width mx-auto relative">
        <button
          @click="closeModal"
          class="relative top-4 left-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <IconX />
        </button>
      </div>
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
              v-if="currentStep.id === 'start'"
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
              <component
                :is="option.icon"
                v-if="option.icon"
                class="wp-btn-session-item-icon"
                size="xl"
              />
              <span class="wp-btn-session-item-text">{{
                $t(option.text)
              }}</span>
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
import { updateGuestWelcomeService } from '~/services/guest';

const { guest } = useAuth();
const isOpen = ref(false);
const isNextStepLoading = ref(false);

interface IStepperOption {
  title?: string;
  value?: string | number;
  text: string;
  icon?: any;
}
const stepperOptions: Record<string, IStepperOption[]> = {
  daily: [
    {
      value: 3,
      text: "3 Prayers per day - I'm new to praying",
      // icon: markRaw(ThreeSmall),
    },
    {
      value: 5,
      text: '5 Prayers per day - I already pray daily',
      // icon: markRaw(FiveSmall),
    },
    {
      value: 10,
      text: '10 Prayers per day - I want to grow',
      // icon: markRaw(TenSmall),
    },
    {
      value: 20,
      text: '20 Prayers per day - I want a challenge',
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

const currentStep = ref(stepper.value[0]);

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

  if (!['start'].includes(currentStep.value?.id) && guest.value) {
    if (currentStep.value?.id === 'daily_goal') {
      guest.value.daily_goal = currentStep.value?.selectedOption
        ?.value as number;
    }

    await updateGuestWelcomeService(guest.value);
  }

  isNextStepLoading.value = false;

  if (currentStepIndex < stepper.value.length - 1) {
    return (currentStep.value = stepper.value[currentStepIndex + 1]);
  }

  closeModal();
  navigateTo('/session');
};

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<style scoped></style>
