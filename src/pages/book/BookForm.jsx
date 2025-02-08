import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

////modified////////////////////////////////////////////////////
const BookForm = ({
  book,
  buttonLabel,
  onSaveBook,
  onCancelClick,
  isReadonly,
}) => {
  const [isbn, setIsbn] = useState(book.isbn || "");
  const [authors, setAuthors] = useState(book.authors || "");
  const [title, setTitle] = useState(book.title || "");
  const [types, setTypes] = useState(book.types || "");
  const [year, setYear] = useState(book.year || "");
  const [formError, setFormError] = useState(false);
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState(book.description || "");

  const navigate = useNavigate();

  const handleIsbnChange = (e) => {
    const value = e.target.value.replace(/[^0-9-]/g, "").slice(0, 20);
    setIsbn(value);
    setErrors((prev) => ({
      ...prev,
      isbn: value.length === 0 ? "ISBN is required." : "",
    }));
  };

  const handleAuthorsChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z ]/g, "").slice(0, 100);
    setAuthors(value);
    setErrors((prev) => ({
      ...prev,
      authors: value.length === 0 ? "Authors are required." : "",
    }));
  };

  const handleTitleChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z ]/g, "").slice(0, 100);
    setTitle(value);
    setErrors((prev) => ({
      ...prev,
      title: value.length === 0 ? "Title is required." : "",
    }));
  };

  const handleTypesChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 20);
    setTypes(value);
    setErrors((prev) => ({
      ...prev,
      types: value.length === 0 ? "Types are required." : "",
    }));
  };

  const handleYearChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYear(value);
    setErrors((prev) => ({
      ...prev,
      year: value.length === 0 ? "Year is required." : "",
    }));
  };

  const handleCancelClick = () => {
    navigate("/book.manager/books");
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value.slice(0, 150); // Limit to 150 characters
    setDescription(value);
    setErrors((prev) => ({
      ...prev,
      description: value.length === 0 ? "Description is required." : "",
    }));
  };

  const isFormValid = () =>
    isbn && authors && title && types && year && description;

  const handleSaveClick = () => {
    if (!isFormValid()) {
      setFormError(true);
    } else {
      setFormError(false);
      onSaveBook({ isbn, authors, title, types, year, description });
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
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="ISBN"
        value={isbn}
        onChange={handleIsbnChange}
        error={!!errors.isbn}
        helperText={errors.isbn}
        inputProps={{ maxLength: 20 }}
      />

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Authors"
        value={authors}
        onChange={handleAuthorsChange}
        error={!!errors.authors}
        helperText={errors.authors}
        inputProps={{ maxLength: 100 }}
      />

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Title"
        value={title}
        onChange={handleTitleChange}
        error={!!errors.title}
        helperText={errors.title}
        inputProps={{ maxLength: 100 }}
      />

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Types"
        value={types}
        onChange={handleTypesChange}
        error={!!errors.types}
        helperText={errors.types}
        inputProps={{ maxLength: 20 }}
      />

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Year"
        value={year}
        onChange={handleYearChange}
        error={!!errors.year}
        helperText={errors.year}
        inputProps={{ maxLength: 4 }}
      />

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        error={!!errors.description}
        helperText={errors.description}
        multiline
        rows={4}
      />

      {!!buttonLabel && (
        <div>
          <Button
            variant="contained"
            onClick={handleSaveClick}
            disabled={!isFormValid()}
          >
            {buttonLabel}
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancelClick}
            sx={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </div>
      )}

      {formError && (
        <p style={{ color: "#D32F2F", fontSize: "0.8rem" }}>
          Please fill in all required fields correctly.
        </p>
      )}
    </Box>
  );
};

export default BookForm;
