import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  getDoc,
  doc,
} from 'firebase/firestore'
import { app } from '@/services/firebase/exportFirebaseConfigs'

import { getImages } from './storage'

interface ProductProps {
  available: boolean
  category: string
  daily_menu: boolean
  description: string
  id: string
  name: string
  order_only: boolean
  price: number
  stars: number
  weight: number
  image: string
}

interface AllProductsProps {
  [product: string]: ProductProps
}

let Info_New_Collection = process.env.NEXT_PUBLIC_INFO_NEW_COLLECTION

export async function updatesProductDataInTheFirestore(
  dataProduct: Partial<ProductProps>,
) {
  console.count()
  console.log(dataProduct)

  const infoDatabase = getFirestore(app)
  const docCollection = collection(infoDatabase, `${Info_New_Collection}`)
  const id = dataProduct.id

  try {
    const documentRef = doc(docCollection, id)
    const documentSnapshot = await getDoc(documentRef)

    if (documentSnapshot.exists()) {
      await updateDoc(documentRef, dataProduct)

      console.log('Documento atualizado com sucesso:')

      return true
    } else {
      console.log('Documento não encontrado.')
      return false
    }
  } catch (error) {
    console.error('Erro ao buscar/atualizar documento:', error)
    return false
  }
}

export async function fetchAllProducts() {
  try {
    const infoDatabase = getFirestore(app)
    const docCollection = collection(infoDatabase, `${Info_New_Collection}`)

    const querySnapshot = await getDocs(docCollection)

    const products: any = {}

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data()
        let productId = data.id
        products[productId] = data
      }
    })

    return products
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    throw error
  }
}

export async function fetchProductsAndUpdateIfNotExistsImage() {
  try {
    const allProducts = await fetchAllProducts()

    const productsWithImages = await getImages(allProducts)

    console.log('Finalizou')

    return productsWithImages
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    throw error
  }
}
