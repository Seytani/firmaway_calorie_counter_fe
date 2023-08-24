import { useState } from 'react'
import {
  Menu,
  MenuItem,
  List,
  ListItem,
  Button,
  Typography,
  Box,
} from '@mui/material'
import { ArrowDropDownRounded } from '@mui/icons-material'

interface Props {
  onSelectCategory: (category: string) => void
}
const options = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Exercise']

const CategoryOptions: React.FC<Props> = ({ onSelectCategory }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const open = Boolean(anchorEl)
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const selectedCategory = options[index]
    setSelectedIndex(index)
    setAnchorEl(null)
    onSelectCategory(selectedCategory)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <List
        component="nav"
        aria-label="category-options"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          id="category-button"
          aria-haspopup="listbox"
          aria-controls="category-menu"
          aria-label="Entry Category"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <Box>
            <Button endIcon={<ArrowDropDownRounded />}>Select Category</Button>
            {selectedIndex !== null ? (
              <Typography>{options[selectedIndex]}</Typography>
            ) : null}
          </Box>
        </ListItem>
      </List>
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'category-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default CategoryOptions
