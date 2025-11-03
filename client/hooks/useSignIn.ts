import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import { signIn } from "@/lib/services/auth";
import type { SigninFormFields } from "@/lib/validations/signinSchema";
import { useAppDispatch } from "@/lib/store/hooks";
import { setCredentials } from "@/lib/store/features/authSlice";

export const useSignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: SigninFormFields) => signIn(payload),
    onMutate: () => {
      toast.info("Signing in to your account...", { toastId: "signin" });
    },
    onSuccess: (data) => {
      toast.update("signin", {
        render: `Welcome back, ${data.user.name}!`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      dispatch(
        setCredentials({
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            avatar: data.user.profile,
          },
        })
      );
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
    onError: (error: any) => {
      toast.update("signin", {
        render:
          error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    },
  });
};
