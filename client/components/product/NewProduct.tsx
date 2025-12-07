"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CldImage,
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  NewProductFormFields,
  NewProductSchema,
} from "@/lib/validations/newProductSchema";
import { useNewProduct } from "@/hooks/api-hooks/useNewProduct";
import { useGetProductById } from "@/hooks/api-hooks/useGetProductById";
import { useUpdateProduct } from "@/hooks/api-hooks/useUpdateProduct";
import { parseImages } from "@/lib/utils/parseImages";

import Icon from "../ui/icon";
import { Textarea } from "../ui/textarea";

const NewProduct = () => {
  const [images, setImages] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const { data } = useGetProductById(productId);
  const mutation = useNewProduct();
  const updateMutation = useUpdateProduct();

  const form = useForm<NewProductFormFields>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      name: (data && data.name) || "",
      description: (data && data.description) || "",
      price: (data && data.price) || "",
      images: [],
      category: (data && data.category) || "",
    },
  });

  useEffect(() => {
    if (data?.images) {
      const imgs =
        typeof data.images === "string"
          ? parseImages(data.images)
          : data.images;
      setImages(imgs);
      form.setValue("images", imgs);
    }
  }, [data]);

  useEffect(() => {
    form.setValue("images", images);
  }, [images]);

  const onSubmit = (data: NewProductFormFields) => {
    if (productId) {
      updateMutation.mutate({ id: productId, data });
    } else {
      mutation.mutate(data);
    }
  };

  return (
    <section className="w-full h-full">
      <h3 className="text-2xl font-semibold">New Product</h3>

      <div className="grid grid-cols-2 justify-items-center mt-6">
        <div className="w-md">
          <div className="bg-base-200 w-full h-64 flex flex-col items-center justify-center gap-6 rounded-xl">
            <CldUploadButton
              uploadPreset="course"
              className="cursor-pointer"
              options={{
                sources: ["local"],
                multiple: false,
                resourceType: "image",
              }}
              onSuccess={(result: CloudinaryUploadWidgetResults) => {
                if (
                  result.event === "success" &&
                  typeof result.info === "object" &&
                  "secure_url" in result.info
                ) {
                  setImages((prev) => [
                    ...prev,
                    (result.info as { secure_url: string }).secure_url,
                  ]);
                }
              }}
            >
              <span title="Upload image">
                <Icon
                  icon="fluent:image-add-32-light"
                  className="text-base-content/50 transition-all duration-200 hover:text-primary hover:scale-105"
                  width="96"
                  height="96"
                />
              </span>
            </CldUploadButton>
            <p className="text-base-content/60 text-sm">
              Upload new image for product(1:1)
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {images &&
              images.map((img, index) => (
                <div key={index} className="relative">
                  {index === 0 && (
                    <p className="text-xs bg-base-100/80 p-1 rounded-md absolute top-1 left-1">
                      main image
                    </p>
                  )}
                  <CldImage
                    src={img}
                    width="500"
                    height="500"
                    className="rounded-xl"
                    alt="product image"
                    crop={{
                      type: "auto",
                      source: true,
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-md space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-4 left-3 bg-base-100 rounded-sm p-2">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Name"
                      className="main-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-4 left-3 bg-base-100 rounded-sm p-2">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      className="main-input min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-4 left-3 bg-base-100 rounded-sm p-2">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category"
                      className="main-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-4 left-3 bg-base-100 rounded-sm p-2">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Price"
                      className="main-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mutation.isError && (
              <p className="text-sm text-error">
                {mutation.error.message ===
                  "Request failed with status code 400" &&
                  "Invalid credentials"}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block rounded-lg mt-4"
              disabled={mutation.isPending || updateMutation.isPending}
            >
              {mutation.isPending ||
                (updateMutation.isPending && (
                  <div className="loading loading-spinner" />
                ))}
              {productId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default NewProduct;
