import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import UserAvatar from "../layouts/UserAvatar";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link } from "react-router-dom";

const ResponsiveMenuDrawer = () => {
  const menuItems = [
    {
      text: "Carti disponibile",
      icon: AutoStoriesIcon,
      path: "/biblioteca/books",
    },
  ];

  const accountMenuItems = [
    // { text: "My account", icon: AccountBoxIcon, to: "/account" },
  ];

  return (
    <div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <UserAvatar />
          </ListItemAvatar>
          <ListItemText primary="User" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {menuItems.map(({ text, icon: ItemIcon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <Link to={path}>
                <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ padding: 0 }}>
        {accountMenuItems.map(({ text, icon: ItemIcon, to }) => (
          <ListItem key={text} disablePadding sx={{ marginBottom: 0 }}>
            <ListItemButton>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <Link to={to} style={{ textDecoration: "none" }}>
                <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <Box sx={{ mt: "60px" }}>
        <img
          src="/images/logo.jpg"
          alt="Logo"
          style={{ width: "100%", maxWidth: "300px", height: "auto" }}
        />
      </Box>
    </div>
  );
};

export default ResponsiveMenuDrawer;
