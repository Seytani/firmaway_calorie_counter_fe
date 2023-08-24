import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { setUser } from '@/store/userSlice'
import auth from '../services/auth'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    async function saveUser() {
      let user
      try {
        user = await auth.getUser()
      } catch (err) {
        throw new Error('Error fetching user')
      }
      dispatch(setUser(user))
    }

    const token = localStorage.getItem('token')
    if (token === null) {
      router.push('/')
      return
    }

    saveUser()
  }, [dispatch, router])

  return <>{children}</>
}
