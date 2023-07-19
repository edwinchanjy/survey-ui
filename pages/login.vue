<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow sm:p-6 md:p-8"
    >
      <form class="space-y-6" @submit.prevent="submitChange">
        <h5 class="text-xl font-medium text-white text-center">
          {{ t("title") }}
        </h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-white"
            >{{ t("auth.email") }}</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            class="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-white"
            >{{ t("auth.password") }}</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            placeholder="••••••••"
            autocomplete="on"
            class="bg-gray-600 border border-gray-500 placeholder-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 accent-primary border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-primary ring-offset-gray-800 ocus:ring-offset-gray-800"
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-300"
              >{{ t("auth.rememberMe") }}</label
            >
          </div>
          <a href="#" class="ml-auto text-sm text-blue-500 hover:underline">{{
            t("auth.forgotPassword")
          }}</a>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {{ t("auth.signIn") }}
          </button>
        </div>
        <v-divider />
        <div class="text-center text-xs font">
          <span class="text-slate-300 mr-1">{{ t("auth.signUp.text1") }}</span>
          <a href="#" class="text-blue-500 hover:underline">{{
            t("auth.signUp.text2")
          }}</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, useForm, useField } from "vee-validate";
import { useAuthStore } from "~~/stores/auth";
import { regex } from "~~/constants";
import { LoginForm } from "~~/data/interfaces/auth";

definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Toyota Evaluation System | Login",
  ogTitle: "Toyota Evaluation System | Login",
});

const { t } = useI18n();

const authStore = useAuthStore();

const loginSchema = {
  email(value: string | null) {
    if (!value) {
      return t("errors.emailRequired");
    }
    if (!value.match(regex.emailRegex)) {
      return t("errors.emailInvalid");
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
};

const { errors, handleSubmit } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const { value: email } = useField("email", loginSchema.email);
const { value: password } = useField("password", loginSchema.password);

const submitChange = handleSubmit(async (values: LoginForm) => {
  authStore.login(values);
});
</script>
