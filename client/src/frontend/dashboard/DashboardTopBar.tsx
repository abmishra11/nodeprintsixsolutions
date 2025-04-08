import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "../../common/form-components/SearchBar";
import NotificationsDropdown from "../../common/form-components/NotificationsDropdown";
import MessagesDropdown from "../../common/form-components/MessagesDropdown";
import UserMenu from "../../common/form-components/UserMenu";

const DashboardTopBar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#263238", boxShadow: 1, marginBottom: 2 }}>
      <Toolbar>
        {/* Sidebar Toggle */}
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        {/* Centered Search Bar */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <SearchBar />
        </Box>

        {/* Notification Dropdown */}
        <NotificationsDropdown />

        {/* Messages Dropdown */}
        <MessagesDropdown />

        {/* User Menu */}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default DashboardTopBar;
