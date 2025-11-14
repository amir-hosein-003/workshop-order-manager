import { axiosInstance } from "@/interceptors/axiosInterceptor";
import { NewProductFormFields } from "../validations/newProductSchema";

export const newProduct = async (data: NewProductFormFields) => {
  const res = await axiosInstance.post("/api/v1/products/new-product", {
    name: data.name,
    description: data.description,
    images: JSON.stringify(data.images),
    category: data.category,
    price: +data.price,
  });
  return res.data;
};

export const getProducts = async () => {
  const res = await axiosInstance.get("/api/v1/products");
  return res.data;
}
