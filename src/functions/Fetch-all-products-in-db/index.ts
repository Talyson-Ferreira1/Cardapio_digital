import {
  getFirestore,
  collection,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { app } from '@/services/exportFirebase'

interface imagesProps {
  [id: string]: string
}

interface ProductProps {
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

interface AllProductsProps {
  [product: string]: ProductProps
}

let Info_New_Collection = process.env.NEXT_PUBLIC_INFO_NEW_COLLECTION
let newFolderNameImg = process.env.NEXT_PUBLIC_NEW_FOLDERNAMEIMG

export async function FetchAllProducts() {
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

  const result: AllProductsProps = products

  return result
}
