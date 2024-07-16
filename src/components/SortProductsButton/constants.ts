import { SortBy } from '@/contexts/useSearchProductsQueryParamsContext'

const SORT_BY: { [name in SortBy]: { name: SortBy; label: string } } = {
  relevance: { name: 'relevance', label: 'Relevance' },
  'price-ascending': { name: 'price-ascending', label: 'Price: Low - High' },
  'price-descending': { name: 'price-descending', label: 'Price: High - Low' },
}

const constants = {
  SORT_BY,
}

export default constants
