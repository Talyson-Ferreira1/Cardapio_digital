import { CheckisOpenStore } from '../check-is-open'
import { FormatCoin } from '../format-coin'
import { getTotalPrices } from '../get-total-price-in-bag-shopping'

export async function sendRequestByWhatsapp() {
  let getBagShoppingInLocStorage = localStorage.getItem('Shopping cart')
  let getAllProductsInLocStorage = sessionStorage.getItem('All products')
  let getAllObservationsOfProducts = localStorage.getItem('Product Description')
  let message = '*Olá! Gostaria de fazer um pedido*.\n \n'
  let totalPrice = getTotalPrices()

  if (
    getBagShoppingInLocStorage &&
    getAllProductsInLocStorage &&
    getAllObservationsOfProducts
  ) {
    let BagProducts = JSON.parse(getBagShoppingInLocStorage)
    let AllProducts = JSON.parse(getAllProductsInLocStorage)
    let observation = JSON.parse(getAllObservationsOfProducts)

    for (let product in BagProducts) {
      const quantity = BagProducts[product]
      const productName = AllProducts[product].name
      const productDescription = AllProducts[product].description
      const productPrice = AllProducts[product].price
      const productObservation = observation[product]
      const totalProductprice = productPrice * quantity

      message += ` _*${quantity}*_ x - _*${productName}*_ : ${FormatCoin(
        totalProductprice,
      )}   \n (${productDescription})\n  ${
        productObservation != undefined && productObservation != ''
          ? 'Observação: ' + productObservation
          : ''
      } \n \n`
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
