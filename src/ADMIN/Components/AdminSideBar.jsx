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
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import AdjustIcon from '@mui/icons-material/Adjust'

import adminlogo from '../AdminAssets/logo.png'
import MenuItem from './MenuItem'

const MENU_ITEMS = [
  {
    label: 'Dashboard',
    icon: DashboardIcon,
    path: '/admin/admindashboard'
  },
  {
    label: 'Alumini',
    icon: PeopleIcon,
    nested: [
      { label: 'Add Alumini', path: '/admin/addalumin' },
      { label: 'View Alumini', path: '/admin/viewalumini' }
    ]
  },
  {
    label: 'Upload',
    icon: PictureAsPdfTwoToneIcon,
    path: '/admin/uploadpdf'
  },
  {
    label: 'Faculity',
    icon: InventoryIcon,
    nested: [
      { label: 'Add Faculty', path: '/admin/addfaculity' },
      { label: 'View Faculity', path: '/admin/viewfaculity' }
    ]
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    path: '/admin/settings'
  }
]

const AdminSideBar = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [activeMenu, setActiveMenu] = useState('Dashboard')

  const handleMenuClick = (item) => {
    // MENU WITHOUT NESTED → NAVIGATE
    if (!item.nested) {
      setActiveMenu(item.label)
      navigate(item.path)
      setOpenMenu(null)
      return
    }

    //  FIX: IF SIDEBAR CLOSED → OPEN IT FIRST
    if (!open) {
      setOpen(true)
      setOpenMenu(item.label)
      return
    }

    //  TOGGLE SUBMENU
    setOpenMenu(prev =>
      prev === item.label ? null : item.label
    )
  }

  const handleSubMenuClick = (sub) => {
    setActiveMenu(sub.label)
    navigate(sub.path)
  }

  const hoverStyle = {
    '&:hover': {
      bgcolor: '#374151'
    }
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
      {/* Toggle */}
      <Box
        onClick={() => {
          setOpen(!open)
          if (open) setOpenMenu(null)
        }}
        sx={{
          pl: open ? 1 : 0,
          position: 'relative',
          mb: 1,
          cursor: 'pointer'
        }}
      >
        {!open && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={adminlogo} alt="admin" width={80} height={50} />
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
            <Typography level="h4" sx={{ color: 'white', fontFamily: 'cursive' }}>
              Admin Dashboard
            </Typography>
            <Typography level="body-sm" sx={{ color: 'white', fontFamily: 'cursive' }}>
              FlexiBoard
            </Typography>
          </>
        )}
      </Box>

      <Divider />

      {/* Menu */}
      <List sx={{ flexGrow: 1 }}>
        {MENU_ITEMS.map(item => (
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
                        ...hoverStyle,
                        bgcolor:
                          activeMenu === sub.label ? '#1f2937' : 'transparent'
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

      <MenuItem
        icon={LogoutIcon}
        label="Logout"
        open={open}
        onClick={() => navigate('/logout')}
      />
    </Box>
  )
}

export default memo(AdminSideBar)