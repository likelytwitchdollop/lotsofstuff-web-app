'use client'

import { createContext, useContext } from 'react'
import useQueryParams from '../hooks/useQueryParams/AppRouter'
import { z } from 'zod'
import { usePathname } from 'next/navigation'

export const Category = z.enum(['fashion', 'beauty', 'home'])

export const SortBy = z.enum(['relevance', 'price-ascending', 'price-descending'])

export type SortBy = z.infer<typeof SortBy>

export const SearchProductsQueryParamsSchema = z.object({
  search: z.string().optional(),
  category: z.array(z.string()).optional(),
  brand: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  sortBy: SortBy.optional()
})

export type SearchProductsQueryParamsSchema = z.infer<typeof SearchProductsQueryParamsSchema>

type SearchProductsQueryParamsType = {
  queryParams: SearchProductsQueryParamsSchema
  setQueryParams: (newParams: Partial<z.infer<typeof SearchProductsQueryParamsSchema>>, basePathname?: string) => void
} | null

const SearchProductsQueryParamsContext = createContext<SearchProductsQueryParamsType>(null)

type SearchProductsParamsProviderProps = {
  children: React.ReactNode | React.ReactNode[]
}

const SearchProductsParamsProvider = ({ children }: SearchProductsParamsProviderProps) => {
  const pathname = usePathname()

  const { queryParams, setQueryParams } = useQueryParams(
    {
      schema: SearchProductsQueryParamsSchema,
      defaultValues: { search: '', category: [], brand: [], minPrice: 0, maxPrice: 0, sortBy: 'relevance' },
    },
    pathname === '/' ? '/products' : pathname
  );

  return (
    <SearchProductsQueryParamsContext.Provider value={{ queryParams, setQueryParams }}>
      {children}
    </SearchProductsQueryParamsContext.Provider>
  )
}

export default SearchProductsParamsProvider

export const useSearchProductsQueryParamsContext = () => {
  const searchProductsQueryParamsContext = useContext(SearchProductsQueryParamsContext)

  if (!searchProductsQueryParamsContext) {
    throw new Error(
      'useSearchProductsQueryParamsContext has to be used within <SearchProductsQueryParamsContext.Provider>'
    )
  }

  return searchProductsQueryParamsContext
}

