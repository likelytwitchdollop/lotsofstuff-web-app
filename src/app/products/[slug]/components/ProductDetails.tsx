"use client"

import React, { } from 'react'
import Helpers from '@/utils/helpers'
import { Product } from '@/utils/types'
import ProductQuantity from './ProductQuantity'

type ProductDetailsProps = {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="col-span-5 xl:col-span-6 flex flex-col">
      <div>
        <h1 className="font-medium text-3xl">{product.productName}</h1>
        <p className="font-medium text-gray-300">{product.brand}</p>

        <p className='py-6'>{product.description}</p>
      </div>

      <div className="py-6">
        <p className="text-gray-300">Availability</p>
        <div className="font-bold">
          {product.quantity === 0 && <span className="text-red-600">out of stock</span>}

          {product.quantity <= 10 && product.quantity > 0 && (
            <span className="text-red-600">{product.quantity} item{Helpers.getPlural(product.quantity)} left</span>
          )}

          {product.quantity >= 10 && 'in stock - 🎉'}
        </div>
      </div>

      <div className="py-6 border-y border-gray-200">
        <p className="text-gray-300 mb-2">Price</p>
        <p className="font-bold text-2xl">R {product.price}</p>
      </div>

      <ProductQuantity product={product} />
    </div>
  )
}

export default ProductDetails