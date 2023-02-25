import {getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

/**
 * @note 管理画面から取得したFirebaseのAPIオブジェクトを`.env.local`に記述しています
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
}

/**
 * @description Firebase instanceの初期化
 */
if (!getApps()?.length) {
  initializeApp(firebaseConfig)
}

/**
 * @description Firestoreを返す
 */
export const db = getFirestore()
