"use client"

import React from 'react'
import { Product } from '@/utils/types'
import Link from 'next/link'
import Colors from '@/utils/constants/Colors'
import Image from 'next/image'
import Carousel from '../Carousel'
import { useRouter } from 'next-nprogress-bar'

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter()

  return (
    <div className='w-full max-w-[282px]'>
      {/* The images for home products are smaller than the images for everything esle, so the default background color has been changed to match home products instead. */}

      <div
        style={{ backgroundColor: Colors.imagePlaceholder }}
        className='relative mb-4 group overflow-clip hover:cursor-pointer'
      >
        <Carousel>
          {product.images.map((image, index) => {
            const key = index

            return (
              <Image
                key={key}
                onClick={() => {
                  void router.push(`/products/${product.slug}`)
                }}
                src={image.url}
                alt={`${product.brand}, ${product.productName}`}
                width={282}
                height={400}
              />
            )
          })}
        </Carousel>
      </div>

      <div className='flex flex-col gap-y-2'>
        <Link
          href={`/products/${product.slug}`} className='hover:cursor-pointer group'
        >
          <p className='font-medium text-lg line-clamp-1'>{product.productName}</p>
          <p className='font-medium text-sm text-gray-300 line-clamp-1'>{product.brand}</p>
        </Link>
        <p className='italic font-medium text-lg'>R {product.price}</p>
        <p className='font-medium text-gray-300 text-xs'>
          <Link href={`/${product.category}`}>
            <span className='hover:underline hover:underline-offset-2 transition duration-300 ease-in-out'>
              {product.category}
            </span>
          </Link>
          <span className='inline-block mb-0.5 mx-2 bg-gray-300 w-1 aspect-square rounded-full' />
          <Link href={`/${product.category}/${product.subCategory}`}>
            <span className='hover:underline hover:underline-offset-2 transition duration-300 ease-in-out'>
              {product.subCategory}
            </span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ProductCard