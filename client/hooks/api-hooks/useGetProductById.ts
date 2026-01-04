import { useQuery } from "@tanstack/react-query";

import { getProductById } from "@/lib/services/product";

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: ({ queryKey }) => getProductById(queryKey[1]),
  });
};
