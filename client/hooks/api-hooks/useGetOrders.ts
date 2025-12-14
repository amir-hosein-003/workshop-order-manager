import { useQuery } from "@tanstack/react-query";

import { getOrders } from "@/lib/services/order";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};
