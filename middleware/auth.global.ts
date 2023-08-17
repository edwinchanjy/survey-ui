import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const localePath = useLocalePath();

  const userTokenCookie = getUserToken();

  if (userTokenCookie) {
    authStore.isLoggedIn = true;
  }

  if (!authStore.userName && authStore.isLoggedIn) {
    await authStore.getUser("3");
  }

  if (!authStore.isLoggedIn && !to.path.includes("/login"))
    return navigateTo(localePath("/login"));

  if (authStore.isLoggedIn && to.path.includes("/login"))
    return navigateTo(localePath("/"));
});
