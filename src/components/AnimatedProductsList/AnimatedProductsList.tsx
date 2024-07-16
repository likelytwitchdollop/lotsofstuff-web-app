"use client"

import React from 'react'
import { Product } from '@/utils/types'
import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from '../ProductCard'

type AnimatedProductsListProps = {
  products: Product[]
}

const AnimatedProductsList = ({ products }: AnimatedProductsListProps) => {
  return (
    <section
      className="grid 2xs:grid-cols-1 xs:grid-cols-2 gap-x-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => {
          return (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6, type: "spring" }}
              className='flex flex-col items-center'
            >
              <ProductCard key={product.id} product={product} />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </section>
  )
}

export default AnimatedProductsList