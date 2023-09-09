interface allProductsProps {
  [product: string]: {
    name: string
    description: string
    price: number
    image: string
    category: string
    id: string
    available: boolean
    stars: number
    order_only: boolean
    daily_menu: boolean
    weight: number
  }
}

type props = {
  products: allProductsProps
  category: string
}

export function FilterProducts({ products, category }: props) {
  let filteredProducts: allProductsProps = {}

  if (category === '') {
    return products
  }

  if (category === 'daily_menu') {
    Object.keys(products).map((productId) => {
      if (products[productId].daily_menu === true) {
        filteredProducts[productId] = products[productId]
      }
    })
    return filteredProducts
  } else {
    Object.keys(products).map((productId) => {
      if (products[productId].category === category) {
        filteredProducts[productId] = products[productId]
      }
    })

    return filteredProducts
  }
}
