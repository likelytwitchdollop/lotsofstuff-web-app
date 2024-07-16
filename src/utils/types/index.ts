export type Product = {
  id: string
  productName: string
  brand: string
  description: string
  price: number
  quantity: number
  images: { url: string; tag?: string }[]
  rating: number
  color?: ProductColor
  category: ProductCategory
  subCategory: ProductSubCategory
  slug: string
}

export type ProductColor = 'white' | 'black' | 'pink' | 'blue' | 'yellow'

export type ProductCategory = 'beauty' | 'fashion' | 'home'

export type ProductSubCategory =
  | 'dresses'
  | 'pants'
  | 'hair care'
  | 'towels'
  | 'fragrance'
  | 'skincare'

export type Order = {
  id: string
  userId: string // Joined to User.
  items: OrderItem[]
  totalItems: number
  totalAmount: number
  status: OrderStatus
  paymentMethod: PaymentMethod
}

export type OrderItem = {
  productId: string // Joined to Product.
  quantity: number
  price: number
  returned: boolean // Can omit as this is for a simple e-commerce website.
}

export type CartItem = {
  productId: string // Joined to Product.
  quantity: number
  product: [
    {
      productName: string
      brand: string
      price: number
      slug: string
      images: [{ url: string; tag?: string }]
    }
  ]
}

export type OrderStatus =
  | 'processingPayment'
  | 'processingOrder'
  | 'shipped'
  | 'received'
  | 'cancelled'

export type PaymentMethod = 'card' | 'thirdPartyGateway'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  hashedPassword: string
}

export type Cart = {
  id: string
  // sessionId: string
  items: CartItem[]
  totalItems: number
  totalCost: number
}
