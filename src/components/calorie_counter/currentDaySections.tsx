import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { Box, Card } from '@mui/material'
import CurrentDaySectionItem from './currentDaySectionItem'
import { Entry } from '@/store/calorieCounterSlice'

interface Props {
  logs: Entry[]
}

const EmptyCategories: string[] = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Exercise',
]

const CurrentDaySections: React.FC<Props> = ({logs}) => {
  const [categories, setCategories] = useState(EmptyCategories)

  function renderCategory(category: string) {
    const sectionEntries = logs.filter((log) => {
      return log.category === category.toLowerCase()
    })
    const totalCalories = sectionEntries.reduce((acc: any, curr) => {
      return acc + curr.calories
    }, 0)

    return (
      <Card key={category} className="my-2">
        <Box className="p-3">
          <Box className="flex justify-between">
            <Typography
              sx={{ fontSize: 18, fontWeight: 900 }}
              color={'primary'}
            >
              {category}
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 900, color:'black' }}>
              {totalCalories}
            </Typography>
          </Box>
        </Box>
          {sectionEntries.map((log, index) => 
            <CurrentDaySectionItem key={index} entry={log} />
          )}
      </Card>
    )
  }
  useEffect(() => {}, [])

  return <Box>{categories.map((category) => renderCategory(category))}</Box>
}

export default CurrentDaySections
