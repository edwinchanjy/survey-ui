import { defineStore } from "pinia";
import { LoginForm } from "data/interfaces/auth";
import { constant, cookiesKey } from "~~/constants";

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false);
  const userName: Ref<string | null | undefined> = ref("");

  function login(data: LoginForm) {
    isLoggedIn.value = true;
    userName.value = data.email;

    saveAuthCookies();
  }

  function logout() {
    isLoggedIn.value = false;

    useCookie(cookiesKey.userTokenKey).value = null;
    useCookie(cookiesKey.refreshTokenKey).value = null;
    console.log("LOGOUT");
    navigateTo("/login");
  }

  function saveAuthCookies() {
    let userTokenCookie = useCookie(cookiesKey.userTokenKey, {
      sameSite: "none",
      secure: true,
      maxAge: constant.tokenAge,
    });
    userTokenCookie.value = "EXAMPLE_TOKEN";

    console.log("AUTH TOKEN");
    console.log(userTokenCookie.value);

    let refreshTokenCookie = useCookie(cookiesKey.refreshTokenKey, {
      sameSite: "none",
      secure: true,
      maxAge: constant.tokenAge,
    });

    refreshTokenCookie.value = "EXAMPLE_TOKEN";

    navigateTo("/");
  }

  return {
    isLoggedIn,
    userName,
    login,
    logout,
  };
});
