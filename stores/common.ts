import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", () => {
  const windowsDimension = ref({
    width: 1920,
    height: 1080,
  });

  const isTabletView = computed((_) => {
    return windowsDimension.value.width < 1200;
  });

  const isMobileView = computed((_) => {
    return windowsDimension.value.width < 768;
  });

  const setWindowsDimension = ({
    innerWidth,
    innerHeight,
  }: {
    innerWidth: number;
    innerHeight: number;
  }) => {
    windowsDimension.value = {
      width: innerWidth,
      height: innerHeight,
    };
  };

  return {
    setWindowsDimension,
    isTabletView,
    isMobileView,
  };
});
