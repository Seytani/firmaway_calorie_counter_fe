import Link from 'next/link'
import { useState } from 'react'
import {
  Box,
  IconButton,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemButton,
  Typography,
  AppBar,
  Toolbar,
  useScrollTrigger,
  SwipeableDrawer,
  Slide,
} from '@mui/material'
import {
  Menu,
  AccountCircle,
  LightMode,
  DarkMode,
  Newspaper,
  Logout,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import auth from '@/services/auth'
import React from 'react'

interface HideOnScrollProps {
  children: React.ReactElement
}
function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default function MobileNavbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setOpen(!open)
  }

  const handleLogout = () => {
    auth.logout()
    router.push('/')
  }

  const drawerMain = (
    <>
      <Divider variant="middle" />
      <List sx={{ flexGrow: '1', display: "flex", flexDirection: "column",justifyContent: "space-between" }}>
        {[
          {
            name: 'Calorie Counter',
            icon: <Newspaper />,
            url: 'calorie_counter',
          },
          {
						name: 'User Profile',
						icon: <AccountCircle />,
						url: 'user_profile',
					},
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                <Link href={item.url}>{item.name}</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )

  const drawerFooter = (
    <List sx={{ flexGrow: '0' }}>
      {[{ name: 'Logout', icon: <Logout />, onclick: handleLogout }].map(
        (item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                sx={{ opacity: open ? 1 : 0 }}
                onClick={item.onclick}
              >
                {item.name}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )
      )}
    </List>
  )

  return (
    <Box>
      <HideOnScroll>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{ flexGrow: 1 }}
          >
            Foodie Homebuddy
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {drawerMain}
        <Divider />
        {drawerFooter}
      </SwipeableDrawer>
    </Box>
  )
}
