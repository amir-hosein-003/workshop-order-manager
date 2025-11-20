import { axiosInstance } from "@/interceptors/axiosInterceptor";

import { NewProductFormFields } from "../validations/newProductSchema";
import { Product } from "../types/Product";

export const newProduct = async (data: NewProductFormFields) => {
  const res = await axiosInstance.post("/api/v1/products/new-product", {
    name: data.name,
    description: data.description,
    images: JSON.stringify(data.images),
    category: data.category,
    price: data.price,
  });
  return res.data;
};

export const getProducts = async () => {
  const res = await axiosInstance.get("/api/v1/products");
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axiosInstance.get(`/api/v1/products/${id}`);
  return res.data;
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const res = await axiosInstance.patch(`/api/v1/products/${id}`, {
    name: data?.name,
    description: data?.description,
    images: JSON.stringify(data?.images),
    category: data?.category,
    price: data?.price,
  });
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/api/v1/products/${id}`);
  return res.data;
};
