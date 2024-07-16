import { Product } from "@/utils/types"
import ProductDetails from "./components/ProductDetails"
import ProductImagesCarousel from "./components/ProductImagesCarousel"
import { Breadcrumbs, Toast } from "@/components"
import { Metadata } from "next"
import fetchHelper from "@/services/fetchHelper"
import api from "@/services/api"
import Helpers from "@/utils/helpers"

type ProductPageParams = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const { slug } = params

  const product: Product = await fetchHelper(`${api.products}/slug/${slug}`).then((res) => res.json())

  return {
    title: `${product.productName} by ${product.brand} | buy it on lots-of-stuff`,
    description: product.description
  }
}

const getProduct = async (slug: string): Promise<Product> => {
  const productResponse = await fetchHelper(`${api.products}/slug/${slug}`, {
    cache: "no-store",
  })

  return productResponse.json()
}

export default async function ProductPage({ params }: ProductPageParams) {
  const { slug } = params
  const product = await getProduct(slug)

  return (
    <main className="space-y-6">
      <Toast />

      <Breadcrumbs
        slugs={[product.category, product.subCategory]}
        productSlug={{ label: product.productName, slug: product.slug }}
      />

      <section className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0 xl:gap-x-12">
        <ProductImagesCarousel product={product} />
        <ProductDetails product={product} />
      </section>
    </main>
  )
}