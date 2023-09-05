const apiKey = process.env.NEXT_PUBLIC_APIKEY;
const authDomain = process.env.NEXT_PUBLIC_AUTHDOMAIN;
const projectId = process.env.NEXT_PUBLIC_PROJECTID;
const storageBucket = process.env.NEXT_PUBLIC_STORAGEBUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGINGSENDERID;
const appId = process.env.NEXT_PUBLIC_APPID;
const measurementId = process.env.NEXT_PUBLIC_MEASUREMENTID;

export const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};
