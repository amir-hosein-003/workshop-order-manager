import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signUp } from "@/lib/services/auth";
import { useAppDispatch } from "@/lib/store/hooks";
import { setCredentials } from "@/lib/store/features/authSlice";
import { axiosInstance } from "@/interceptors/axiosInterceptor";
import { SignupFormFields } from "@/lib/validations/signupSchema";

export const useSignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: SignupFormFields) => signUp(payload),
    onSuccess: (data) => {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
      dispatch(
        setCredentials({
          token: data.accessToken,
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            avatar: data.user.profile,
          },
        })
      );
      router.push("/auth/sign-in");
    },
  });
};
