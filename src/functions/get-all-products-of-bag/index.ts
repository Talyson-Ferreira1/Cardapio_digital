export function getAllProductsInBagShopping() {
  let getBagShoppingInLocStorage = localStorage.getItem('Shopping cart')
  let getAllProductsInLocStorage = sessionStorage.getItem('All products')
  let newData: any = {}

  if (getBagShoppingInLocStorage && getAllProductsInLocStorage) {
    let bagShopping = JSON.parse(getBagShoppingInLocStorage)
    let allProducts = JSON.parse(getAllProductsInLocStorage)

    Object.keys(bagShopping).forEach((product) => {
      newData[product] = {
        ...allProducts[product],
        quantity: bagShopping[product],
      }
    })
  }

  return newData
}
