import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "./BookForm";
import { useBookById } from "../../hooks/useBookById";

const ViewBook = () => {
  const { bookId } = useParams();
  const { book, loading } = useBookById(bookId);
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/biblioteca.admin/books");
  };

  return (
    <div style={{ display: "flex" }}>
      {loading ? (
        <CircularProgress />
      ) : book ? (
        <>
          <div style={{ flex: 1, marginRight: "16px", marginBottom: "16px" }}>
            <BookForm formTitle="Detalii carte" book={book} isReadonly={true} />
            <Button
              variant="outlined"
              onClick={handleCancelClick}
              sx={{ mt: "30px", ml: "60px" }}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <p>Cartea nu a fost gasita.</p>
      )}
    </div>
  );
};

export default ViewBook;
