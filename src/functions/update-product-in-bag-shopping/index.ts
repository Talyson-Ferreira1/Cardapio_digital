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

type UdateProductProps = {
  id: string
  action: string
}

export function UdateProductInBag({ id, action }: UdateProductProps) {
  const productsInBagShopping = localStorage.getItem('Shopping cart')
  const newData = productsInBagShopping
    ? { ...JSON.parse(productsInBagShopping) }
    : {}

  if (newData[id] < 5 && action === 'increase') newData[id] = newData[id] + 1

  if (!(newData[id] === 1) && action === 'decrease')
    newData[id] = newData[id] - 1

  localStorage.setItem('Shopping cart', JSON.stringify(newData))
  getTotalPrices()
}
