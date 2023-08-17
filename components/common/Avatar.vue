<template>
  <div
    class="relative inline-flex mr-2 items-center justify-center w-7 h-7 overflow-hidden bg-gray-500 rounded-full"
  >
    <span class="font-medium text-white">{{ displayLetter }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  displayLetter: string;
}>();
</script>
