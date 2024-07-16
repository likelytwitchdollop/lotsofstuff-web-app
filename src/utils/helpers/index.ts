import toast from 'react-hot-toast'
import { Product } from '../types'
import NPMDecodeUriComponent from 'decode-uri-component'

class Helpers {
  static isDevelopmentMode =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

  static getPlural = (numberOfItems: number) => {
    return `${numberOfItems > 1 || numberOfItems === 0 ? 's' : ''}`
  }

  static showToast = (type: 'success' | 'error', message?: string) => {
    if (type === 'error') {
      toast('Something went wrong. Please try again.', { icon: '😥' })
    }

    if (type === 'success') {
      toast(message || 'Success!', { icon: '🎉' })
    }
  }

  static formatPrice = (price: number) => {
    if (isNaN(price)) {
      return 'Invalid number'
    }

    return new Intl.NumberFormat('en-US').format(price)
  }

  static getFullProductName = (product: Product) => {
    return `${product.brand}, ${product.productName}`
  }

  static decodeUriComponent = (value: string | Array<string> | undefined) => {
    if (value && typeof value === 'string') {
      return NPMDecodeUriComponent(value)
    }

    if (value && typeof value === 'object' && Array.isArray(value)) {
      return value.map((item) => NPMDecodeUriComponent(item)).join(',')
    }

    return ''
  }

  static sleep = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay))
  }
}

export default Helpers
