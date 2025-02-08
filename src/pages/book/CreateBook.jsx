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
    navigate("/book.manager/books");
  };

  const handleSaveClick = () => {
    navigate("/book.manager/books");
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
      isbn: isbn,
      authors: authors,
      title: title,
      types: types,
      year: year,
      description: description,
    };

    try {
      await postBook(book);
      dispatch(openSnackbar({ text: "Book added successfully" }));
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/book.manager/books");
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
          formTitle="Add book"
          book={book}
          buttonLabel="Add"
          onSaveBook={handleAddBook}
          // onClick={handleSaveBook}
        />
        {/* <Button
          variant="outlined"
          onClick={handleCancelClick}
          sx={{ width: "100px", marginTop: "15px" }}
        >
          Cancel
        </Button> */}
      </div>
    </Box>
  );
};

export default CreateBook;
