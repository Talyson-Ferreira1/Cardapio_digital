import { Auth } from './exportFirebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

function setUserDataInCookies(user: User | null) {
  if (user) {
    const userData = JSON.stringify({
      uid: user.uid,
      email: user.email,
    });

    document.cookie = `userData=${userData}; path=/`;
  } else {
    document.cookie =
      'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}

export async function LogIn(email: string, senha: string) {
  const userCredential = await signInWithEmailAndPassword(Auth, email, senha);
  const user = userCredential.user;
  setUserDataInCookies(user);
  return user;
}

export async function LogOut() {
  await signOut(Auth);
  setUserDataInCookies(null);
}

export async function onAuthStateChange(
  callback: (_user: User | null) => void,
) {
  return onAuthStateChanged(Auth, (user) => {
    setUserDataInCookies(user);
    callback(user);
  });
}
