import {
  getFirestore,
  collection,
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

let updateProductInDBTeste = (values: any) => {
  console.count()
  console.log(values)
}

let Info_New_Collection = process.env.NEXT_PUBLIC_INFO_NEW_COLLECTION

export async function FetchAllProducts() {
  const getAllProducts = async (): Promise<AllProductsProps> => {
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
  }

  const getProductsWithImages = async (infoProducts: AllProductsProps) => {
    const storage = getStorage(app)
    const updatedProducts: AllProductsProps = {}

    for (const productId in infoProducts) {
      const product = infoProducts[productId]

      if (!product.image) {
        const imageRef = ref(storage, `Image_Products/${product.id}/imagem.jpg`)

        try {
          const imageUrl = await getDownloadURL(imageRef)

          // Atualize o produto com a URL da imagem
          const updatedProduct: ProductProps = { ...product, image: imageUrl }

          // Chame a função para atualizar o produto no banco de dados (não implementada aqui)
          updateProductInDBTeste(updatedProduct)

          updatedProducts[productId] = updatedProduct
        } catch (error) {
          console.error(
            `Erro ao buscar imagem para o produto ${product.id}: ${error}`,
          )
        }
      } else {
        // Se o produto já tiver uma imagem, não faz nada, apenas copia para os produtos atualizados
        updatedProducts[productId] = product
      }
    }

    return updatedProducts
  }

  try {
    const allProducts = await getAllProducts()

    const productsWithImages = await getProductsWithImages(allProducts)

    console.log('Finalizou')

    return productsWithImages
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    throw error
  }
}
