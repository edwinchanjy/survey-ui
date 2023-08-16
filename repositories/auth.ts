import {
  UserLoginRequest,
  UserLoginResponse,
  GetUserRequest,
  GetUserResponse,
} from "data/interfaces/auth";

export default {
  async login(request: UserLoginRequest): Promise<UserLoginResponse> {
    const data = await useCustomFetch("user/login", {
      method: "POST",
      body: request,
    });

    return data.value as UserLoginResponse;
  },
  async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    const data = await useCustomFetch("user/" + request.id, {
      method: "GET",
    });

    return data.value as GetUserResponse;
  },
};
