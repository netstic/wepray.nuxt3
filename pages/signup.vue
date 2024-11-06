<template>
  <div class="layout-public-content-wrapper mx-auto bg-base-100">
    <div class="card-body gap-4 max-w-3xl mx-auto">
      <h2
        class="w-full text-3xl font-semibold text-gray-800 md:text-4xl aos-init aos-animate"
      >
        {{ $t('Sign Up') }}
      </h2>

      <p>
        <span class="text-primary font-medium">Faça a diferença!</span> Seja
        parte de uma comunidade engajada em oração e contribua para um mundo
        melhor.
      </p>

      <form class="form-control flex flex-col gap-4" @submit.prevent="onSubmit">
        <WeprayFormInput
          v-model="row.email"
          placeholder="E-mail"
          @keyup.enter="checkEmail"
        >
          <template #prepend>
            <IconEmail size="sm" />
          </template>
        </WeprayFormInput>

        <button
          v-if="!isEmailChecked"
          type="button"
          class="btn btn-primary"
          @click="checkEmail"
          :disabled="!row.email"
        >
          {{ $t('Check') }}
        </button>

        <template v-if="isEmailChecked">
          <WeprayFormInput v-model="row.name" placeholder="Name" />
          <WeprayFormInput v-model="row.username" placeholder="Nome de usuário">
            <template #prepend>
              <IconUser size="sm" />
            </template>
            <template #append>
              <div
                class="tooltip 2xl:tooltip-top tooltip-left"
                :data-tip="
                  $t('Examples: Name, Name.Lastname, Name_1, nickname')
                "
              >
                <IconQuestionCircleOutline />
              </div>
              <!-- <div
            v-if="!isCheckError('username')"
            class="flex items-center mt-1 mb-6 mx-3 font-light text-sm"
          >
            <i class="mdi mdi-information mr-1"></i>
            {{ $t('Examples: Name, Name.Lastname, Name_1, nickname') }}
          </div> -->
            </template>
          </WeprayFormInput>

          <div class="flex flex-col gap-4 md:grid md:grid-cols-12">
            <WeprayFormInput
              v-model="row.password"
              :type="isShowPassword ? 'text' : 'password'"
              placeholder="Senha"
              class="col-span-6"
            >
              <template #prepend>
                <IconKey size="sm" />
              </template>
              <template #append>
                <button type="button" @click="onShowPassword('password')">
                  <IconEyeOutline v-if="!isShowPassword" />
                  <IconEyeSlashOutline v-else />
                </button>
              </template>
            </WeprayFormInput>

            <WeprayFormInput
              v-model="row.password_confirmation"
              :type="isShowPasswordConfirmation ? 'text' : 'password'"
              placeholder="Confirme sua senha"
              class="col-span-6"
              label="test"
            >
              <template #prepend>
                <IconKey size="sm" />
              </template>
              <template #append>
                <button
                  type="button"
                  @click="onShowPassword('passwordConfirmation')"
                >
                  <IconEyeOutline v-if="!isShowPasswordConfirmation" />
                  <IconEyeSlashOutline v-else />
                </button>
              </template>
            </WeprayFormInput>
          </div>

          <!-- <div class="flex items-center justify-between mt-4 mx-2">
            <div class="w-full px-1 mb-6">
              <label
                name="name"
                class="block font-medium text-sm text-gray-700"
              >
                {{ $t('Name') }}
              </label>
              <t-input
                id="name"
                v-model="row.name"
                type="name"
                name="name"
                :variant="isCheckError('name') ? 'error' : undefined"
              ></t-input>
            </div>
          </div>
          <div class="flex items-center justify-between mt-4 mx-2">
            <div class="w-full px-1 mb-0">
              <label
                name="username"
                class="block font-medium text-sm text-gray-700"
              >
                {{ $t('Username') }}
              </label>
              <t-input
                id="username"
                v-model="row.username"
                type="username"
                name="username"
                :variant="isCheckError('username') ? 'error' : undefined"
                @blur="checkUsername"
              ></t-input>
            </div>
          </div>
          <div
            v-if="!isCheckError('username')"
            class="flex items-center mt-1 mb-6 mx-3 font-light text-sm"
          >
            <i class="mdi mdi-information mr-1"></i>
            {{ $t('Examples: Name, Name.Lastname, Name_1, nickname') }}
          </div>
          <div
            v-if="isCheckError('username')"
            class="flex items-center mt-1 mb-6 mx-3 font-light text-sm text-red-500"
          >
            <i class="mdi mdi-information mr-1"></i>
            {{ $t('Only letters, numbers and dot (.) are allowed.') }}
          </div>
          <div
            class="flex flex-col md:flex-row items-center justify-between mt-4 mx-2"
          >
            <div class="w-full px-1 mb-6">
              <label
                name="password"
                class="block font-medium text-sm text-gray-700"
              >
                {{ $t('Password') }}
              </label>
              <div class="relative">
                <t-input
                  id="password"
                  v-model="row.password"
                  :type="isShowPassword ? 'text' : 'password'"
                  name="password"
                  :variant="isCheckError('password') ? 'error' : undefined"
                  :placeholder="$t('at least 8 characters')"
                ></t-input>
                <div
                  class="absolute inset-y-1 right-1 pr-3 flex items-center text-lg"
                >
                  <button @click="onShowPasswords('password')">
                    <i v-if="!isShowPassword" class="mdi mdi-eye-outline"></i>
                    <i
                      v-if="isShowPassword"
                      class="mdi mdi-eye-remove text-red-500"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="w-full px-1 mb-6">
              <label
                name="password_confirmation"
                class="block font-medium text-sm text-gray-700"
              >
                {{ $t('Confirm password') }}
              </label>
              <div class="relative">
                <t-input
                  id="password_confirmation"
                  v-model="row.password_confirmation"
                  :type="isShowPasswordConfirmation ? 'text' : 'password'"
                  name="password_confirmation"
                  :variant="
                    isCheckError('password_confirmation') ? 'error' : undefined
                  "
                ></t-input>
                <div
                  class="absolute inset-y-1 right-1 pr-3 flex items-center text-lg"
                >
                  <button @click="onShowPassword('passwordConfirmation')">
                    <i
                      v-if="!isShowPasswordConfirmation"
                      class="mdi mdi-eye-outline"
                    ></i>
                    <i
                      v-if="isShowPasswordConfirmation"
                      class="mdi mdi-eye-remove text-red-500"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div> -->
        </template>
        <!-- <div class="md:flex items-center justify-between flex-col">
          <recaptcha
            id="g-recaptcha-2"
            class="inline-flex items-center px-4 py-2"
            @error="onRecaptchaError"
            @success="onRecaptchaSuccess"
            @expired="onRecaptchaExpired"
          />
        </div> -->

        <button v-if="isEmailChecked" type="submit" class="btn btn-primary">
          {{ $t('Send') }}
        </button>

        <div class="flex gap-4 items-center mt-6">
          <span class="font-semibold text-gray-600 md:text-lg"
            >Ou se preferir</span
          >
          <button class="btn btn-neutral-content flex-1">
            <IconGoogle />
            <span class="text-lg"> Entre com Google </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkEmailUserService, createUserService } from '~/services/user';
import type { ISignupForm } from '~/types/user/login';

useHead({
  title: 'SignUp - WePray',
});

const { login } = useAuth();

const row = ref<ISignupForm>({
  username: '',
  email: null,
  password: null,
  password_confirmation: null,
});

const isEmailChecked = ref(false);
const isShowPassword = ref(false);
const isShowPasswordConfirmation = ref(false);

const onShowPassword = (passwordTipo: 'password' | 'passwordConfirmation') => {
  if (passwordTipo == 'password') {
    return (isShowPassword.value = !isShowPassword.value);
  } else if (passwordTipo == 'passwordConfirmation') {
    return (isShowPasswordConfirmation.value =
      !isShowPasswordConfirmation.value);
  }
};

// const checkUsername = async () => {
//   const { username } = row;
//   try {
//     await useApi().post('/api/v1/pub/user/check', { username });
//     errors.value = {};
//     showForm.value = true;
//   } catch (err: any) {
//     errors.value = useHandleError(err);
//   }
// };

const checkEmail = async () => {
  if (!row.value.email) return;

  checkEmailUserService(row.value.email)
    .then(() => {
      isEmailChecked.value = true;
    })
    .catch((err) => useHandleError(err));
};

const onSubmit = async () => {
  const resCreate = createUserService(row.value);

  resCreate
    .then(() => {
      const resLogin = login({
        email: row.value.email!,
        password: row.value.password!,
      });

      resLogin.catch((err) => useHandleError(err));
    })
    .catch((err) => useHandleError(err));

  // try {
  //   await nuxtApp.$auth.loginWith('laravelSanctum', {
  //     data: row,
  //   });

  //   const layout = nuxtApp.$store.state.auth.loggedIn ? 'private' : 'public';
  //   nuxtApp.setLayout(layout);
  // } catch (err: any) {
  //   errors.value = useHandleError(err);
  // }
};

// const onError = (_e: unknown) => {
//   // Handle recaptcha error if needed
// };

// const onSuccess = (token: string) => {
//   row['g-recaptcha-response'] = token;
// };

// const onExpired = () => {
//   row['g-recaptcha-response'] = null;
// };
</script>
