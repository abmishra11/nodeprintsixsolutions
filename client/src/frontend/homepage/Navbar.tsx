import React, { useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Box,
  InputBase,
  CircularProgress,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  HelpOutline,
  ShoppingCart,
  AccountCircle,
} from "@mui/icons-material";
import { Link } from "react-router-dom"; 
import { useSelector } from "react-redux";
import { useCartItems } from "../../hooks/useCartItems";

export default function Navbar() {
  const loading = false;
  const user = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user?.userId;
  console.log("isAuthenticated", isAuthenticated);
  const {
    cartItems,
    isCartLoading,
    cartError,
  } = useCartItems(isAuthenticated);
  console.log("cartItems", cartItems);
  
  const cartCount = cartItems?.length || 0;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Top bar */}
      <Box sx={{ backgroundColor: "secondary.main", height: 32 }} />

      <AppBar position="static" color="primary.main" elevation={1}>
        <Toolbar className="container d-flex justify-content-between">
          {/* Logo */}
          <Box className="d-flex align-items-center">
            <Link to="/">
              <img src="./logo.png" alt="PrintSix logo" height="50" />
            </Link>
          </Box>

          {/* Search */}
          <Box sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1, mx: 2 }}>
            {searchVisible && (
              <InputBase
                placeholder="Search..."
                fullWidth
                sx={{
                  backgroundColor: "#f1f1f1",
                  px: 2,
                  borderRadius: 1,
                }}
              />
            )}
          </Box>

          {/* Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <HelpOutline color="primary" />
            </IconButton>

            <IconButton component={Link} to="/customer/cart">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCart color="primary" />
              </Badge>
            </IconButton>

            {loading ? (
              <CircularProgress size={24} />
            ) : isAuthenticated ? (
              <>
                <IconButton onClick={handleMenuClick}>
                  <Avatar alt={user?.name} src={user?.avatarUrl} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="primary"
                variant="outlined"
                startIcon={<AccountCircle />}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )}

            <IconButton
              sx={{ display: { sm: "none" } }}
              onClick={() => setSearchVisible((prev) => !prev)}
            >
              <SearchIcon color="primary" />
            </IconButton>

            <IconButton
              edge="end"
              sx={{ display: { md: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Search */}
        {searchVisible && (
          <Box className="container d-md-none py-2">
            <InputBase
              placeholder="Search..."
              fullWidth
              sx={{
                backgroundColor: "#f1f1f1",
                px: 2,
                py: 1,
                borderRadius: 1,
              }}
            />
          </Box>
        )}
      </AppBar>

      {/* Category Mega Menu */}
      <Box className="text-white py-2" sx={{ backgroundColor: "secondary.main" }}>
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {}}
            className="text-white"
          >
            All Categories
          </Button>
          <div className="d-none d-md-flex gap-3">
            <Button component={Link} to="/" className="text-white">
              Home
            </Button>
            <Button component={Link} to="/shop" className="text-white">
              Shop
            </Button>
            <Button component={Link} to="/about" className="text-white">
              About
            </Button>
            <Button component={Link} to="/contact" className="text-white">
              Contact
            </Button>
          </div>
        </div>
      </Box>

      {/* Categories Mega Menu Hover */}
      {/* You can create a dropdown component with Bootstrap or MUI Popover if needed */}

      {/* Drawer for Mobile Nav */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/shop">
            <ListItemText primary="Shop" />
          </ListItem>
          <ListItem button component={Link} to="/about">
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} to="/contact">
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
