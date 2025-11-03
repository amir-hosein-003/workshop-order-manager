import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { signUp } from "@/lib/services/auth";
import { ErrorResponse } from "@/lib/types/Error";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signUp,
    onMutate: () => {
      toast.info("Creating your account...", { toastId: "signup" });
    },
    onSuccess: () => {
      toast.update("signup", {
        render: "Account created successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => router.push("/auth/sign-in"), 2000);
    },
    onError: (error: ErrorResponse) => {
      toast.update("signup", {
        render: error.message || "Something went wrong. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error.message)
    },
  });
};
