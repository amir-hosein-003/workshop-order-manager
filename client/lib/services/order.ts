import { axiosInstance } from "@/interceptors/axiosInterceptor";

export interface Order {
  productId: string;
  price: string;
  quantity: number;
  customerName?: string;
  note?: string;
  dueDate?: string;
  priority?: string;
}

export async function createOrder(orderData: Order) {
  const res = await axiosInstance.post("/api/v1/orders/new-order", orderData);
  return res.data;
}

export async function getOrders() {
  const res = await axiosInstance.get("/api/v1/orders");
  return res.data;
}
