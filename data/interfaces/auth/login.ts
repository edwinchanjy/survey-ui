import { Platform } from "~~/data/enum";

export interface LoginForm {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface UserLoginRequest {
  timestamp: string; // "2023-02-19T09:37:42.117833Z";
  request: {
    username: string;
    password: string;
    platform: Platform;
  };
}

export interface UserLoginResponse {
  timestamp: string;
  uniqueId: string;
  data: {
    id: string;
    username: string;
    name: string;
    role: string;
    isReset: boolean;
    isActive: boolean;
    token: string;
    accessModule: Array<string>;
    message?: string;
  };
}

export interface GetUserRequest {
  id: string;
}

export interface GetUserResponse {
  timestamp: string;
  uniqueId: string;
  data: {
    id: string;
    username: string;
    name: string;
    password: string;
    isReset: boolean;
    isActive: boolean;
    lastLoginDt: string;
    role: string;
  };
}
