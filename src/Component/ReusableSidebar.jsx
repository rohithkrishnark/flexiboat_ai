import React, { useState, memo } from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Divider
} from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import AdjustIcon from '@mui/icons-material/Adjust'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuItem from '../ADMIN/Components/MenuItem'
// import MenuItem from './MenuItem'

const ReusableSidebar = ({
  menuItems = [],
  title = "Dashboard",
  subTitle = "",
  logo = null,
  logoutPath = "/logout"
}) => {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [activeMenu, setActiveMenu] = useState("")

  const handleMenuClick = (item) => {

    if (!item.nested) {
      setActiveMenu(item.label)
      navigate(item.path)
      setOpenMenu(null)
      return
    }

    if (!open) {
      setOpen(true)
      setOpenMenu(item.label)
      return
    }

    setOpenMenu(prev =>
      prev === item.label ? null : item.label
    )
  }

  const handleSubMenuClick = (sub) => {
    setActiveMenu(sub.label)
    navigate(sub.path)
  }

  return (
    <Box
      sx={{
        width: open ? 260 : 70,
        height: '100vh',
        bgcolor: '#111827',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease'
      }}
    >
      {/* Header */}
      <Box
        onClick={() => {
          setOpen(!open)
          if (open) setOpenMenu(null)
        }}
        sx={{ position: 'relative', mb: 1, cursor: 'pointer' }}
      >
        {!open && logo && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={logo} alt="logo" width={60} height={50} />
          </Box>
        )}

        {open && (
          <>
            <KeyboardDoubleArrowLeftIcon
              sx={{
                position: 'absolute',
                right: 10,
                top: 10,
                color: 'white',
                fontSize: 20
              }}
            />
            <Typography level="h4" sx={{ color: 'white' }}>
              {title}
            </Typography>
            <Typography level="body-sm" sx={{ color: 'white' }}>
              {subTitle}
            </Typography>
          </>
        )}
      </Box>

      <Divider />

      {/* Menu */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map(item => (
          <React.Fragment key={item.label}>
            <MenuItem
              {...item}
              open={open}
              active={activeMenu === item.label}
              onClick={() => handleMenuClick(item)}
              endIcon={
                item.nested && open && (
                  <ExpandMoreIcon
                    sx={{
                      color: 'white',
                      transform:
                        openMenu === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: '0.3s'
                    }}
                  />
                )
              }
            />

            {open && openMenu === item.label && item.nested && (
              <Box sx={{ ml: 3 }}>
                {item.nested.map(sub => (
                  <ListItem key={sub.label}>
                    <ListItemButton
                      onClick={() => handleSubMenuClick(sub)}
                      sx={{
                        bgcolor:
                          activeMenu === sub.label ? '#1f2937' : 'transparent',
                        '&:hover': { bgcolor: '#374151' }
                      }}
                    >
                      <AdjustIcon
                        sx={{
                          fontSize: 14,
                          mr: 1,
                          color: '#9ca3af'
                        }}
                      />
                      <ListItemContent sx={{ color: 'white' }}>
                        {sub.label}
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                ))}
              </Box>
            )}
          </React.Fragment>
        ))}
      </List>

      {/* Logout */}
      <MenuItem
        icon={LogoutIcon}
        label="Logout"
        open={open}
        onClick={() => navigate(logoutPath)}
      />
    </Box>
  )
}

export default memo(ReusableSidebar)