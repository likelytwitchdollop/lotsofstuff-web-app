import api from '@/services/api'
import httpClient from '@/services/httpClient'
import ServerCacheKeys from '@/services/ServerCacheKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type AddItemProps = {
  productId: string
  price: number // Price is retrieved from current product to reduce number of requests made to the DB.
  quantity: number
}

const addItem = async (props: AddItemProps) => {
  const { data }: AxiosResponse<AddItemProps> = await httpClient.post(
    `${api.cart}/add-item`,
    { ...props },
    { withCredentials: true }
  )

  return data
}

const useAddItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ServerCacheKeys.cart],
      })
    },
  })
}

export default useAddItem
