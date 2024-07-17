'use client'

import React, { forwardRef, Ref, RefObject } from 'react'
import { Sidebar, SidebarListItem } from '@/components'
import { SidebarComponent } from '@/components/Sidebar/Sidebar'
import { useSearchProductsQueryParamsContext } from '@/contexts/useSearchProductsQueryParamsContext'
import constants from '../constants'

const SortProductsSidebar = ({ }, ref: Ref<SidebarComponent>) => {
  const { queryParams, setQueryParams } = useSearchProductsQueryParamsContext()

  const sidebarRef = ref as RefObject<SidebarComponent>

  return (
    <Sidebar
      ref={ref}
      className='2xs:!w-4/5 md:!w-2/5 lg:!w-1/3 xl:!w-3/12 xl:px-8'
    >
      <p className='font-medium mb-6'>Sort by</p>

      <div className='flex flex-col gap-y-4'>
        {(Object.values(constants.SORT_BY)).map((item) => {
          const isSelected = queryParams.sortBy === item.name

          return (
            <SidebarListItem
              key={item.name}
              label={item.label}
              selected={isSelected}
              onClick={() => {
                setQueryParams({ sortBy: item.name })
                sidebarRef.current?.hide()
              }}
            />
          )
        })}
      </div>
    </Sidebar>
  )
}

export default forwardRef(SortProductsSidebar)