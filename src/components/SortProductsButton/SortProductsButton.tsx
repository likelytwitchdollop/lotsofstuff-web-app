'use client'

import React, { useRef } from 'react'
import SortProductsSidebar from './components/SortProductsSidebar'
import { SidebarComponent } from '@/components/Sidebar/Sidebar'
import { useSearchProductsQueryParamsContext } from '@/contexts/useSearchProductsQueryParamsContext'
import constants from './constants'

const SortButton = () => {
  const { queryParams } = useSearchProductsQueryParamsContext()
  const sortProductsSidebarRef = useRef<SidebarComponent>(null)

  return (
    <>
      <button
        onClick={() => {
          sortProductsSidebarRef.current?.show()
        }}
        className='bg-black text-white font-medium px-4 py-1 rounded'
      >
        Sort: {queryParams.sortBy ? constants.SORT_BY[queryParams.sortBy].label : constants.SORT_BY.relevance.label}
      </button>

      <SortProductsSidebar ref={sortProductsSidebarRef} />
    </>
  )
}

export default SortButton