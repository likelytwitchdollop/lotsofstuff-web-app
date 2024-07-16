import api from '@/services/api'
import httpClient from '@/services/httpClient'
import ServerCacheKeys from '@/services/ServerCacheKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type AddItemProps = {
  productId: string
}

const removeItem = async (props: AddItemProps) => {
  const { data }: AxiosResponse<AddItemProps> = await httpClient.post(
    `${api.cart}/remove-item`,
    { ...props },
    { withCredentials: true }
  )

  return data
}

const useRemoveItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ServerCacheKeys.cart],
      })
    },
  })
}

export default useRemoveItem
