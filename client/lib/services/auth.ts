import { axiosInstance } from "@/interceptors/axiosInterceptor";

import { SignupFormFields } from "../validations/signupSchema";
import { SigninFormFields } from "../validations/signinSchema";

export const signUp = async (newUser: SignupFormFields) => {
  const res = await axiosInstance.post("/api/v1/auth/register", newUser);
  return res.data;
};

export const signIn = async (user: SigninFormFields) => {
  const res = await axiosInstance.post("/api/v1/auth/login", user);
  return res.data;
};

export const logOut = async () => {
  const res = await axiosInstance.post("/api/v1/auth/logout");
  return res.data;
};

export const getMe = async () => {
  const res = await axiosInstance.get("/api/v1/auth/me");
  return res.data;
};
