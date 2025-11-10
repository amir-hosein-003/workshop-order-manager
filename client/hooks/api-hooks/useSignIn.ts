import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { signIn } from "@/lib/services/auth";
import { useAppDispatch } from "@/lib/store/hooks";
import { setCredentials } from "@/lib/store/features/authSlice";
import { axiosInstance } from "@/interceptors/axiosInterceptor";
import { SigninFormFields } from "@/lib/validations/signinSchema";

export const useSignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: SigninFormFields) => signIn(payload),
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
      router.push("/");
    },
  });
};
