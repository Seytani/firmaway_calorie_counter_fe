'use client'

import { useEffect } from 'react'
import ProtectedLayout from '../_protectedLayout'
import CalorieCounterDiary from '@/components/calorie_counter/calorieCounterDiary'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setLogs } from '@/store/calorieCounterSlice'
import { getEntries } from '@/services/entries.service'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

function CalorieCounter() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const entries = useAppSelector((state) => state.calorieCounter.logs)
  const router = useRouter()
 
  useEffect(() => {
    if(user.id && !user.profile) {
      router.push('/user_profile')
    }
    const saveEntries = async () => {
      const entries = await getEntries()
      console.log('(((((((((((((((((()))))))))))))))))))))))))))))',entries)
      dispatch(setLogs(entries))
    }
    saveEntries()
  }, [dispatch, router, user])

  return (
    <ProtectedLayout>
      {user.profile && entries? <CalorieCounterDiary />: null}
    </ProtectedLayout>
  )
}


const NoSSRCalorieCounter = dynamic(() => Promise.resolve(CalorieCounter), {
  ssr: false,
})


export default NoSSRCalorieCounter