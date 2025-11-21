"use client";

import Image from "next/image";
import Link from "next/link";

import { useGetProducts } from "@/hooks/api-hooks/useGetProducts";
import { Product } from "@/lib/types/Product";
import { parseImages } from "@/lib/utils/parseImages";

import Icon from "../ui/icon";

const ProductsList = () => {
  const { data, isLoading } = useGetProducts();

  return (
    <section className="w-full">
      <div className="flex flex-row items-center justify-between border-b-2 border-primary/20 py-2">
        <h3 className="text-2xl">Products</h3>
        <div className="flex flex-row items-center gap-2">
          <Icon icon="mynaui:filter-one" width="24" height="24" />
          <p>Filter</p>
        </div>
      </div>

      <div className="w-full mt-6">
        {isLoading ? (
          <div className="w-full min-h-48 flex items-center justify-center">
            <div className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.map((product: Product, index: number) => {
              const images = parseImages(String(product.images));

              return (
                <div key={index} className="relative">
                  <div className="inverted-radius_br bg-base-200 overflow-hidden rounded-xl p-2">
                    <div className="relative">
                      <span className="w-20 h-8 flex items-center justify-center absolute top-0 left-0 rounded-md bg-primary/70">
                        <p className="text-primary-content">
                          {product.category}
                        </p>
                      </span>

                      {images[0] && (
                        <Image
                          src={images[0]}
                          alt={product.name}
                          className="inverted-radius_tl rounded-lg h-48 object-cover"
                          width={400}
                          height={400}
                        />
                      )}
                    </div>

                    <div className="min-h-38 flex flex-col justify-between pt-4">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-base-content/60">
                        {product.description}
                      </p>
                      <p className="text-xl font-semibold pl-4">
                        {String(product.price) === "0"
                          ? "Free"
                          : `$${product.price}`}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="btn btn-primary h-9 w-22 absolute bottom-0 right-0 rounded-md"
                  >
                    Detail
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsList;
