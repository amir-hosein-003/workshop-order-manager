import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateProduct } from "@/lib/services/product";
import { Product } from "@/lib/types/Product";

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => {
      return updateProduct(id, data);
    },
    onSuccess: () => {
      toast.success("✅ Update product successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("❌ We couldn’t update your product. Please try again.");
    },
  });
};
