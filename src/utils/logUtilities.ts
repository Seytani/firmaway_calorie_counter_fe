import { Entry } from '@/store/calorieCounterSlice'

export function filterByDay(logs: Entry[], date: Date) {
  if(!logs || !logs.length) {
    return []
  }
  return logs.filter((log) => {
    const logDate = new Date(log.date)
    return (
      logDate.toLocaleDateString('en-US') === date.toLocaleDateString('en-US')
    )
  })
}
