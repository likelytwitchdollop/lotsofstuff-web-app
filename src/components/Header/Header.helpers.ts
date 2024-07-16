import { SearchProductsQueryParamsSchema } from '@/contexts/useSearchProductsQueryParamsContext'

export const resetQueryParams = (
  pathname: string,
  queryParams: SearchProductsQueryParamsSchema
) => {
  const newQueryParams = {
    brand: pathname !== '/' ? [] : queryParams.brand,
    category: pathname !== '/' ? [] : queryParams.category,
    minPrice: pathname !== '/' ? undefined : queryParams.minPrice,
    maxPrice: pathname !== '/' ? undefined : queryParams.maxPrice,
    sortBy: pathname !== '/' ? undefined : queryParams.sortBy,
  }

  return newQueryParams
}
