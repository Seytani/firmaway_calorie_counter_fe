import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useAppDispatch } from '@/store/hooks'
import AddEntryDialog from './addEntryDialog'

interface Props {
  date: Date
}

const AddEntry: React.FC<Props> = ({ date }) => {
  const [openAddEntryDialog, setOpenAddEntryDialog] = useState(false)
  const dispatch = useAppDispatch()

  function handleOpenDialog() {
    setOpenAddEntryDialog(true)
  }

  function handleCloseDialog() {
    setOpenAddEntryDialog(false)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <IconButton
        className="text-6xl self-end pr-5 pb-5"
        aria-label="addEntry"
        color="primary"
        onClick={handleOpenDialog}
      >
        <AddCircle fontSize="inherit"/>
      </IconButton>
      <AddEntryDialog open={openAddEntryDialog} close={handleCloseDialog} date={date}/>
    </Box>
  )
}

export default AddEntry
