import { useAppSelector } from '@/store/hooks'
import { useState, useEffect } from 'react'

export default function UseGoalCalculator() {
  const [calorieGoal, setCalorieGoal] = useState<number>(0)
  const userProfile = useAppSelector((state) => state.user.user.profile)

  useEffect(() => {
    if (!userProfile) {
      return
    }

    const { weight, height, age, gender } = userProfile

    let bmr = 0

    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else if (gender === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age
    }

    const calculatedCalorieGoal = Math.floor(bmr)
    setCalorieGoal(calculatedCalorieGoal)
  }, [userProfile])
  

  return calorieGoal
}
