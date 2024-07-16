"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/utils/types'
import Helpers from '@/utils/helpers'
import Colors from '@/utils/constants/Colors'

type ProductImagesCarouselProps = {
  product: Product
}

const ProductImagesCarousel = ({ product }: ProductImagesCarouselProps) => {
  const [selectedImg, setSelectedImg] = useState(product.images[0])

  return (
    <div
      className='col-span-7 xl:col-span-6 flex flex-col-reverse gap-y-6 lg:flex-row lg:gap-y-0 lg:gap-x-6 xl:gap-x-12'
    >
      <div
        className="flex flex-row justify-center gap-x-4 lg:flex-col lg:justify-normal lg:gap-x-0 lg:col-span-2"
      >
        {product.images.map((image, index) => {
          const key = index

          return (
            <button
              key={key}
              onClick={() => {
                setSelectedImg(image)
              }}
              style={{ backgroundColor: Colors.imagePlaceholder }}
              className='h-[100px] lg:h-[200px]'
            >
              <Image
                width={0}
                height={0}
                src={image.url}
                alt={Helpers.getFullProductName(product)}
                sizes="100vw"
                className='w-full h-[100px] lg:h-[200px]'
              />
            </button>
          )
        })}
      </div>

      {/* Selected image. */}
      <div
        style={{ backgroundColor: Colors.imagePlaceholder }}
        className="
        col-span-5 xl:col-span-4 
        2xs:h-[450px] xs:h-[560px] md:w-1/2 md:mx-auto lg:mx-0 lg:w-auto md:h-[450px] lg:h-[560px] xl:h-[550px]">
        <Image
          width={0}
          height={0}
          src={selectedImg.url}
          alt={Helpers.getFullProductName(product)}
          sizes="100vw"
          className='w-full 2xs:h-[450px] xs:h-[560px] md:h-[450px] lg:h-[560px] xl:h-[550px]'
        />
      </div>
    </div>
  )
}

export default ProductImagesCarousel
