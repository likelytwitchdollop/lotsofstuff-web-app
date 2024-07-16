export type FilterBy = 'category' | 'brand'

export type Filters = {
  [name: string]: {
    name: FilterBy
    label: string
    options: { name: string; label?: string }[]
  }
}

export const ALL_FILTERS: Filters = {
  category: {
    name: 'category',
    label: 'Category',
    options: [
      { name: 'beauty', label: 'Beauty' },
      { name: 'fashion', label: 'Fashion' },
      // { name: 'home', label: 'Home' },
    ],
  },
  brand: {
    name: 'brand',
    label: 'Brand',
    options: [
      { name: 'WE MAKE CUTE THINGS' },
      { name: 'we make cute things too' },
      // { name: 'Home + Decor' },
    ],
  },
}

export const CATEGORIES_PAGE_FILTERS = { brand: { ...ALL_FILTERS.brand } }
