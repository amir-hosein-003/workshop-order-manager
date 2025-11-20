import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { newProduct } from "@/lib/services/product";

export const useNewProduct = () => {
  return useMutation({
    mutationFn: newProduct,
    onSuccess: () => {
      toast.success("✅ Add new product successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("❌ We couldn’t create your product. Please try again.");
    },
  });
};
