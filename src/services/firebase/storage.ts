import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { app } from '@/services/firebase/exportFirebaseConfigs'
import { updatesProductDataInTheFirestore } from './firestore'
import checkIsUserAuthenticated from './auth'

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

export async function getImages(infoProducts: AllProductsProps) {
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

        const userAuth = checkIsUserAuthenticated()

        if (userAuth) {
          updatesProductDataInTheFirestore(updatedProduct)
        }

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
