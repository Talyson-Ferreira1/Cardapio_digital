export function getTotalPrices() {
  const productsInBagShopping = localStorage.getItem('Shopping cart')
  const allProducts = localStorage.getItem('All products')

  let totalPrices = 0

  if (allProducts && productsInBagShopping) {
    let ProductsInBagConverted = JSON.parse(productsInBagShopping)
    let allProductsConverted = JSON.parse(allProducts)

    for (const product in ProductsInBagConverted) {
      let currentPrice = allProductsConverted[product].price

      totalPrices = (totalPrices + (currentPrice * ProductsInBagConverted[product])); // prettier-ignore
    }
  }

  localStorage.setItem('Total prices', JSON.stringify(totalPrices))
  return totalPrices
}
