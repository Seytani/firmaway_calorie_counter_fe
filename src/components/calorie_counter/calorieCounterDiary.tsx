import { useEffect, useState } from 'react'
import { Box, Divider, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import CurrentDaySummary from './currentDaySummary'
import CurrentDaySections from './currentDaySections'
import { useAppSelector } from '@/store/hooks'
import { Entry } from '@/store/calorieCounterSlice'
import { filterByDay } from '@/utils/logUtilities'
import AddEntry from './addEntry'

interface Props {
  data?: string
}

const CalorieCounterDiary: React.FC<Props> = () => {
  const [day, setDay] = useState(new Date())
  const [dailyEntries, setDailyEntries] = useState<Entry[]>([])
  const unfilteredLogs = useAppSelector((state) => state.calorieCounter.logs)
  const navigateDay = (modifier: number) => {
    const newDate = new Date(day)
    newDate.setDate(day.getDate() + modifier)
    setDay(newDate)
  }

  useEffect(() => {
    const currentLogs = filterByDay(unfilteredLogs, day)
    setDailyEntries(currentLogs)
  }, [unfilteredLogs, day])

  return (
    <Box
      sx={{
        width: '100%',
      }}
      className="relative flex flex-col"
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          background: 'background',
          zIndex: 1,
        }}
        className="flex flex-col"
      >
        <Box className="flex items-center justify-between p-2">
          <IconButton aria-label="previous-day" onClick={() => navigateDay(-1)}>
            <ChevronLeft />
          </IconButton>
          {day.toDateString()}
          <IconButton aria-label="previous-day" onClick={() => navigateDay(+1)}>
            <ChevronRight />
          </IconButton>
        </Box>
        <Divider />
        <Box>
          <CurrentDaySummary entries={dailyEntries} />
        </Box>
        <Divider />
      </Box>
      <CurrentDaySections logs={dailyEntries} />
      <AddEntry date={day} />
    </Box>
  )
}

export default CalorieCounterDiary
