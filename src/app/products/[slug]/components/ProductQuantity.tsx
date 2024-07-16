import { Button, Icon } from '@/components'
import services from '@/services'
import Colors from '@/utils/constants/Colors'
import Helpers from '@/utils/helpers'
import { Product } from '@/utils/types'
import React, { useEffect, useState } from 'react'

const MIN_QUANTITY = 1
const MAX_QUANTITY = 10

type ProductQuantityProps = {
  product: Product
}

const ProductQuantity = ({ product }: ProductQuantityProps) => {
  const { data: cart, status: fetchingCart } = services.Cart.useCart()
  const { mutate: addItemToCart, status: addingItemToCart } = services.Cart.useAddItem()

  const isProductInCart = cart?.items.find((cartItem) => {
    return cartItem.productId === product.id
  })

  const [selectedQty, setSelectedQty] = useState(isProductInCart?.quantity || 1)
  const [selectedQtyInputErrorMsg, setSelectedQtyInputErrorMsg] = useState('')

  useEffect(() => {
    if (addingItemToCart === 'error') {
      Helpers.showToast('error')
    }

    if (addingItemToCart === 'success') {
      Helpers.showToast('success', 'Successfully updated your cart')
    }
  }, [addingItemToCart])

  const EXCEEDED_LIMIT_ERROR_MSG = `Limit of ${MAX_QUANTITY} items`

  const increaseSelectedQty = () => {
    if (selectedQty >= MAX_QUANTITY) {
      setSelectedQtyInputErrorMsg(EXCEEDED_LIMIT_ERROR_MSG)
    } else {
      setSelectedQtyInputErrorMsg('')
    }

    setSelectedQty((prev) => {
      if (prev >= MAX_QUANTITY) {
        return prev
      }

      return prev += 1
    })
  }

  const decreaseSelectedQty = () => {
    setSelectedQtyInputErrorMsg('')

    setSelectedQty((prev) => {
      if (prev <= MIN_QUANTITY) {
        return 1
      }

      return prev -= 1
    })
  }

  return (
    <div
      className='flex flex-col py-6 gap-y-12 2xs:flex-row 2xs:justify-between 2xs:gap-y-0 lg:flex-col lg:justify-between lg:pb-0 flex-1'
    >
      <div>
        <p className="text-gray-300 mb-2">Quantity</p>

        {/* Quantity selector. */}
        <div className="flex flex-row gap-x-4 items-center w-fit">
          {/* Decrease qty. */}
          <button
            disabled={product.quantity === 0}
            onClick={decreaseSelectedQty}
            className={`
              w-10 aspect-square rounded-md border border-gray-200 grid place-content-center hover:bg-gray-200
            `}>
            <Icon name="minus" size={20} color={Colors.black} />
          </button>

          {/* Qty. */}
          <div>
            <input
              type="number"
              value={selectedQty}
              onChange={(event) => {
                if (Number(event.target.value) <= MAX_QUANTITY && Number(event.target.value) >= 0) {
                  setSelectedQty(parseInt(event.target.value))
                  setSelectedQtyInputErrorMsg('')
                } else {
                  setSelectedQtyInputErrorMsg(EXCEEDED_LIMIT_ERROR_MSG)
                }
              }}
              min={1}
              max={10}
              className="bg-black text-white rounded-md w-18 h-10 font-bold text-center grid place-content-center px-4"
            />
          </div>

          {/* Increase qty. */}
          <button
            disabled={product.quantity === 0}
            onClick={increaseSelectedQty}
            className="w-10 aspect-square rounded-md border border-gray-200 grid place-content-center hover:bg-gray-200">
            <Icon name="plus" size={20} color={Colors.black} />
          </button>
        </div>

        {selectedQtyInputErrorMsg && (
          <p className="text-red-600 mt-2">{selectedQtyInputErrorMsg}</p>
        )}
      </div>

      <Button
        title={isProductInCart ? 'Add to cart' : "Add to cart"}
        loading={addingItemToCart === 'pending'}
        disabled={selectedQty > MAX_QUANTITY || selectedQty < MIN_QUANTITY || fetchingCart !== 'success' || product.quantity === 0}
        onClick={() => {
          const cartItem = {
            productId: product.id,
            price: product.price,
            quantity: selectedQty
          }
          addItemToCart(cartItem)
        }}
        className="mt-auto"
      />
    </div>
  )
}

export default ProductQuantity