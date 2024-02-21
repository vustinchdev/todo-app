import { instance } from "common/api";
import { BaseResponse } from "common/types";
import { User, LoginParams } from "./authApi.types";

export const authApi = {
  me() {
    return instance.get<BaseResponse<User>>("auth/me");
  },
  login(params: LoginParams) {
    return instance.post<BaseResponse<{ userId: number }>>(
      "auth/login",
      params,
    );
  },
  logout() {
    return instance.delete<BaseResponse>("auth/login");
  },
};
