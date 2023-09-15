import { CheckisOpenStore } from '../check-is-open'
import { FormatCoin } from '../format-coin'
import { getTotalPrices } from '../get-total-price-in-bag-shopping'

export async function sendRequestByWhatsapp() {
  let getBagShoppingInLocStorage = localStorage.getItem('Shopping cart')
  let getAllProductsInLocStorage = sessionStorage.getItem('All products')
  let message = '*Olá! Gostaria de fazer um pedido*.\n \n'
  let totalPrice = getTotalPrices()

  if (getBagShoppingInLocStorage && getAllProductsInLocStorage) {
    let BagProducts = JSON.parse(getBagShoppingInLocStorage)
    let AllProducts = JSON.parse(getAllProductsInLocStorage)

    for (let product in BagProducts) {
      const quantity = BagProducts[product]
      const productName = AllProducts[product].name
      const productDescription = AllProducts[product].description
      const productPrice = AllProducts[product].price
      const totalProductprice = productPrice * quantity

      message += ` *${quantity}* x - *${productName}*: ${FormatCoin(
        totalProductprice,
      )}   \n (${productDescription})\n \n`
    }
  }

  message += `*Totalizando: ${FormatCoin(totalPrice)}*`
  /*
    const phoneNumber = '5588993327359';
    */
  const phoneNumber = '5588993707881'
  const encodedMessage = encodeURIComponent(message)

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    // Open WhatsApp app
    window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
  } else {
    // Open WhatsApp web
    const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
    window.open(url, '_blank')
  }

  return true
}
