import Typography from '@mui/material/Typography'
import {
  Box,
  Divider,
} from '@mui/material'
import { Entry } from '@/store/calorieCounterSlice'
import SectionEntryMenuButton from './sectionEntryMenuButton'

interface Props {
  entry: Entry
}

const CurrentDaySectionItem: React.FC<Props> = (props: Props) => {
  const { entry } = props

  return (
    <Box className="pl-3">
      <Box className="flex justify-between items-center">
        <Typography>{entry.name}</Typography>
        <Box className="flex items-center">
          <Typography>{entry.calories}</Typography>
          <SectionEntryMenuButton entry={entry}/>
        </Box>
      </Box>
      <Divider />
    </Box>
  )
}

export default CurrentDaySectionItem
