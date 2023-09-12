import { getTotalPrices } from '../get-total-price-in-bag-shopping'

export function deleteProductInBag(id: string) {
  const productsInBagShopping = localStorage.getItem('Shopping cart')
  const newData = productsInBagShopping
    ? { ...JSON.parse(productsInBagShopping) }
    : {}

  delete newData[id]

  localStorage.setItem('Shopping cart', JSON.stringify(newData))
  getTotalPrices()
}
