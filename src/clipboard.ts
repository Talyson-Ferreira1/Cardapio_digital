/*
 ---------------- Input  hours ------------------

  <label htmlFor="abertura">
  <Field
    type="time"
    min="00:00"
    max="23:59"
    id="abertura"
    name="abertura"
    required
    className={styles.input}
  />
</label>
<ErrorMessage
  className={styles.error_cadastrar}
  name="abertura"
  required
  component="div"
/>








  <h2>Sua sacola está vazia</h2>

  <Image
    src="/ilustracoes/bag-shopping.png"
    alt="empty bag ilustration"
    width="200"
    height="150"
    priority
  />

 <Image
    src={productImage}
    alt="Product image"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />


portions
recommendation
meals
drinks
desserts 



interface ProductProps {
  [product: string]: {
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
}


interface updatesProductDataInTheFirestoreProps {
  available?: boolean
  category?: string
  daily_menu?: boolean
  description?: string
  id: string
  name?: string
  order_only?: boolean
  price?: number
  stars?: number
  weight?: number
  image?: string
}


*/

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { app } from '@/services/firebase/exportFirebaseConfigs'

interface imagesProps {
  [id: string]: string
}

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
let newFolderNameImg = process.env.NEXT_PUBLIC_NEW_FOLDERNAMEIMG

export async function FetchAllProducts0() {
  const getAllProducts = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        const infoDatabase = getFirestore(app)
        const docCollection = collection(infoDatabase, `${Info_New_Collection}`)

        getDocs(docCollection)
          .then((querySnapshot: QuerySnapshot<any>) => {
            const products: any = {}

            querySnapshot.forEach((doc: any) => {
              if (doc.exists()) {
                const data = doc.data()
                products[data.id] = data
              }
            })

            resolve(products)
          })
          .catch((error) => {
            reject(`Erro ao buscar dados: ${error}`)
          })
      } catch (error) {
        reject(`Erro ao buscar dados: ${error}`)
      }
    })
  }

  const getImagesOfProducts = async ({ infoProducts }: AllProductsProps) => {
    const storage = getStorage(app)

    let imagesPromises: imagesProps = {}

    try {
      for (const product in infoProducts) {
        const imageRef = ref(
          storage,
          `${newFolderNameImg}/${product}/imagem.jpg`,
        )
        const imageUrl = await getDownloadURL(imageRef)
        imagesPromises = {
          ...imagesPromises,
          [product]: imageUrl,
        }
      }

      return imagesPromises
    } catch (error) {
      console.log(`Erro ao buscar imagens: ${error}`)
    }

    return imagesPromises
  }

  const joinInfoProduct = (info: AllProductsProps, img: imagesProps) => {
    let newProductList = {}

    for (let idProduct in info) {
      newProductList = {
        ...newProductList,
        [idProduct]: {
          ...info[idProduct],
          image: img[idProduct],
        },
      }
    }

    return newProductList
  }

  const allProducts = await getAllProducts()

  const allImagesOfProducts: imagesProps = await getImagesOfProducts({
    infoProducts: allProducts,
  })

  const products = joinInfoProduct(allProducts, allImagesOfProducts)

  console.log('Requisição')

  const result: AllProductsProps = products

  return result
}

export async function EditDailyMenuInDb0(id: string, value: boolean) {
  const infoDatabase = getFirestore(app)
  const docCollection = collection(infoDatabase, `${Info_New_Collection}`)

  try {
    const documentRef = doc(docCollection, id)
    const documentSnapshot = await getDoc(documentRef)

    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data()

      data.daily_menu = value

      await updateDoc(documentRef, data)

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
