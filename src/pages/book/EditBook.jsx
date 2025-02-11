import { CircularProgress, Typography, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "./BookForm";
import { useBookById } from "../../hooks/useBookById";
import { patchBook } from "../../service/BookService";
import { openSnackbar } from "../../stores/snackbarSlice";
import { useDispatch } from "react-redux";

const EditBook = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { book } = useBookById(params.bookId);
  const dispatch = useDispatch();

  const handleCancelClick = () => {
    navigate("/biblioteca.admin/books");
  };

  const handleSaveBook = async (
    isbn,
    authors,
    title,
    types,
    year,
    description
  ) => {
    const book = {
      isbn,
      authors,
      title,
      types,
      year,
      description,
    };

    try {
      await patchBook(params.bookId, book);
      dispatch(openSnackbar({ text: "Carte modificata cu succes" }));
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/biblioteca.admin/books");
    }
  };

  return book ? (
    <div>
      <Typography variant="h5" gutterBottom>
        Edit book
      </Typography>
      <Divider sx={{ my: 2 }} />
      <BookForm
        formTitle="Edit Book"
        book={book}
        buttonLabel="Edit"
        onSaveBook={handleSaveBook}
        onCancelClick={handleCancelClick}
      />
    </div>
  ) : (
    <CircularProgress />
  );
};

export default EditBook;
