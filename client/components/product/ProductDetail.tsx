"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useGetProductById } from "@/hooks/api-hooks/useGetProductById";
import { parseImages } from "@/lib/utils/parseImages";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCredentials } from "@/lib/store/features/authSlice";
import { getMe } from "@/lib/services/auth";
import { deleteProduct } from "@/lib/services/product";

import Icon from "../ui/icon";

interface Props {
  id: string;
}

const ProductDetail = ({ id }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const router = useRouter();

  const { data, isLoading } = useGetProductById(id);
  const user = useAppSelector((state) => state.auth.user);

  const images = data ? parseImages(data?.images) : [];

  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        const data = await getMe();
        if (!data) return;
        dispatch(
          setCredentials({
            user: {
              id: data.id,
              name: data.name,
              email: data.email,
              role: data.role,
              avatar: data.avatar,
            },
          })
        );
      } catch {}
    })();
  }, []);

  const deleteProductHandler = async () => {
    try {
      const res = await deleteProduct(id);
      toast.success(res.message || "Delete product successfully");
      router.push("/products");
    } catch {
      toast.error("Delete failed — please try again later");
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-126 flex items-center justify-center">
          <div className="loading loading-bars loading-xl" />
          <p className="text-xl font-semibold ml-6">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-row gap-8">
          <div className="max-w-md">
            <Swiper
              navigation={true}
              modules={[Navigation, Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              className="max-w-md text-left aspect-square"
            >
              {images.length !== 0 &&
                images.map((img: string, index: number) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={img}
                      alt={data.name || "Product"}
                      className="w-full h-full rounded-md"
                      width={500}
                      height={500}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              slidesPerView={3}
              spaceBetween={10}
              modules={[Thumbs]}
              watchSlidesProgress
              className="mt-2"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image
                    key={index}
                    src={img}
                    className="rounded-md aspect-square"
                    alt={data.name || "Product"}
                    width={500}
                    height={500}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full flex flex-col justify-between">
            <div className="py-6">
              <h2 className="text-3xl font-semibold">{data.name}</h2>
              <p className="text-xl text-base-content/60 mt-6">
                {data.description}
              </p>
              <span className="">
                {data &&
                  `${String(data.price) === "0" ? "Free" : `$${data.price}`}`}
              </span>
            </div>
            <div className="w-full h-32 flex flex-row items-end justify-end gap-6">
              {user?.role === "admin" && (
                <>
                  <button
                    onClick={deleteProductHandler}
                    className="btn btn-error btn-outline rounded-md"
                  >
                    <Icon icon="mynaui:trash" width="24" height="24" />
                    Delete
                  </button>
                  <Link
                    href={`/products/new?productId=${data.id}`}
                    className="btn btn-primary btn-outline rounded-md"
                  >
                    <Icon icon="mynaui:pencil" width="24" height="24" />
                    Edit
                  </Link>
                </>
              )}
              <button className="btn btn-primary rounded-md">
                Create Order
                <Icon icon="mynaui:arrow-right-square" width="24" height="24" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
