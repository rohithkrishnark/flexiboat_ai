import React, { useState } from 'react';
import './Navbar.css';
import SegmentIcon from '@mui/icons-material/Segment';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <SegmentIcon
            onClick={() => setOpen(true)}
            sx={{
              cursor: 'pointer',
              mr: 1,
              color: 'white',
              ":hover": {
                transform: 'scale(1.3)',
                color: 'violet'
              }
            }}
          />
          FlexiBot
        </div>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/chat">Chat</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      {/* DRAWER */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#111',
            color: '#fff',
            width: 260
          }
        }}
      >
        {/* DRAWER HEADER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #222'
          }}
        >
          <h3 style={{ margin: 0 }}>FlexiBot</h3>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon sx={{ color: '#fff' }} />
          </IconButton>
        </div>

        {/* DRAWER MENU */}
        <List>
          {['Home', 'About', 'Chat', 'Contact'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#1f1f1f'
                  }
                }}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ backgroundColor: '#222' }} />
      </Drawer>
    </>
  );
};

export default Navbar;
