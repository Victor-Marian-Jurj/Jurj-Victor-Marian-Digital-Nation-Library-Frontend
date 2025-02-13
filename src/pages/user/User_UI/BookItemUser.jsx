import { Stack, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircleBackgroundIcon from "../../../components/CircleBackgroundIcon";

export default function BookItemUser({ book, onGetBooks }) {
  const [src, setSrc] = useState(`../../images/${book.bookId}.jpg`);

  const dispatch = useDispatch();

  const handleImgError = () => {
    setSrc("../../images/no-image.jpg");
  };
  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={0.5}
      className="book-cover-width"
    >
      <div className="book-cover-container">
        <img
          className="book-cover book-cover-width book-cover-height"
          src={src}
          onError={handleImgError}
          loading="lazy"
          alt="Book cover"
        />
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          className="middle"
        >
          <Link to={`/biblioteca/books/${book.bookId}`}>
            <CircleBackgroundIcon icon={VisibilityIcon} color="white" />
          </Link>
        </Stack>
      </div>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontWeight: "bold" }}>
          <Link
            to={`/biblioteca/books/${book.bookId}`}
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {book.title}
          </Link>
          <Link
            to={`/biblioteca/books/${book.bookId}`}
            style={{
              display: "block",
              fontSize: "0.9rem",
              color: "gray",
              textDecoration: "none",
            }}
          >
            {book.authors}
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
}
