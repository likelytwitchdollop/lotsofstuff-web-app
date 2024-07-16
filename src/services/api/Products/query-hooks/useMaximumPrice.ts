import api from '@/services/api'
import httpClient from '@/services/httpClient'
import ServerCacheKeys from '@/services/ServerCacheKeys'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const getMaximumPrice = async () => {
  const { data: maximumPrice }: AxiosResponse<number> = await httpClient.get(
    `${api.products}/max-price` // Consider fetching the maximum price for each category for improved filters.
  )

  return maximumPrice
}

const useMaximumPrice = () => {
  return useQuery({
    queryKey: [ServerCacheKeys['max-price']],
    queryFn: getMaximumPrice,
    staleTime: 1 * 60 * 60 * 1000, // Re-fetch maximum price every hour.
  })
}

export default useMaximumPrice
