import {
  SearchProductsQueryParamsSchema,
  SortBy,
} from '@/contexts/useSearchProductsQueryParamsContext'
import api from '@/services/api'
import httpClient from '@/services/httpClient'
import ServerCacheKeys from '@/services/ServerCacheKeys'
import Helpers from '@/utils/helpers'
import { Product } from '@/utils/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type UseInfiniteQueryReponse<T> = {
  count: number
  totalProductsSeen: number
  data: T[]
  nextCursor: number | undefined
  hasMore: boolean
} | null

type UseSearchProductsResponse = UseInfiniteQueryReponse<Product>

export type SearchProductsProps = {
  searchPhrase: string
  category?: string[]
  subCategory?: string
  brand?: string[]
  minPrice?: number
  maxPrice?: number
  sortBy?: SortBy
  currentPage?: number
}

const searchProducts = async (props: SearchProductsProps) => {
  const {
    searchPhrase,
    category,
    subCategory,
    brand,
    minPrice,
    maxPrice,
    sortBy,
    currentPage,
  } = props

  const isValidQueryParams = SearchProductsQueryParamsSchema.safeParse(props)

  if (!isValidQueryParams.success) {
    throw new Error('Something went wrong. Please try again.')
  }

  const { data: searchResults }: AxiosResponse<UseSearchProductsResponse> =
    await httpClient.get(`${api.products}/search`, {
      params: {
        search: searchPhrase.trim(),
        sortBy: sortBy || 'relevance',
        category: Helpers.decodeUriComponent(category),
        subCategory: Helpers.decodeUriComponent(subCategory),
        brand: Helpers.decodeUriComponent(brand),
        minPrice,
        maxPrice,
        currentPage,
      },
    })

  return searchResults
}

export type UseSearchProductsProps = SearchProductsProps & { enabled?: boolean }

const useSearchProducts = ({ ...props }: UseSearchProductsProps) => {
  return useInfiniteQuery({
    queryKey: [ServerCacheKeys.products, props],
    queryFn: ({ pageParam = 0 }) =>
      searchProducts({ ...props, currentPage: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor
    },
  })
}

export default useSearchProducts
