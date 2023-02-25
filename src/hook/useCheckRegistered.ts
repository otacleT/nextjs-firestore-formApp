import {collection, getDocs, query, where} from 'firebase/firestore'
import {useCallback} from 'react'

import {db} from '@/lib/firebase/init'
import type {UserInfo} from '@/type/UserInfo'

export const useCheckRegistered = () => {
  const checkRegistered = useCallback(async ({email, walletAddress}: UserInfo) => {
    // usersコレクションへのreferenceを作成
    const usersRef = collection(db, 'users')

    // usersコレクションに対するクエリを作成
    const qEmail = query(usersRef, where('email', '==', email))
    const qWalletAddress = query(usersRef, where('walletAddress', '==', walletAddress))

    // クエリを実行し、結果を取得
    const isEmail = await getDocs(qEmail)
    const isWalletAddress = await getDocs(qWalletAddress)

    // isEmail, isWalletAddressが空であるかどうかで、登録済みかどうかを判定
    return {email: !!isEmail.docs.length, walletAddress: !!isWalletAddress.docs.length}
  }, [])

  return {checkRegistered}
}
