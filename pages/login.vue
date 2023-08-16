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
            for="username"
            class="block mb-2 text-sm font-medium text-white"
            >{{ t("auth.username") }}</label
          >
          <input
            id="username"
            v-model="username"
            type="text"
            name="text"
            class="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Username"
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
                id="rememberMe"
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 accent-primary border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-primary ring-offset-gray-800 ocus:ring-offset-gray-800"
              />
            </div>
            <label
              for="rememberMe"
              class="ml-2 text-sm font-medium text-gray-300"
              >{{ t("auth.rememberMe") }}</label
            >
          </div>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {{ t("auth.signIn") }}
          </button>
        </div>
        <p>{{ test }}</p>
        <p>{{ test2 }}</p>
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

setTest();

console.log("cookie...");
console.log(getTest());

const test = ref(getTest() ?? "");
const test2 = ref("");
onMounted(() => {
  setTestLocalStorage();
  console.log("local storage...");
  console.log(getTestLocalStorage());

  test2.value = getTestLocalStorage() ?? "";
});
</script>
