'use client'
interface ProductProps {
  [product: string]: {
    name: string
    description: string
    price: number
    category: string
    image: string
    id: string
    available: boolean
    stars: number
  }
}

interface categoryProps {
  data?: ProductProps
  category: string
}

export function SaveDataInLocalStorage(products: ProductProps) {
  sessionStorage.setItem('All products', JSON.stringify(products))
}

export function VerifyIfExistDataInStorage() {
  if (sessionStorage.getItem('All products') != null) {
    return true
  } else {
    return false
  }
}

export function GetAllproductsInlocalStorage() {
  let storageProducts = sessionStorage.getItem('All products')

  if (storageProducts) return storageProducts
}

export function GetAllproductsOfDailyMenu(allproducts?: ProductProps) {
  let storageProducts = sessionStorage.getItem('All products')
  let filteredProducts: ProductProps = {}

  if (storageProducts != null) {
    let products = allproducts ? allproducts : JSON.parse(storageProducts)

    Object.keys(products).map((productId) => {
      if (products[productId].daily_menu === true) {
        filteredProducts[productId] = products[productId]
      }
    })
  }

  return filteredProducts
}

export function FetchProductsCategory({ data, category }: categoryProps) {
  let storageProducts = sessionStorage.getItem('All products')
  let AllProducts
  let newData = {}

  if (!data && storageProducts != null) {
    AllProducts = JSON.parse(storageProducts)
  } else {
    AllProducts = data
    data && sessionStorage.setItem('All products', JSON.stringify(data))
  }

  for (let Product in AllProducts) {
    if (AllProducts[Product].category === category) {
      newData = {
        ...newData,
        [Product]: AllProducts[Product],
      }
    }
  }

  return newData
}
