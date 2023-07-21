<template>
  <nav class="bg-white fixed w-full z-20 top-0 left- shadow-md">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <div class="flex md:order-1">
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 mr-5 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <a href="https://google.com/" class="flex items-center">
          <img
            src="~~/assets/images/toyota-logo.png"
            class="h-6 md:h-8 mr-3"
            alt="Toyota Logo"
          />
          <!-- <span
            class="self-center text-gray-700 hidden md:block text-sm md:text-2xl font-semibold whitespace-nowrap"
            >{{ t("title") }}</span
          > -->
        </a>
      </div>
      <div class="flex md:order-3">
        <div class="flex items-center text-gray-900">
          <span class="mr-6 text-sm font-medium cursor-default">
            {{ authStore.userName }}
          </span>
          <button
            @submit.prevent="logout"
            class="cursor-pointer outline-none text-center md:hover:text-primary"
          >
            <Icon name="material-symbols:logout-rounded" size="24px" />
          </button>
        </div>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-2"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0"
        >
          <li>
            <a
              :href="localePath('/')"
              class="block py-2 pl-3 pr-4 text-gray-900 bg-blue-700 rounded md:bg-transparent md:hover:text-primary md:p-0"
              aria-current="page"
              >surveyJS</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();

const localePath = useLocalePath();

// const { $swal } = useNuxtApp();

function logout() {
  console.log("adsfasdf");
  authStore.logout();

  // $swal.fire({
  //     title: "Logout?",
  //     text: `logout lololol`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes",
  //     cancelButtonText: "No",
  //   })
  //   .then(async (result) => {
  //     if (result.value) {
  //       authStore.logout();
  //     }
  //   });
}
</script>
