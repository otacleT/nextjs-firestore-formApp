import {zodResolver} from '@hookform/resolvers/zod'
import type {NextPage} from 'next'
import {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {useCheckRegistered} from '@/hook/useCheckRegistered'
import {useRegister} from '@/hook/useRegister'
import type {UserInfo} from '@/type/UserInfo'

const regex = /^0x/

const schema = z.object({
  email: z
    .string()
    .min(1, {message: 'メールアドレスを入力してください。'})
    .email('メールアドレスが正しくありません。'),
  walletAddress: z
    .string()
    .min(1, {message: 'ウォレットアドレスを入力してください。'})
    .regex(regex, {
      message: 'ウォレットアドレスは0xから始まる必要があります。',
    })
    .length(42, {
      message: 'ウォレットアドレスは42文字である必要があります。',
    }),
})

const Home: NextPage = () => {
  const {registerUser} = useRegister()
  const {checkRegistered} = useCheckRegistered()
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm<UserInfo>({
    resolver: zodResolver(schema),
  })

  const onSubmit = useCallback(
    async (data: UserInfo) => {
      // 入力された値が既に登録済みかどうかを判定する
      const isRegistered = await checkRegistered(data).catch(() => {
        alert('問題が発生しました。時間をおいて再度お試しください。')
      })

      if (isRegistered?.email && isRegistered?.walletAddress) {
        // 両方登録済みの場合
        alert('このメールアドレスとウォレットアドレスは既に登録されています。')
      } else if (isRegistered?.email) {
        // メールアドレスのみ登録済みの場合
        alert('このメールアドレスは既に登録されています。')
      } else if (isRegistered?.walletAddress) {
        // ウォレットアドレスのみ登録済みの場合
        alert('このウォレットアドレスは既に登録されています。')
      } else {
        // どちらも未登録の場合
        await registerUser(data)
          .then(() => {
            console.info('登録完了')
          })
          .catch(() => {
            alert('問題が発生しました。時間をおいて再度お試しください。')
          })
      }
    },
    [registerUser, checkRegistered]
  )
  return (
    <main className='w-full max-w-[540px] h-screen flex items-center justify-center mx-auto px-5'>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <input
          className='w-full block text-sm border border-black p-2'
          placeholder='メールアドレスをご入力ください'
          type='email'
          {...register('email')}
        />
        <p className='text-sm text-red-500 mt-2'>{errors.email?.message}</p>
        <input
          className='w-full block text-sm border border-black p-2 mt-5'
          placeholder='ウォレットアドレス(0x..)をご入力ください'
          type='text'
          {...register('walletAddress')}
        />
        <p className='text-sm text-red-500 mt-2'>{errors.walletAddress?.message}</p>
        <button
          className='w-full h-10 flex items-center justify-center bg-black text-white mt-7'
          type='submit'
        >
          登録する
        </button>
      </form>
    </main>
  )
}

export default Home
