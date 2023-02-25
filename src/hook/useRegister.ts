import {addDoc, collection} from 'firebase/firestore'
import {useCallback} from 'react'

import {db} from '@/lib/firebase/init'
import type {UserInfo} from '@/type/UserInfo'

export const useRegister = () => {
  const registerUser = useCallback(async (info: UserInfo) => {
    await addDoc(collection(db, `users/`), {
      email: info.email,
      walletAddress: info.walletAddress,
    }).catch((error) => {
      throw new Error(error)
    })
  }, [])

  return {registerUser}
}
