import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const db = getFirestore(app)

// const firebaseConfig_Dev = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY_DEV,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN_DEV,
//   projectId: process.env.REACT_APP_PROJECT_ID_DEV,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_DEV,
//   appId: process.env.REACT_APP_APP_ID_DEV,
// }

// const appDev = initializeApp(firebaseConfig_Dev,"dev")
// export const dbDev = getFirestore(appDev)
