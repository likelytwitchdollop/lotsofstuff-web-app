'use client'

import React from 'react'
import { SearchProductsLayout } from '@/components'
import { useSearchProductsQueryParamsContext } from '@/contexts/useSearchProductsQueryParamsContext'

export default function ProductsPage() {
  const { queryParams } = useSearchProductsQueryParamsContext()

  return (
    <SearchProductsLayout
      showSearchQuery
      useSearchProductsProps={{
        searchPhrase: queryParams.search || '',
        ...queryParams,
        enabled: true
      }}
    />
  )
}