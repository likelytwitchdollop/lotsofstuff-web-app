'use client'

import { SearchProductsLayout } from '@/components'
import services from '@/services'
import { notFound } from 'next/navigation'
import React, { useEffect } from 'react'
import { CATEGORIES_PAGE_FILTERS } from '@/components/FilterProductsButton/constants'
import { Category, useSearchProductsQueryParamsContext } from '@/contexts/useSearchProductsQueryParamsContext'

type ProductCategoryPageParams = {
  params: { category: string[] }
}

export default function ProductCategoryPage({ params }: ProductCategoryPageParams) {
  const slugs = params.category

  const [category, subCategory] = slugs
  const parseCategory = Category.safeParse(category)

  if (!parseCategory.success) {
    notFound()
  }

  const { queryParams } = useSearchProductsQueryParamsContext()

  const useSearchProductsProps = {
    ...queryParams,
    searchPhrase: '',
    category: [category],
    subCategory: subCategory,
  }

  const {
    data: useSearchProductsResponse,
    status: fetchingProducts,
  } = services.Products.useSearchProducts(useSearchProductsProps)

  const products = useSearchProductsResponse?.pages
    .map((page) => page ? page.data : [])
    .flat()

  useEffect(() => {
    if (fetchingProducts === 'success' && !products || products?.length === 0 && !queryParams.maxPrice && !queryParams.minPrice) {
      notFound()
    }
  }, [fetchingProducts, products, queryParams.maxPrice, queryParams.minPrice])


  return (
    <SearchProductsLayout
      breadcrumbs={{ slugs }}
      filters={CATEGORIES_PAGE_FILTERS}
      useSearchProductsProps={useSearchProductsProps}
    />
  )
}