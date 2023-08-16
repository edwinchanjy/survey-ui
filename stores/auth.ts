import { defineStore } from "pinia";
import sha256 from "crypto-js/sha256";
import {
  GetUserRequest,
  LoginForm,
  UserLoginRequest,
  UserLoginResponse,
} from "data/interfaces/auth";
import { auth } from "~~/repositories";

export const useAuthStore = defineStore("auth", () => {
  const localePath = useLocalePath();
  const dayjs = useDayjs();

  const isLoggedIn = ref(false);
  const userData: Ref<UserLoginResponse | null | undefined> = ref();
  const userName: Ref<string | null | undefined> = ref("");

  async function login(loginInfo: LoginForm) {
    const passwordHash: string = sha256(loginInfo.password).toString();

    const request: UserLoginRequest = {
      timestamp: dayjs.utc().format(),
      request: {
        username: loginInfo.username,
        password: passwordHash,
      },
    };

    const data = await auth.login(request);

    if (data) {
      userData.value = data;
      userName.value = data.data.username;
      isLoggedIn.value = true;

      setUserToken(userData.value.data.token);

      if (loginInfo.rememberMe) {
        setRememberMe(loginInfo.username);
      } else {
        removeRememberMe();
      }

      navigateTo(localePath("/"));
    }
  }

  function logout() {
    isLoggedIn.value = false;
    userData.value = null;

    removeUserToken();
    removeSurvey();

    navigateTo(localePath("/login"));
  }

  async function getUser(id: string) {
    const request: GetUserRequest = {
      id: id,
    };

    const data = await auth.getUser(request);

    if (data) {
      isLoggedIn.value = true;
      userName.value = data.data.Username;
    }
  }

  return {
    isLoggedIn,
    userData,
    userName,
    login,
    logout,
    getUser,
  };
});
