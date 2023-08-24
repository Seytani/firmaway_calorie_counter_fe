import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'
import { filterByDay } from '@/utils/logUtilities'

interface CalorieCounterState {
  selectedDate: number
  logs: Entry[]
}

interface Entry {
  id?: string
  name: string
  calories: number
  category: string
  date: string
}

const initialState: CalorieCounterState = {
  selectedDate: new Date().getTime(),
  logs: [],
}

const calorieCounterSlice = createSlice({
  name: 'calorieCounter',
  initialState,
  reducers: {
    setLogs: (state, action) => {
      return {
        ...state,
        logs: action.payload,
      }
    },
    addEntry: (state, action) => {
      state.logs.push(action.payload)
    },
    updateEntry: (state, action) => {
      const updatedLogs = state.logs.map((log) => {
        if (log.id !== action.payload.id) {
          return log
        }
        return {
          ...log,
          ...action.payload,
        }
      })
      return {
        ...state,
        logs: updatedLogs,
      }
    },
    removeEntry: (state, action) => {
      const index = state.logs.findIndex((log) => log.id === action.payload.id)
      const logsCopy = state.logs.slice() 
      const updatedLogs = [...logsCopy.slice(0, index), ...logsCopy.slice(index + 1)]
      return {
        ...state,
        logs: updatedLogs
      }
    },
  },
})

export function selectLogsByDate(state: RootState, date: Date) {
  const logs = state.calorieCounter.logs
  return filterByDay(logs, date)
}

type Gender = 'male' | 'female' | 'other'
type UnitSystem = 'imperial' | 'metric'

interface UserInformation {
  age: number
  gender: Gender
  weight: number
  height: number
  unitSystem: UnitSystem
}


export const { setLogs, addEntry, updateEntry, removeEntry } = calorieCounterSlice.actions
export default calorieCounterSlice.reducer
export type { Entry }
