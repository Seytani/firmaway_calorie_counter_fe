import { useState } from 'react'
import {
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import CategoryOptions from './categoryOptions'
import { useAppDispatch } from '@/store/hooks'
import { addEntry as addEntryAction } from '@/store/calorieCounterSlice'
import { addEntry } from '@/services/entries.service'

interface Props {
  open: boolean
  close: () => void
  date: Date
}
const AddEntryDialog: React.FC<Props> = ({ open, close, date }) => {
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [calories, setCalories] = useState(0)
  const isDisabled = !category || !name || !calories
  const dispatch = useAppDispatch()

  function handleCategorySelect(category: string) {
    setCategory(category)
  }

  async function handleAddEntry() {
    const newEntry = await addEntry({
      category: category.toLowerCase(),
      name,
      calories,
      date: date.toISOString(),
    })
    dispatch(addEntryAction(newEntry))
    setName('')
    setCalories(0)
    setCategory('')
    close()
  }

  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle>Add Entry</DialogTitle>
        <DialogContent>
          <CategoryOptions onSelectCategory={handleCategorySelect} />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Entry"
            type="text"
            fullWidth
            variant="filled"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="calories"
            label="Calories"
            type="number"
            fullWidth
            variant="filled"
            InputProps={{
              endAdornment: <InputAdornment position="end">cal</InputAdornment>,
            }}
            onChange={(e) => setCalories(parseInt(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>

          <Button
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={handleAddEntry}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddEntryDialog
