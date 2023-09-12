import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { Auth } from './exportFirebaseConfigs'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import { app } from '@/services/firebase/exportFirebaseConfigs'
import Cookies from 'js-cookie'

interface useDataProps {
  email: string
  uid: string
}

function setUserDataInCookies(user: User | null) {
  if (user) {
    const userData = JSON.stringify({
      uid: user.uid,
      email: user.email,
    })

    document.cookie = `userData=${userData}; path=/`
  } else {
    document.cookie =
      'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
}

export async function LogIn(email: string, senha: string) {
  const userCredential = await signInWithEmailAndPassword(Auth, email, senha)
  const user = userCredential.user
  setUserDataInCookies(user)
  return user
}

export async function LogOut() {
  await signOut(Auth)
  setUserDataInCookies(null)
}

export async function onAuthStateChange(
  callback: (_user: User | null) => void,
) {
  return onAuthStateChanged(Auth, (user) => {
    setUserDataInCookies(user)
    callback(user)
  })
}

export default function checkIsUserAuthenticated() {
  const userCookie = Cookies.get('userData')
  let userData: useDataProps

  if (!userCookie) {
    return false
  }

  userData = { ...JSON.parse(userCookie) }

  async function userIsAuthorized() {
    const infoDatabase = getFirestore(app)
    const docCollection = collection(infoDatabase, 'userPermission')
    const docReference = doc(docCollection, `${userData.uid}`)
    const docSnap = await getDoc(docReference)

    if (docSnap.exists()) {
      return Object.values(docSnap.data())
    } else {
      return false
    }
  }

  return userIsAuthorized()
}
