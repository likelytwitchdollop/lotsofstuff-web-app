'use client'

import React, { forwardRef, Ref, RefObject, useEffect } from 'react'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Sidebar from '@/components/Sidebar'
import { SidebarComponent } from '@/components/Sidebar/Sidebar'
import services from '@/services'
import Colors from '@/utils/constants/Colors'
import Helpers from '@/utils/helpers'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

const CartSidebar = ({ }, ref: Ref<SidebarComponent>) => {
  const { data: cart } = services.Cart.useCart()
  const { mutate: removeItemFromCart, status: removingItemFromCart } =
    services.Cart.useRemoveItem()

  const cartSidebarRef = ref as RefObject<SidebarComponent>

  useEffect(() => {
    if (removingItemFromCart === 'error') {
      Helpers.showToast('error')
    }
  }, [removingItemFromCart])

  return (
    <Sidebar ref={ref} containerClassName='space-y-12'>
      {(!cart || cart?.items.length === 0) && (
        <div>
          <p className='text-center'>
            Your cart is empty.
            <br />
            Start shopping and all your stuff will be here - 😉.
          </p>
        </div>
      )}

      {cart && cart.items.length > 0 && (
        <>
          <div className='space-y-2 mb-6'>
            <p className='font-medium text-2xl'>Cart</p>
            <p className='font-bold text-3xl'>R {cart.totalCost}</p>
            <p>Total stuff: {cart.totalItems}</p>
          </div>

          <div className='flex flex-col border-collapse'>
            <AnimatePresence mode="popLayout">
              {cart.items.map((cartItem) => {
                return (
                  // CartItem.
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, z: -400 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    key={cartItem.productId} className='relative flex flex-row gap-x-6 border-y border-gray-200 py-6'>
                    <button
                      onClick={() => {
                        removeItemFromCart({ productId: cartItem.productId })
                      }}
                      className='absolute top-6 right-2'
                    >
                      <Icon name='close' size={24} color={Colors.black} />
                    </button>

                    <Link
                      href={`/products/${cartItem.product[0].slug}`}
                      onClick={() => {
                        cartSidebarRef.current?.hide()
                      }}
                    >
                      <div
                        style={{ background: Colors.imagePlaceholder }}
                        className='w-[100px] lg:w-[200px]'>
                        <Image
                          src={cartItem.product[0].images[0].url}
                          alt={`${cartItem.product[0].brand}, ${cartItem.product[0].productName}`}
                          width={0}
                          height={0}
                          sizes="100vw" // If this is removed, the images are blurry.
                          className='w-full h-auto'
                        />
                      </div>
                    </Link>

                    <div className='flex flex-col justify-between '>
                      <div className='space-y-1'>
                        <Link
                          href={`/products/${cartItem.product[0].slug}`}
                          onClick={() => {
                            cartSidebarRef.current?.hide()
                          }}
                        >
                          <p className='font-medium text-lg pr-12 line-clamp-2 hover:underline'>{cartItem.product[0].productName}</p>
                        </Link>
                        <p className='font-medium text-sm text-gray-300 line-clamp-2'>{cartItem.product[0].brand}</p>
                        <p className='font-medium text-sm'>R {cartItem.product[0].price} each</p>
                      </div>

                      <div>
                        <p>Qty: {cartItem.quantity}</p>
                        <p className='font-bold text-xl'>R {cartItem.product[0].price}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          <Button
            title='Checkout'
            onClick={() => {
              toast("Let's try again another time...", { icon: '😅' })
            }}
            className='mx-auto mt-auto'
          />
        </>
      )}
    </Sidebar>
  )
}

export default forwardRef(CartSidebar)