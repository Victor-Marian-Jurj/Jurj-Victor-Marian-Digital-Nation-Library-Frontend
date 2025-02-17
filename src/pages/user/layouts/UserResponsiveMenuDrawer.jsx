import React, { useState } from "react";
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
import AdminLogin from "../../book/AdminLogin";
import Button from "@mui/material/Button"; // Import Material UI Button
import { styled } from "@mui/system";

// Styled Box for the login button section
const LoginBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "transparent", // Remove background color
  borderRadius: "8px",
  boxShadow: "none", // Remove shadow for the box
  width: "90%",
});

const ResponsiveMenuDrawer = () => {
  const menuItems = [
    {
      text: "Cărți disponibile",
      icon: AutoStoriesIcon,
      path: "/biblioteca/books",
    },
  ];

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleAdminLoginClick = () => {
    setShowAdminLogin(true); // Show the admin login form
  };

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

      {/* Login Box with Material UI Button */}
      <LoginBox>
        {!showAdminLogin ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAdminLoginClick}
            sx={{
              width: "150px", // Set button width
              borderRadius: "8px", // Rounded corners
              boxShadow: "none", // Remove shadow for button
              backgroundColor: "#1C7343", // Set the desired background color
              color: "white", // Set the text color to white
              border: "1px solid #1C7343", // Add a border to match the background color
              "&:hover": {
                backgroundColor: "#155e36", // Darker green on hover
                borderColor: "#155e36", // Darker border color on hover
              },
            }}
          >
            Admin Login
          </Button>
        ) : (
          <AdminLogin />
        )}
      </LoginBox>

      {/* <Divider /> */}
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
