import { SignupFormFields } from "../validations/signupSchema";
import { SigninFormFields } from "../validations/signinSchema";
import { axiosInstance } from "../axiosInstance";

export const signUp = async (newUser: SignupFormFields) => {
  const res = await axiosInstance.post("/api/v1/auth/register", newUser);
  return res.data;
};

export const signIn = async (user: SigninFormFields) => {
  const res = await axiosInstance.post("/api/v1/auth/log-in", user);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/api/v1/auth/log-out");
  return res.data;
};

export const getMe = async () => {
  const res = await axiosInstance.get("/api/v1/users/me");
  return res.data;
};
