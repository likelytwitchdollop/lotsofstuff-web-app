const getTrendingProducts = async (): Promise<Product[]> => {
  const trendingProductsResponse = await fetchHelper(`${api.products}/trending`, {
    cache: "no-store",
  })

  return trendingProductsResponse.json()
}

import { AnimatedProductsList } from "@/components";
import api from "@/services/api";
import fetchHelper from "@/services/fetchHelper";
import { Product } from "@/utils/types";

export default async function HomePage() {
  const trendingProducts = await getTrendingProducts()

  return (
    <main>
      <p className="font-medium text-center mb-12">lots of people bought these - 😁</p>

      <AnimatedProductsList products={trendingProducts} />
    </main>
  );
}
