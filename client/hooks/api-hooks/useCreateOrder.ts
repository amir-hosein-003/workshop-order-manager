import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createOrder } from "@/lib/services/order";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Create order successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("We couldn’t create your order. Please try again.");
    },
  });
};
