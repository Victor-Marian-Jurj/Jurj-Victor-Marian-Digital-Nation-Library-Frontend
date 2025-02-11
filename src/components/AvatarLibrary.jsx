import { Avatar, Badge } from "@mui/material";
import "../styles/UserAvatar.css";

const AvatarLibrary = () => {
  return (
    <Badge
      className="styled-badge"
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
      color="success"
      sx={{ marginRight: "8px" }}
    >
      <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
    </Badge>
  );
};

export default AvatarLibrary;
