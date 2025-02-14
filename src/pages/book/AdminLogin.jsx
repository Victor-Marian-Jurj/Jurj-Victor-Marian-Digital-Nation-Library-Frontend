import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

// Styled Box for the login form container
const LoginBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px", // Further reduce padding
  backgroundColor: "transparent",
  border: "none",
  boxShadow: "none",
  width: "100%",
  maxWidth: "170px", // Keep it small for less space usage
  minHeight: "100px", // Reduced height to match the content
  margin: "0 auto", // Center the form horizontally
}));

// Main container to ensure proper layout
const MainContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "25vh", // Ensure full screen height
  backgroundColor: "#ffffff",
  padding: 0,
  overflow: "hidden", // Remove unwanted scrollbars
  flexDirection: "column", // Allow content to adjust if necessary
}));

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true"); // Store login status
      navigate("/biblioteca.admin/books"); // Redirect to admin panel
      window.location.reload(); // Force App.js to re-render and switch layout
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <MainContainer>
      <LoginBox>
        <Typography
          variant="h6"
          sx={{ mb: 0.5, textAlign: "center", fontSize: "1rem" }}
        >
          Admin Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%", // Ensuring full width
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch", // Make sure inputs and button take full width
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="dense" // Use 'dense' to reduce margin
            size="small" // Smaller input size
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1C7343", // Border color for the contour
                },
                "&:hover fieldset": {
                  borderColor: "#1C7343", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#155e36", // Focused border color
                },
              },
              "& .MuiInputLabel-root": {
                color: "#000", // Black color for the label
              },
              marginBottom: "4px", // Reduced space below input fields
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="dense" // Use 'dense' for smaller margins
            size="small" // Smaller input size
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1C7343", // Border color for the contour
                },
                "&:hover fieldset": {
                  borderColor: "#1C7343", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#155e36", // Focused border color
                },
              },
              "& .MuiInputLabel-root": {
                color: "#000", // Black color for the label
              },
              marginBottom: "4px", // Reduced space below input fields
            }}
          />
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 0.5, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}
          <Box
            sx={{
              mt: 1, // Reduced margin top for button
              width: "100%", // Ensure full width for the button
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "100%", // Ensures button takes full width
                borderRadius: "6px", // Smaller rounded corners
                padding: "8px", // Slightly smaller padding for the button
                fontSize: "13px", // Smaller font size for the button
                backgroundColor: "#1C7343",
                color: "white",
                border: "1px solid #1C7343",
                "&:hover": {
                  backgroundColor: "#155e36",
                  borderColor: "#155e36",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </LoginBox>
    </MainContainer>
  );
};

export default AdminLogin;
