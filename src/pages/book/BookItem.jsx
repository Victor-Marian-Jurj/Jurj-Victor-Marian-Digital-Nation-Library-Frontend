import { Stack, Typography } from "@mui/material";
import CircleBackgroundIcon from "../../components/CircleBackgroundIcon";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmDeleteBookDialog from "./ConfirmDeleteBookDialog";
import { deleteBook } from "../../service/BookService";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../stores/snackbarSlice";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BookItem({ book, onGetBooks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState(`../../images/${book.bookId}.jpg`);

  const dispatch = useDispatch();

  const handleImgError = () => {
    setSrc("../../images/no-image.jpg");
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleDeleteBook = async () => {
    const bookId = book.bookId;

    try {
      await deleteBook(bookId);
      dispatch(openSnackbar({ text: "Carte ștearsă cu succes" }));
      onGetBooks();
    } catch (err) {
      console.error(err);
      dispatch(
        openSnackbar({
          text: "Eroare în stergerea unei cărți",
          severity: "error",
        })
      );
    } finally {
      handleCloseDialog();
    }
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
          <Link to={`/biblioteca.admin/books/${book.bookId}`}>
            <CircleBackgroundIcon icon={VisibilityIcon} color="white" />
          </Link>
          <Link to={`/biblioteca.admin/books/${book.bookId}/edit`}>
            <CircleBackgroundIcon icon={EditIcon} color="white" />
          </Link>
          <CircleBackgroundIcon
            icon={DeleteSharpIcon}
            color="white"
            onClick={handleOpenDialog}
          />
          <ConfirmDeleteBookDialog
            book={book}
            isOpen={isOpen}
            onDelete={handleDeleteBook}
            onClose={handleCloseDialog}
          />
        </Stack>
      </div>

      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontWeight: "bold" }}>
          <Link
            to={`/biblioteca.admin/books/${book.bookId}`}
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {book.title}
          </Link>
          <Link
            to={`/biblioteca.admin/books/${book.bookId}`}
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

      <ConfirmDeleteBookDialog
        book={book}
        isOpen={isOpen}
        onDelete={handleDeleteBook}
        onClose={handleCloseDialog}
      />
    </Stack>
  );
}
