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
import { useNavigate } from "react-router-dom";

const ResponsiveMenuDrawer = () => {
  const menuItems = [
    {
      text: "Cărți disponibile",
      icon: AutoStoriesIcon,
      path: "/biblioteca.admin/books",
    },
  ];

  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if admin is logged in

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Remove admin session
    navigate("/biblioteca/books"); // Redirect to User page
    window.location.reload(); // Reload to apply layout change
  };

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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Link to="/biblioteca.admin/books/create">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#1C7343",
              "&:hover": {
                backgroundColor: "#155e36", // Darker green on hover
                borderColor: "#155e36", // Darker border color on hover
              },
            }}
          >
            Adaugă carte
          </Button>
        </Link>
      </Box>
      {/* Show Logout Button Only for Admins */}
      {isAdmin && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      )}
      <Box sx={{ mt: "60px", textAlign: "center" }}>
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
