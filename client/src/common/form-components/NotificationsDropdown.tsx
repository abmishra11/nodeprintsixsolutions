import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Badge,
  ListItemIcon,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CircleIcon from "@mui/icons-material/Circle";

const NotificationsDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={3} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Typography variant="h6" sx={{ px: 2, py: 1 }}>Notifications</Typography>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CircleIcon fontSize="small" color="primary" />
          </ListItemIcon>
          New Report is Available!
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CircleIcon fontSize="small" color="success" />
          </ListItemIcon>
          $290.29 has been deposited
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationsDropdown;
