// This list should be fetched from the server.
export const CATEGORIES = [
  {
    name: 'beauty',
    label: 'Beauty - 💄',
    description: 'Need some glitz + glam? We got all you need',
    subCategories: [
      { slug: 'skincare', label: 'Skincare' },
      { slug: 'makeup', label: 'Makeup' },
      { slug: 'haircare', label: 'Haircare' },
      { slug: 'fragrance', label: 'Fragrance' },
    ],
  },
  {
    name: 'fashion',
    label: 'Fashion - 👠',
    description:
      'From the runway to homebody, you can find something for every occassion',
    subCategories: [
      { slug: 'dresses', label: 'Dresses' },
      { slug: 'shirts + blouses', label: 'Shirts + Blouses' },
      { slug: 'tops', label: 'Tops' },
      { slug: 't-shirts', label: 'T-shirts' },
      { slug: 'knitwear + sweatshirts', label: 'Knitwear + Sweatshirts' },
      { slug: 'coats', label: 'Coats' },
      { slug: 'jackets', label: 'Jackets' },
      { slug: 'blazers', label: 'Blazers' },
      { slug: 'pants', label: 'Pants' },
      { slug: 'jeans', label: 'Jeans' },
      { slug: 'skirts + shorts', label: 'Skirts + Shorts' },
      { slug: 'shoes', label: 'Shoes' },
      { slug: 'accessories', label: 'Accessories' },
      { slug: 'bags', label: 'Bags' },
    ],
  },
  {
    name: 'home',
    label: 'Home - 🏡',
    comingSoon: true,
    description: 'For that comfy home-aboad you been looking for',
    subCategories: [
      { slug: 'kitchen', label: 'Kitchen' },
      { slug: 'bedroom', label: 'Bedroom' },
      { slug: 'furniture', label: 'Furniture' },
    ],
  },
]
