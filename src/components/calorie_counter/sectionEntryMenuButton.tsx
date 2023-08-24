import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IconButton } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useState } from 'react'
import EditEntryDialog from './editEntryDialog'
import { Entry, removeEntry } from '@/store/calorieCounterSlice'
import { useAppDispatch } from '@/store/hooks'
import { deleteEntry  } from '@/services/entries.service'

interface Props {
  entry: Entry
}
const SectionEntryMenuButton: React.FC<Props> = ({ entry }) => {
  const dispatch = useAppDispatch()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  let open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleEditOpen() {
    setIsEditDialogOpen(true)
  }

  function handleEditDialogClose() {
    setIsEditDialogOpen(false)
  }

  async function handleDeleteEntry() {
    if(!entry.id) {
      return
    }
    deleteEntry(entry.id)
    dispatch(removeEntry(entry))
    handleClose()
  }
  return (
    <div>
      <IconButton
        id="menu-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
      >
        <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
        <EditEntryDialog
          open={isEditDialogOpen}
          onClose={handleEditDialogClose}
          entry={entry}
        />
        <MenuItem onClick={handleDeleteEntry}>Delete</MenuItem>
      </Menu>
    </div>
  )
}

export default SectionEntryMenuButton
