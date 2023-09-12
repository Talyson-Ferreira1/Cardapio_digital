import { getTotalPrices } from '../get-total-price-in-bag-shopping'

type UpdateBagShoppingProps = {
  name: string
  description: string
  price: number
  image: string
  id: string
  available: boolean
  stars: number
}

export function UpdateBagShopping(data: UpdateBagShoppingProps) {
  const productsInBagShopping = localStorage.getItem('Shopping cart')

  const newData = productsInBagShopping
    ? { ...JSON.parse(productsInBagShopping) }
    : {}

  if (newData[data.id] && newData[data.id] >= 5) {
    return false
  }

  newData[data.id] = (newData[data.id] || 0) + 1
  localStorage.setItem('Shopping cart', JSON.stringify(newData))
  getTotalPrices()
  return true
}
