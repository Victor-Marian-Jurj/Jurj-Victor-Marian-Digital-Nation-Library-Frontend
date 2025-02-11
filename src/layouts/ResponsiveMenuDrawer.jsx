import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AvatarLibrary from "../components/AvatarLibrary";
import AddIcon from "@mui/icons-material/Add";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link } from "react-router-dom";

const ResponsiveMenuDrawer = () => {
  const menuItems = [
    {
      text: "Carti disponibile",
      icon: AutoStoriesIcon,
      path: "/biblioteca.admin/books",
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
            <AvatarLibrary />
          </ListItemAvatar>
          <ListItemText primary="Admin" />
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
      <List>
        {accountMenuItems.map(({ text, icon: ItemIcon, to }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <Link to={to}>
                <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "16px",
        }}
      >
        <Link to="/biblioteca.admin/books/create">
          <Button variant="contained" startIcon={<AddIcon />}>
            Adaugare carte noua
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default ResponsiveMenuDrawer;
