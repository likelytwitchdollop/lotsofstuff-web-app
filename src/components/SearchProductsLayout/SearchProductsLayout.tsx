"use client"

import React from 'react'
import { useSearchProductsQueryParamsContext } from '@/contexts/useSearchProductsQueryParamsContext'
import ActivityIndicator from '../ActivityIndicator'
import Colors from '@/utils/constants/Colors'
import services from '@/services'
import Breadcrumbs from '../Breadcrumbs'
import Helpers from '@/utils/helpers'
import SortProductsButton from '../SortProductsButton'
import FilterProductsButton from '../FilterProductsButton'
import SelectedFilterChip from '../SelectedFilterChip'
import Button from '../Button'
import { UseSearchProductsProps } from '@/services/api/Products/query-hooks/useSearchProducts'
import { ALL_FILTERS, Filters } from '../FilterProductsButton/constants'
import AnimatedProductsList from '../AnimatedProductsList'
import { useSearchProductsFilters } from '@/hooks'

type SearchProductsLayoutProps = {
  showSearchQuery?: boolean
  breadcrumbs?: { slugs: string[] }
  filters?: Filters
  useSearchProductsProps: UseSearchProductsProps
}

const SearchProductsLayout = ({ showSearchQuery = false, breadcrumbs, filters = ALL_FILTERS, useSearchProductsProps }: SearchProductsLayoutProps) => {
  const { queryParams } = useSearchProductsQueryParamsContext()
  const { selectedFilters, removeFilter } = useSearchProductsFilters()

  const {
    data: useSearchProductsResponse,
    status: fetchingProducts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = services.Products.useSearchProducts(useSearchProductsProps)

  const searchResults = useSearchProductsResponse?.pages[0]
  const hasMore = searchResults?.hasMore
  const products = useSearchProductsResponse?.pages
    .map((page) => page ? page.data : [])
    .flat()
  const totalProductsSeen = products?.length

  return (
    <main className='space-y-12'>
      {showSearchQuery && <p className='font-medium text-center'>Looking for: {queryParams.search}</p>}

      {fetchingProducts === 'pending' && <ActivityIndicator size={24} color={Colors.black} />}

      {fetchingProducts === 'error' && (
        <p className='text-center'>
          😥
          <br />
          Something went wrong. Please try again.
        </p>
      )}

      {fetchingProducts === 'success' && searchResults && products && (
        <>
          {showSearchQuery && queryParams.search && Object.values(queryParams).length === 1 && searchResults && searchResults.data.length === 0 && (
            <p className='text-center'>
              😥
              <br />
              No items found.
              <br />
              <br />
              {showSearchQuery && (
                <>
                  We couldn&apos;t find a match for <b>{queryParams.search}</b>. Please try another search.
                </>
              )}
            </p>
          )}

          {
            ((showSearchQuery && queryParams.search && searchResults) || !showSearchQuery) && (
              <>
                <div className='space-y-6'>
                  {breadcrumbs?.slugs && <Breadcrumbs slugs={breadcrumbs.slugs} />}

                  <div className='flex 3xs:flex-col 3xs:gap-y-2 3xs:items-center 2xs:flex-row justify-between'>
                    <p className='font-bold'>
                      Found {searchResults.data.length} item{Helpers.getPlural(searchResults.data.length)}
                    </p>

                    <div className='flex flex-row gap-x-4 2xs:w-auto 2xs:justify-normal 3xs:justify-between 3xs:w-full'>
                      <SortProductsButton />

                      <FilterProductsButton filters={filters} />
                    </div>
                  </div>

                  <div
                    className='flex flex-row flex-wrap gap-6'
                  >
                    {selectedFilters.map((selectedFilter) => {
                      return (
                        <SelectedFilterChip
                          key={selectedFilter.value}
                          label={selectedFilter.value}
                          onClick={() => {
                            removeFilter(selectedFilter)
                          }}
                        />
                      )
                    })}
                  </div>
                </div>

                {searchResults.data.length === 0 && (
                  <p className='text-center'>
                    😥
                    <br />
                    No items found.
                    <br />
                    <br />
                    <>
                      We couldn&apos;t find a match for your search. Please try another search.
                    </>
                  </p>
                )}

                {searchResults.data.length !== 0 && (
                  <>
                    <AnimatedProductsList products={products} />

                    <div className='grid place-content-center space-y-4'>
                      {hasMore && hasNextPage && (
                        <Button
                          title={isFetchingNextPage ? 'Getting more stuff...' : 'Show more'}
                          type='text'
                          disabled={isFetchingNextPage}
                          onClick={() => {
                            fetchNextPage()
                          }}
                          className='mx-auto'
                        />
                      )}

                      <p className='font-medium text-gray-300 text-sm text-center'>
                        {hasMore
                          ? `You have seen ${totalProductsSeen} of ${searchResults.count} items`
                          : `You have seen all ${searchResults.count} items`
                        }
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
        </>
      )}
    </main>
  )
}

export default SearchProductsLayout