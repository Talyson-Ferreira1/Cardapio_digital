import {
  getFirestore,
  collection,
  doc,
  deleteDoc,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore'
import { getStorage, ref, listAll, deleteObject } from 'firebase/storage'
import { app } from '@/services/exportFirebase'

let Info_New_Collection = process.env.NEXT_PUBLIC_INFO_NEW_COLLECTION
let newFolderNameImg = process.env.NEXT_PUBLIC_NEW_FOLDERNAMEIMG

export async function DeleteProductInDb({ id }: { id: string }) {
  const infoDatabase = getFirestore(app)
  const docCollection = collection(infoDatabase, `${Info_New_Collection}`)

  try {
    await deleteDoc(doc(docCollection, id))
    const storage = getStorage(app)
    const folderRef = ref(storage, `${newFolderNameImg}/${id}`)
    const files = await listAll(folderRef)
    const deleteFilePromises = files.items.map((fileRef) => {
      return deleteObject(fileRef)
    })
    await Promise.all(deleteFilePromises)
    console.log('Documento e pasta associada excluídos com sucesso.')
    return true
  } catch (error) {
    console.error('Erro ao excluir documento e pasta:', error)
    return false
  }
}
