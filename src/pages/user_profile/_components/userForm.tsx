import { Profile } from '@/store/userSlice'
import { Box, Button, InputAdornment, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useEffect, useReducer, useState } from 'react'
import { addProfile, editProfile } from '@/services/profile.service'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setUserProfile } from '@/store/userSlice'
import { Man, Man4, Woman } from '@mui/icons-material'
import { capitalize } from '@/utils/stringUtilities'
import UseGoalCalculator from '@/hooks/useGoalCalculator'
import { useRouter } from 'next/router'

interface IAction {
  property: 'weight' | 'height' | 'gender' | 'age' | 'init'
  payload: string 
}

function reducer(state: Profile, action: IAction) {
  switch (action.property) {
    case 'weight':
      return { ...state, weight: parseInt(action.payload) }
    case 'height':
      return { ...state, height: parseInt(action.payload) }
    case 'age':
      return { ...state, age: parseInt(action.payload) }
    case 'gender':
      return { ...state, gender: action.payload }
    case 'init':
      return { ...state, ...JSON.parse(action.payload) }
    default:
      throw new Error('Invalid property')
  }
}

export default function UserForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [mode, setMode] = useState('create')
  const user = useAppSelector((state) => state.user.user)
  const [profile, dispatchProfile] = useReducer(reducer, {} as Profile)
  const calorieGoal = UseGoalCalculator()
	const isDisabled = !profile.weight || !profile.height || !profile.age || !profile.gender

  useEffect(() => {
    function getInitialData() {
      setMode('edit')
      const { id, userId, ...rawProfile } = user.profile
      return rawProfile
    }

    if (user.profile) {
      const initialProfile = getInitialData()
      dispatchProfile({ property: 'init', payload: JSON.stringify(initialProfile) })
    }

  }, [user.profile])

  function handleGenderChange(e: React.MouseEvent<HTMLElement>, genderSelection: string) {
    dispatchProfile({ property: 'gender', payload: genderSelection })
  }

  async function handleSubmit() {
    if (mode === 'create') {
      try {
        await addProfile(profile)
      } catch (error) {
        console.error(error)
      }
      router.push('calorie_counter')
    }
    if (mode === 'edit') {
      try {
        await editProfile(profile)
      } catch (error) {
        console.error(error)
      }
    }
    dispatch(setUserProfile(profile))
  }

  return (
    <Box className="flex flex-col">
      <div className="pt-5 pb-2 flex flex-col items-center">
        <Typography className="pb-2" variant="h5" color="secondary">
          Hello {capitalize(user.username)}
        </Typography>
        {calorieGoal ? (
          <Typography variant="subtitle1" color="secondary">
            Your current daily calorie goal is 
            {
              <Typography sx={{ display: 'inline', fontWeight: '700', paddingLeft: '5px'}} color={'primary'}>
                {calorieGoal}
              </Typography>
            }
          </Typography>
        ) : (
          <Typography variant="subtitle1" color="secondary">
            Enter your data to calculate your daily calorie goal.
          </Typography>
        )}
      </div>

      <ToggleButtonGroup color="primary" value={profile.gender} fullWidth={true} exclusive onChange={handleGenderChange} aria-label="Gender" className="py-2">
        <ToggleButton value="female">
          <div className="flex flex-col items-center">
            <Woman />
            Female
          </div>
        </ToggleButton>
        <ToggleButton value="male">
          <div className="flex flex-col items-center">
            <Man />
            Male
          </div>
        </ToggleButton>
        <ToggleButton value="other">
          <div className="flex flex-col items-center">
            <Man4 />
            Other
          </div>
        </ToggleButton>
      </ToggleButtonGroup>
      <TextField
        label="Enter your age"
        type="number"
        value={profile.age}
        variant="filled"
        InputProps={{ endAdornment: <InputAdornment position="end">years</InputAdornment> }}
        onChange={(e) => dispatchProfile({ property: 'age', payload: e.target.value })}
      />
      <TextField
        label="Enter your height"
        type="number"
        value={profile.height}
        variant="filled"
        InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment> }}
        onChange={(e) => dispatchProfile({ property: 'height', payload: e.target.value })}
      />
      <TextField
        label="Enter your weight"
        type="number"
        value={profile.weight}
        variant="filled"
        InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment> }}
        onChange={(e) => dispatchProfile({ property: 'weight', payload: e.target.value })}
      />
      <Button variant="contained" disabled={isDisabled} onClick={handleSubmit}>
        {mode === 'create' ? 'calculate' : 'update'}
      </Button>
    </Box>
  )
}
