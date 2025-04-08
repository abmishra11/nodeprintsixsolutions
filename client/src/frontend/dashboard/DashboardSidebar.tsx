import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import WorkIcon from "@mui/icons-material/Work";
import ImageIcon from "@mui/icons-material/Image";
import logo from "../../assets/img/logo/logo.png";

const DashboardSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Categories", icon: <CategoryIcon />, path: "/dashboard/categories" },
    { text: "Products", icon: <ArticleIcon />, path: "/dashboard/products" },
    { text: "Users", icon: <WorkIcon />, path: "/dashboard/jobs" },
    { text: "Gallery Images", icon: <ImageIcon />, path: "/dashboard/galleries" },
  ];

  return (
    <>
      {/* Sidebar Toggle Button */}
      <IconButton onClick={toggleDrawer} sx={{ position: "fixed", top: 20, left: 20, color: "#263238", zIndex: 1300 }}>
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer} sx={{ "& .MuiDrawer-paper": { width: 250, bgcolor: "#263238", color: "white" } }}>
        <Box sx={{ textAlign: "center", my: 2 }}>
          <img src={logo} alt="Logo" style={{ width: 50 }} />
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <NavLink to={item.path} style={{ textDecoration: "none", width: "100%" }}>
                {({ isActive }) => (
                  <ListItemButton selected={isActive} sx={{ "&.Mui-selected": { bgcolor: "#263238", color: "white" } }}>
                    <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default DashboardSidebar;
