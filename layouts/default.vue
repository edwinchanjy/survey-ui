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
  title: t("title"),
  ogTitle: t("title"),
});
</script>
