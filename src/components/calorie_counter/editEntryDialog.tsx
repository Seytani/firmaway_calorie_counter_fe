'use client'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Entry, updateEntry } from '@/store/calorieCounterSlice'
import { useAppDispatch } from '@/store/hooks'
import { useState } from 'react'
import { editEntry } from '@/services/entries.service'

interface Props {
  open: boolean
  onClose: () => void
  entry: Entry
}
const EditEntryDialog: React.FC<Props> = ({open, onClose, entry }) => {
  console.log('*******************************',entry)
  const dispatch = useAppDispatch()
  const [updatedEntryName, setUpdatedEntryName] = useState(entry.name)
  const [updatedEntryCalories, setUpdatedEntryCalories] = useState(entry.calories)
  
  async function handleEditEntry() {
    const { id, ...rawEntry } = entry
    if(!id) {
      return
    }
    let updatedEntry = {
      ...rawEntry,
      name: updatedEntryName,
      calories: updatedEntryCalories
    }
    updatedEntry = await editEntry(id, updatedEntry)
    dispatch(updateEntry(updatedEntry))
    onClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter entry modifications
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Entry"
            type="text"
            fullWidth
            variant="filled"
            defaultValue={entry.name}
            onChange={e => setUpdatedEntryName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Calories"
            type="text"
            fullWidth
            variant="filled"
            defaultValue={entry.calories}
            onChange={e => setUpdatedEntryCalories(parseInt(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleEditEntry}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditEntryDialog
