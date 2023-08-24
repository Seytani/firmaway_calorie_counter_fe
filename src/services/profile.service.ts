import { Profile } from '@/store/userSlice'
import api from './api'

export async function addProfile(payload: Profile) {
  let profile
  try {
    profile = await api.post('profile', payload)
  } catch (error: any) {
    throw new Error('Error creating profile')
  }
  return profile
}

export async function editProfile(payload: Profile) {
  let profile
  try {
    profile = await api.put('profile/edit', payload)
  } catch (error: any) {
    throw new Error('Error updating profile')
  }
  return profile
}


