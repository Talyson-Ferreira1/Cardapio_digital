'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getTotalPrices } from '@/functions/get-total-price'
import { getAllProductsInBagShopping } from '@/functions/get-all-products-of-bag'
import { sendRequestByWhatsapp } from '@/functions/send-request-for-whatsapp'
import { UdateProductInBag } from '@/functions/update-product-in-bag'
import { deleteProductInBag } from '@/functions/delete-product-in-bag'
import ProductInBag from '@/components/product-in-bag'
import TotalPrices from '@/components/total-prices'
import ProductBagLoading from '@/components/Loading/loading-bag-product'

import styles from '@/styles/sacola.module.scss'

type Product = {
  name: string
  description: string
  price: number
  image: string
  id: string
  category: string
  available: boolean
  stars: number
  quantity: number
}

type ProductsProps = {
  [id: string]: Product
}

export default function BagShopping() {
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [hasProductsInBag, setHasProductsInBag] = useState<boolean>(false)
  const [productsInBag, setProductsInBag] = useState<ProductsProps>({})

  const getPrices = () => {
    let totalpricesOfProducts = getTotalPrices()
    setTotalPrice(totalpricesOfProducts)
  }

  const getAllProducts = () => {
    let AllProductsInBag = getAllProductsInBagShopping()
    setProductsInBag(AllProductsInBag)
  }

  const fineshedRequest = () => {
    sendRequestByWhatsapp()
  }

  const refresh = () => {
    getPrices()
    getAllProducts()
  }

  const editQuantityOfProduct = (action: string, id: string) => {
    UdateProductInBag({ id: id, action: action })
    refresh()
  }

  const deleteProduct = (id: string) => {
    deleteProductInBag(id)
    console.log('produto deletado', id)
    refresh()
  }

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    Object.keys(productsInBag).length > 0
      ? setHasProductsInBag(true)
      : setHasProductsInBag(false)
  }, [productsInBag])

  return (
    <main className={styles.main_bag_shopping}>
      {hasProductsInBag ? (
        <>
          {productsInBag ? (
            <>
              {Object.keys(productsInBag).map((product, index) => {
                return (
                  <ProductInBag
                    key={index}
                    quantityProduct={editQuantityOfProduct}
                    deleteProduct={deleteProduct}
                    product={productsInBag[product]}
                  />
                )
              })}
              <TotalPrices
                totalPrice={totalPrice}
                fineshedRequest={fineshedRequest}
              />
            </>
          ) : (
            <>
              <ProductBagLoading />
              <ProductBagLoading />
              <ProductBagLoading />
              <ProductBagLoading />
              <ProductBagLoading />
              <ProductBagLoading />
              <ProductBagLoading />
            </>
          )}
        </>
      ) : (
        <div className={styles.container_empty_bag}>
          <h2>Sua sacola está vazia</h2>

          <Image
            src="/ilustracoes/bag-shopping.png"
            alt="empty bag ilustration"
            width="200"
            height="150"
            priority
          />

          <h2>adicione produtos</h2>
        </div>
      )}
    </main>
  )
}
