'use client'

import React, { useRef } from 'react'
import { Icon } from '@/components'
import Colors from '@/utils/constants/Colors'
import FilterProductsSidebar from './components/FilterProductsSidebar'
import { SidebarComponent } from '@/components/Sidebar/Sidebar'
import { Filters } from './constants'

type FilterProductsButtonProps = {
  filters?: Filters
}

const FilterProductsButton = ({ filters = undefined }: FilterProductsButtonProps) => {
  const filterProductsSidebarRef = useRef<SidebarComponent>(null)

  return (
    <>
      <button
        onClick={() => {
          filterProductsSidebarRef.current?.show()
        }}
      >
        <Icon name='funnel' size={24} color={Colors.black} />
      </button>

      <FilterProductsSidebar ref={filterProductsSidebarRef} filters={filters} />
    </>
  )
}

export default FilterProductsButton