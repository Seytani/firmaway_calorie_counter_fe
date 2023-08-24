import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Entry } from '@/store/calorieCounterSlice'
import UseGoalCalculator from '@/hooks/useGoalCalculator'

interface Props {
  entries: Entry[]
}
interface Summary {
  exercise: number,
  breakfast: number,
  lunch: number,
  dinner: number,
  snacks: number,
}

const emptySummary =  {
  exercise: 0,
  breakfast: 0,
  lunch: 0,
  dinner: 0,
  snacks: 0,
}

function processEntries(entries: Entry[]) {
  return entries.reduce((acc: any, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = 0
    }
    acc[curr.category] += curr.calories
    return acc
  }, Object.assign({ }, emptySummary))
}

const CurrentDaySummary: React.FC<Props> = ({ entries }) => {
  const calGoal = UseGoalCalculator()
  const [summary, setSummary] = useState<Summary>(emptySummary)
  const [consumedTotal, setConsumedTotal] = useState(0)

  useEffect(() => {
    const newSummary = processEntries(entries)
    setSummary(newSummary)
    setConsumedTotal(newSummary.breakfast + newSummary.lunch + newSummary.dinner + newSummary.snacks)
  }, [entries, consumedTotal])

  return (
    <Box className="flex justify-center items-center py-3">
      <Box className="flex-col items-center p-2">
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          {calGoal}
        </Typography>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: 'black' }}>
          Goal
        </Typography>
      </Box>

      <Box className="p-2">
        <Typography sx={{ fontSize: 30, fontWeight: 700, color: 'black' }}>
          -
        </Typography>
      </Box>

      <Box className="flex flex-col items-center p-2">
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          {consumedTotal}
        </Typography>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: 'black' }}>
          Food
        </Typography>
      </Box>

      <Box className="p-2">
        <Typography sx={{ fontSize: 25, fontWeight: 700, color: 'black' }}>
          +
        </Typography>
      </Box>

      <Box className="flex flex-col items-center p-2">
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          {summary.exercise}
        </Typography>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: 'black' }}>
          Exercise
        </Typography>
      </Box>

      <Box className="p-2">
        <Typography sx={{ fontSize: 25, fontWeight: 700, color: 'black' }}>
          =
        </Typography>
      </Box>
      {calGoal >= consumedTotal - summary.exercise ? (
        <Box className="flex flex-col items-center p-2">
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            {calGoal - consumedTotal + summary.exercise }
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: 'black' }}>
            Left
          </Typography>
        </Box>
      ) : (
        <Box className="flex flex-col items-center p-2">
          <Typography sx={{ fontSize: 18, fontWeight: 700 }} color={'error'}>
            {Math.abs(calGoal - consumedTotal + summary.exercise)}
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: 'black' }}>
            Over
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default CurrentDaySummary
