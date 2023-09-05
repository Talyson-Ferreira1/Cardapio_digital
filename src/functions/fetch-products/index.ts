import {
  getFirestore,
  collection,
  doc,
  getDoc,
  DocumentSnapshot,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { app } from '@/services/exportFirebase';

/* import { SaveDataInLocalStorage } from '../dataInStorage';
 */
interface imagesProps {
  [id: string]: string;
}

interface ProductProps {
  [product: string]: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    id: string;
    available: boolean;
    stars: number;
  };
}

let Info_Collection = process.env.NEXT_PUBLIC_INFO_COLLECTION;
let Info_DocCollection = process.env.NEXT_PUBLIC_INFO_DOCCOLLECTION;
let folderNameImg = process.env.NEXT_PUBLIC_FOLDERNAMEIMG;

export async function FetchProductsinDB(): Promise<ProductProps> {
  const getAllproducts = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        const infoDatabase = getFirestore(app);
        const docCollection = collection(infoDatabase, `${Info_Collection}`);
        const docReference = doc(docCollection, `${Info_DocCollection}`);

        getDoc(docReference)
          .then((docSnap: DocumentSnapshot<any>) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              resolve(data);
            } else {
              reject('Documento não encontrado!');
            }
          })
          .catch((error) => {
            reject(`Erro ao buscar dados: ${error}`);
          });
      } catch (error) {
        reject(`Erro ao buscar dados: ${error}`);
      }
    });
  };

  const getImagesOfProducts = async ({ infoProducts }: ProductProps) => {
    const storage = getStorage(app);

    let imagesPromises: imagesProps = {};

    try {
      for (const product in infoProducts) {
        const imageRef = ref(storage, `${folderNameImg}/${product}/imagem.jpg`);
        const imageUrl = await getDownloadURL(imageRef);
        imagesPromises = {
          ...imagesPromises,
          [product]: imageUrl,
        };
      }

      return imagesPromises;
    } catch (error) {
      console.log(`Erro ao buscar imagens: ${error}`);
    }

    return imagesPromises;
  };

  const joinInfoProduct = (info: ProductProps, img: imagesProps) => {
    let newProductList = {};

    for (let idProduct in info) {
      newProductList = {
        ...newProductList,
        [idProduct]: {
          ...info[idProduct],
          image: img[idProduct],
        },
      };
    }

    return newProductList;
  };

  const allProducts = await getAllproducts();

  const allImagesOfProducts: imagesProps = await getImagesOfProducts({
    infoProducts: allProducts,
  });

  const products = joinInfoProduct(allProducts, allImagesOfProducts);

  const result: ProductProps = products;

  return result;
}
