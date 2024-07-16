import { useSearchProductsQueryParamsContext } from '@/contexts/useSearchProductsQueryParamsContext'

const useSearchProductsFilters = () => {
  const { queryParams, setQueryParams } = useSearchProductsQueryParamsContext()

  const selectedFilters: { filterType: string; value: string }[] =
    Object.entries({
      category: queryParams.category || [],
      brand: queryParams.brand || [],
    })
      .map(([key, values]) => {
        return values.map((value) => ({ filterType: key, value }))
      })
      .flat(1)

  const removeFilter = (filter: { filterType: string; value: string }) => {
    const selectedFilters =
      queryParams[filter.filterType as 'category' | 'brand'] || []
    const newQueryParam = [...selectedFilters].filter((queryParam) => {
      return queryParam !== filter.value
    })

    setQueryParams({ [filter.filterType]: newQueryParam })
  }

  const addOrRemoveFilter = (
    filterType: { name: string },
    item: { name: string }
  ) => {
    const filterTypeName = filterType.name as 'category' | 'brand'

    // Remove item from filter.
    if (queryParams[filterTypeName]?.includes(item.name)) {
      const newQueryParam = [...queryParams[filterTypeName]].filter(
        (filter) => {
          return filter !== item.name
        }
      )

      setQueryParams({
        [filterType.name]: newQueryParam,
      })
    }

    // Add item to filter.
    else {
      const newQueryParam = queryParams[filterTypeName]
        ? [...queryParams[filterTypeName]]
        : []
      newQueryParam.push(item.name)

      setQueryParams({
        [filterType.name]: newQueryParam,
      })
    }
  }

  return {
    selectedFilters,
    addOrRemoveFilter,
    removeFilter,
  }
}

export default useSearchProductsFilters
