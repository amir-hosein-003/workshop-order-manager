import Link from "next/link";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ProductDetail from "@/components/product/ProductDetail";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProductById } from "@/lib/services/product";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Product Detail",
    description: "Detailed view of the selected product.",
    keywords: ["product details", "workshop", "order management"],
  };
}

const ProductDetailPage = async ({ params }: Props) => {
  const id = (await params).id;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ContentLayout title="All Posts">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* {result && <BreadcrumbPage>{result.name}</BreadcrumbPage>} */}
            <BreadcrumbPage>Product name</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* content */}
      <PlaceholderContent className="bg-card rounded-lg shadow-sm p-6">
        <HydrationBoundary state={dehydratedState}>
          <ProductDetail id={id} />
        </HydrationBoundary>
      </PlaceholderContent>
    </ContentLayout>
  );
};

export default ProductDetailPage;
