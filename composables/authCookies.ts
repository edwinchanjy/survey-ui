import { constant, cookiesKey } from "~~/constants";

export const getRememberMe = (): string | null | undefined =>
  useCookie(cookiesKey.rememberMeKey).value;

export const setRememberMe = (value: string) => {
  useCookie(cookiesKey.rememberMeKey).value = value;
};

export const removeRememberMe = () => {
  useCookie(cookiesKey.rememberMeKey).value = null;
};

export const getUserToken = (): string | null | undefined =>
  useCookie(cookiesKey.userTokenKey).value;

export const setUserToken = (value: string) => {
  const userTokenCookie = useCookie(cookiesKey.userTokenKey, {
    // sameSite: "none",
    secure: false,
    maxAge: constant.tokenAge,
  });

  userTokenCookie.value = value;
};

export const removeUserToken = () => {
  useCookie(cookiesKey.userTokenKey).value = null;
};

export const getTest = (): string | null | undefined => useCookie("test").value;

export const setTest = () => {
  useCookie("test").value = "LMAO";
};
