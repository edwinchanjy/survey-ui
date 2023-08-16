<template>
  <div class="flex justify-center items-center">
    <ol
      class="flex justify-center items-center p-3 space-x-2 text-base font-medium text-center text-gray-500"
    >
      <li
        v-for="(page, index) in questions['pages']"
        :key="index"
        class="flex items-center"
        :class="[
          index + 1 == currentStep ? 'text-blue-600 dark:text-blue-500' : '',
        ]"
      >
        <span
          class="flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0"
          :class="[
            index + 1 == currentStep
              ? 'border-blue-600 dark:border-blue-500'
              : '',
          ]"
        >
          {{ index + 1 }}
        </span>
        <span class="hidden sm:inline-flex sm:ml-2">{{ page["name"] }}</span>
        <svg
          v-if="index + 1 != questions['pages'].length"
          class="w-3 h-3 ml-2 sm:ml-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        </svg>
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  currentStep: number;
  questions: any;
}>();
</script>
