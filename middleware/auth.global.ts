import { cookiesKey } from "~~/constants";
import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((from) => {
  const authStore = useAuthStore();
  const localePath = useLocalePath();

  const userTokenCookie = useCookie(cookiesKey.userTokenKey).value;

  // console.log("TOKEN");
  // console.log(userTokenCookie);
  // if (userTokenCookie) {
  //   authStore.isLoggedIn = true;
  // }

  authStore.userName = "John Doe";
  authStore.isLoggedIn = true;

  // console.log("checking");
  // console.log(authStore.isLoggedIn);
  // if (!authStore.isLoggedIn && from.path.includes("/login")) {
  //   return navigateTo(localePath("/login"));
  // }

  // if (authStore.isLoggedIn && from.path.includes("/login")) {
  //   console.log("testing");
  //   return navigateTo(localePath("/"));
  // }
});
