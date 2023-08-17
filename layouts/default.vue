<template>
  <div class="bg-primarybackground">
    <CustomNavBar />
    <div class="pt-24"></div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
  title: "UMW Toyota Motor - Outlet Evaluation System",
  ogTitle: "UMW Toyota Motor - Outlet Evaluation System",
});
</script>
