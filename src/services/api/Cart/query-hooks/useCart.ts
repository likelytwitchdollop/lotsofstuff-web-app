import api from '@/services/api'
import httpClient from '@/services/httpClient'
import ServerCacheKeys from '@/services/ServerCacheKeys'
import { Cart } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const getCart = async () => {
  const { data: cart }: AxiosResponse<Cart> = await httpClient.get(
    `${api.cart}/`,
    { withCredentials: true }
  )

  return cart
}

const useCart = () => {
  return useQuery({
    queryKey: [ServerCacheKeys.cart],
    queryFn: getCart,
  })
}

export default useCart
