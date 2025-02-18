import { useNavigate } from "react-router-dom";
import { postBook } from "../../service/BookService";
import BookForm from "./BookForm";
import { openSnackbar } from "../../stores/snackbarSlice";
import { useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import { useState } from "react";

const CreateBook = () => {
  const initialBook = {
    isbn: "",
    authors: "",
    title: "",
    types: "",
    year: "",
    description: "",
  };
  const [book, setBook] = useState(initialBook);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancelClick = () => {
    navigate("/biblioteca.admin/books");
  };

  const handleSaveClick = () => {
    navigate("/biblioteca.admin/books");
  };
  const handleAddBook = async (
    isbn,
    authors,
    title,
    types,
    year,
    description
  ) => {
    const book = {
      isbn: String(isbn),
      authors: String(authors),
      title: String(title),
      types: String(types),
      year: parseInt(year, 10),
      description: String(description),
    };

    try {
      await postBook(book);
      dispatch(openSnackbar({ text: "Carte adăugată cu succes" }));
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/biblioteca.admin/books");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <BookForm
          formTitle="Adaugă carte"
          book={book}
          buttonLabel="Add"
          onSaveBook={handleAddBook}
        />
      </div>
    </Box>
  );
};

export default CreateBook;
