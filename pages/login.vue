<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="w-full max-w-sm p-4 bg-white bg-opacity-60 rounded-lg sm:p-6 md:p-8"
    >
      <img
        class="px-8"
        src="~~/assets/images/toyota-logo.png"
        alt="Toyota Logo"
      />
      <hr class="mt-6 mb-4 h-0.5 border-t-0 bg-slate-800" />
      <form class="space-y-6" @submit.prevent="submitChange">
        <h5 class="text-xl font-medium text-center">
          {{ t("title") }}
        </h5>
        <div>
          <label for="username" class="block mb-2 text-sm font-medium">{{
            t("auth.username")
          }}</label>
          <input
            id="username"
            v-model="username"
            type="text"
            name="text"
            class="bg-sky-200 border border-sky-300 outline-none placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium">{{
            t("auth.password")
          }}</label>
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            placeholder="••••••••"
            autocomplete="on"
            class="bg-sky-200 border border-sky-300 outline-none placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="rememberMe"
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 accent-sky-400 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-500 ring-offset-gray-800 focus:ring-offset-gray-800"
              />
            </div>
            <label for="rememberMe" class="ml-2 text-sm font-medium">{{
              t("auth.rememberMe")
            }}</label>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full text-white bg-sky-400 hover:bg-sky-700 focus:ring-2 focus:outline-none focus:ring-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {{ t("auth.signIn") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
import { useAuthStore } from "~~/stores/auth";
import { regex } from "~~/constants";
import { LoginForm } from "~~/data/interfaces/auth";

const { t } = useI18n();

definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();

const loginSchema = {
  username(value: string | null) {
    if (!value) {
      return t("errors.usernameRequired");
    }
    return true;
  },
  password(value: string | null) {
    if (!value) {
      return t("errors.passwordRequired");
    }
    if (!value.match(regex.passwordRegex)) {
      return t("errors.passwordMinLength");
    }
    return true;
  },
  rememberMe() {
    return true;
  },
};

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    username: getRememberMe() ?? "",
    password: "",
    rememberMe: !!getRememberMe(),
  },
});

const { value: username } = useField("username", loginSchema.username);
const { value: password } = useField("password", loginSchema.password);
const { value: rememberMe } = useField("rememberMe", loginSchema.rememberMe);

const submitChange = handleSubmit(async (values: LoginForm) => {
  await authStore.login(values);
});
</script>
