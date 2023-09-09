import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { app } from '@/services/exportFirebase'

let Info_New_Collection = process.env.NEXT_PUBLIC_INFO_NEW_COLLECTION

interface props {
  id: string
  value: boolean
}

export async function EditDailyMenuInDb(id: string, value: boolean) {
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
