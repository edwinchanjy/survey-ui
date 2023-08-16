import { constant, cookiesKey } from "~~/constants";

export const getSurvey = (): string | null | undefined => {
  const data = localStorage.getItem(cookiesKey.surveyKey);

  if (!data) {
    return null;
  }

  const parsedData = JSON.parse(data);

  const value = parsedData.value;
  const expiryDate = parsedData.expiresAt;

  if (expiryDate < Date.now()) {
    localStorage.removeItem(cookiesKey.surveyKey);

    return null;
  }

  return value;
};

export const setSurvey = (value: string) => {
  const data = {
    value,
    expiresAt: Date.now() + constant.surveyAge, // Expiry timestamp: 30 minute from now
  };

  localStorage.setItem(cookiesKey.surveyKey, JSON.stringify(data));
};

export const removeSurvey = () => {
  localStorage.removeItem(cookiesKey.surveyKey);
};

export const getTestLocalStorage = (): string | null | undefined => {
  const data = localStorage.getItem("test");

  return data;
};

export const setTestLocalStorage = () => {
  const data = "LMAO";

  localStorage.setItem("test", data);
};
