import React, { useState } from "react";
import "./Navbar.css";
import SegmentIcon from "@mui/icons-material/Segment";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Person2Icon from '@mui/icons-material/Person2';
import { Divider, Tooltip } from "@mui/joy";
import { getAuthUser } from "../constant/Constant";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = getAuthUser();


  const handleIconClick = (event) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate('/login')
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    handleMenuClose();
  };

  const handleResetPassword = () => {
    handleMenuClose();
    navigate("/reset-password"); // adjust route
  };


  const handleDrawerNavigate = (id) => {
    setOpen(false);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


const handleNavScroll = (e, id) => {
  e.preventDefault(); // stop default anchor jump
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <SegmentIcon
            onClick={() => setOpen(true)}
            sx={{
              cursor: "pointer",
              mr: 1,
              color: "white",
              ":hover": { transform: "scale(1.3)", color: "violet" },
            }}
          />
          FlexiBot
        </div>

        <ul className="nav-links">
          <li> <a href="#home" onClick={(e) => handleNavScroll(e, "home")}>Home</a></li>
          <li> <a href="#about" onClick={(e) => handleNavScroll(e, "about")}>About</a></li>
          <li><a href="#chat" onClick={(e) => handleNavScroll(e, "chat")}>Chat</a></li>
          <li> <a href="#contactus" onClick={(e) => handleNavScroll(e, "contactus")}>   Contact</a>
          </li>
          <li>
            <IconButton onClick={handleIconClick} sx={{ color: "white" }}>
              {

                user ?

                  <Person2Icon sx={{ fontSize: 20 }} />
                  :
                  <Tooltip variant="outlined" title="Login Here" >
                    <span>
                      <AccountCircleIcon sx={{ fontSize: 20 }} />
                    </span>
                  </Tooltip>
              }
              {user && (
                <span style={{ marginLeft: "8px", color: "white", fontSize: '16px' }}>
                  {user.logged_name}
                </span>
              )}
            </IconButton>

            {/* DROPDOWN MENU */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {
                user && <>
                  <MenuItem onClick={handleResetPassword}>Reset Password</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              }
            </Menu>
          </li>
        </ul>
      </nav>

      {/* DRAWER */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { backgroundColor: "#111", color: "#fff", width: 260 },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid #222",
          }}
        >
          <h3 style={{ margin: 0 }}>FlexiBot</h3>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        </div>

        <List>
          {/* {["Home", "About", "Chat", "Contact"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{ color: "#fff", "&:hover": { backgroundColor: "#1f1f1f" } }}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
          {[
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Chat", id: "chat" },
            { name: "Contact", id: "contactus" },
          ]?.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                sx={{ color: "#fff", "&:hover": { backgroundColor: "#1f1f1f" } }}
                onClick={() => handleDrawerNavigate(item.id)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ backgroundColor: "#222" }} />
      </Drawer>
    </>
  );
};

export default Navbar;
