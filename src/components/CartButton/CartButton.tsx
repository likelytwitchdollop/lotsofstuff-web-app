'use client'

import React, { useEffect, useRef } from 'react'
import Icon from '../Icon'
import Colors from '@/utils/constants/Colors'
import { SidebarComponent } from '../Sidebar/Sidebar'
import CartSidebar from './components/CartSidebar'
import services from '@/services'
import ActivityIndicator from '../ActivityIndicator'
import Helpers from '@/utils/helpers'

const CartButton = () => {
  const cartSidebarRef = useRef<SidebarComponent>(null)

  const { data: cart, status: fetchingCart } = services.Cart.useCart()

  useEffect(() => {
    if (fetchingCart === 'error') {
      Helpers.showToast('error')
    }
  }, [fetchingCart])

  return (
    <>
      <button
        disabled={fetchingCart === 'pending'}
        onClick={() => {
          cartSidebarRef.current?.show()
        }}
        className='flex flex-row items-center gap-x-1'>
        {/* There's an issue with eva-icons whereby it is not re-rendering the icon on prop change. */}
        <>
          {fetchingCart === 'pending' &&
            <Icon name='shopping-cart' size={24} color={Colors['gray-200']} />
          }
          {fetchingCart !== 'pending' &&
            <Icon name='shopping-cart' size={24} color={Colors.black} />
          }
        </>

        {fetchingCart === 'pending' && <ActivityIndicator size={24} color={Colors.black} />}
        {fetchingCart === 'success' && cart &&
          <span className='inline-block w-6 font-medium'>{cart.totalItems}</span>
        }
        {fetchingCart === 'error' &&
          <span className='inline-block w-6 font-medium'>0</span>
        }
      </button>

      <CartSidebar ref={cartSidebarRef} />
    </>
  )
}

export default CartButton