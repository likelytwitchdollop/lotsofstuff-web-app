import React, { forwardRef, Ref } from 'react'
import { Accordion, ActivityIndicator, SelectedFilterChip, SidebarListItem } from '@/components'
import Sidebar, { SidebarComponent } from '@/components/Sidebar/Sidebar'
import { ALL_FILTERS, Filters } from '../constants'
import PriceRangeFilter from './PriceRangeFilter'
import services from '@/services'
import Colors from '@/utils/constants/Colors'
import { useSearchProductsFilters } from '@/hooks'

type FilterProductsSidebarProps = {
  filters?: Filters
}

const FilterProductsSidebar = ({ filters = ALL_FILTERS }: FilterProductsSidebarProps, ref: Ref<SidebarComponent>) => {
  const { selectedFilters, removeFilter, addOrRemoveFilter } = useSearchProductsFilters()

  const { data: maximumPrice, status: fetchingMaximumPrice } = services.Products.useMaximumPrice()

  return (
    <Sidebar
      ref={ref}
      className='2xs:!w-4/5 md:!w-2/5 lg:!w-1/3 xl:!w-3/12 xl:px-8'
    >
      {selectedFilters.length > 0 && (
        <div className='flex flex-row flex-wrap gap-4 mt-4 mb-6'>
          {selectedFilters.map((filter) => {
            return (
              <SelectedFilterChip
                key={filter.value}
                label={filter.value}
                onClick={() => {
                  removeFilter(filter)
                }} />
            )
          })}
        </div>
      )}

      <div>
        {Object.values(filters).map((filterType) => {
          return (
            <Accordion key={filterType.name} label={filterType.label}
              className={`border-b border-gray-200 py-6`}
            >
              <div className='flex flex-col gap-y-4'>
                {filterType.options.map((item) => {
                  const isSelected = !!selectedFilters.find((selectedFilter) => {
                    return selectedFilter.value === item.name
                  })

                  return (
                    <SidebarListItem
                      key={item.name}
                      label={item?.label || item.name}
                      onClick={() => {
                        addOrRemoveFilter(filterType, item)
                      }}
                      selected={isSelected}
                    />
                  )
                })}
              </div>
            </Accordion>
          )
        })}

        <Accordion label='Price'
          className={`border-b border-gray-200 py-6`}
        >
          {fetchingMaximumPrice === 'pending' && <ActivityIndicator size={24} color={Colors.black} />}

          {fetchingMaximumPrice === 'success' && maximumPrice && (
            <PriceRangeFilter minValue={0} maxValue={Math.round((maximumPrice + 100) / 100) * 100} />
          )}
        </Accordion>
      </div>
    </Sidebar >
  )
}

export default forwardRef(FilterProductsSidebar)