import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { app } from '@/services/exportFirebase';
import Cookies from 'js-cookie';

interface useDataProps {
  email: string;
  uid: string;
}

export default function checkIsUserAuthenticated() {
  const userCookie = Cookies.get('userData');
  let userData: useDataProps;

  if (!userCookie) {
    return false;
  }

  userData = { ...JSON.parse(userCookie) };

  async function userIsAuthorized() {
    const infoDatabase = getFirestore(app);
    const docCollection = collection(infoDatabase, 'userPermission');
    const docReference = doc(docCollection, `${userData.uid}`);
    const docSnap = await getDoc(docReference);

    if (docSnap.exists()) {
      return Object.values(docSnap.data());
    } else {
      return false;
    }
  }

  return userIsAuthorized();
}
