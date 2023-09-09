import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCK87YuoQc8Mq0poV848v0QzCQcWY9Zn7s",
  authDomain: "encounter-builder-6e3eb.firebaseapp.com",
  projectId: "encounter-builder-6e3eb",
  storageBucket: "encounter-builder-6e3eb.appspot.com",
  messagingSenderId: "771808961997",
  appId: "1:771808961997:web:91df491bc18eff5bbe1084"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)