'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { FormatCoin } from '@/functions/format-coin'
import { ToastContainer, toast } from 'react-toastify'
import RenderStar from '@/components/render-stars'

import { UpdateBagShopping } from '@/functions/update-bag-shopping'

import styles from '@/styles/product-details.module.scss'
import 'react-toastify/dist/ReactToastify.css'

type ProductProps = {
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

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [data, setData] = useState<ProductProps>()
  let order_only = data?.order_only
  const router = useRouter()
  const notifySucess = () => toast('Produto adicionado')
  const notifyError = () => toast('Limite máximo de 5 produtos')

  const getDataInCache = () => {
    let dataInStorage = sessionStorage.getItem('All products')

    dataInStorage === null
      ? router.back()
      : setData(JSON.parse(dataInStorage)[params.id])
  }

  const saveProductInBag = () => {
    if (data != undefined) {
      let response = UpdateBagShopping(data)

      response ? notifySucess() : notifyError()
    }
  }

  const openWhatsApp = () => {
    if (data) {
      const message = `Olá! Gostaria de fazer um pedido. \n \n *1 X* - *${data?.name}* : R$: ${FormatCoin(
        data.price,
      )} \n (${data?.description}).`

      const phoneNumber = '5588993707881'
      const encodedMessage = encodeURIComponent(message)
      const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
      window.open(url, '_blank')
    }
  }

  useEffect(() => {
    getDataInCache()

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }, [])

  return (
    <main className={styles.container}>
      <div className="container-toast">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
      {data != undefined && (
        <>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${data.image})` }}
          >
            <Image
              src={data.image}
              alt="product image"
              width={430}
              height={430}
              priority
            />
          </div>
          <div className={styles.info}>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            {order_only && <h3> Somente encomenda</h3>}
            <h2>{FormatCoin(data.price)}</h2>
            <button onClick={openWhatsApp}>
              <Image
                src="/icons/whatsapp.svg"
                alt="whatsapp icon"
                width={15}
                height={15}
                priority
              />
              Pedir esse Produto
            </button>
            <button onClick={saveProductInBag}>
              <Image
                src="/icons/bag.svg"
                alt="whatsapp icon"
                width={15}
                height={15}
                priority
              />
              Adicionar a sacola
            </button>
            <div>
              <RenderStar counter={data.stars} />
            </div>
          </div>
        </>
      )}
    </main>
  )
}
