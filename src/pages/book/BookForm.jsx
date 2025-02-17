import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const isValidYear = (year) => {
  return /^[0-9]{4}$/.test(year) && year >= 1800 && year <= 2025;
};

const BookForm = ({
  book,
  formTitle,
  onSaveBook,
  buttonLabel,
  isReadonly,
  onCancelClick,
}) => {
  const [title, setTitle] = useState(book?.title || "");
  const [authors, setAuthors] = useState(book?.authors || "");
  const [isbn, setIsbn] = useState(book?.isbn || "");
  const [year, setYear] = useState(book?.year || "");
  const [types, setGenre] = useState(book?.types || "");
  const [description, setDescription] = useState(book?.description || "");

  const [isbnError, setIsbnError] = useState("");
  const [yearError, setYearError] = useState("");
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate();

  const handleIsbnChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setIsbn(value);

    if (value.length !== 10 && value.length > 0) {
      setIsbnError("ISBN trebuie să fie de fix 10 cifre.");
    } else {
      setIsbnError("");
    }
  };

  // Authors Validation (only letters)
  const handleAuthorsChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z ]/g, "").slice(0, 100);
    setAuthors(value);
  };

  const handleTitleChange = (event) => {
    const value = event.target.value
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .slice(0, 100);
    setTitle(value);
  };

  const handleGenreChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 20);
    setGenre(value);
  };

  const handleYearChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 4);
    setYear(value);

    if (!isValidYear(value)) {
      setYearError("Maxim 4-digit, interval (1800-2025).");
    } else {
      setYearError("");
    }
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value.slice(0, 150);
    setDescription(value);
  };

  const handleSaveClick = () => {
    if (
      !isbn ||
      !authors ||
      !title ||
      !types ||
      !year ||
      !description ||
      isbnError ||
      yearError
    ) {
      setFormError(true);
    } else {
      setFormError(false);
      onSaveBook(isbn, authors, title, types, year, description);
    }
  };

  const isFormValid = () =>
    isbn &&
    authors &&
    title &&
    types &&
    year &&
    description &&
    !isbnError &&
    !yearError;

  const handleCancelClick = () => {
    navigate("/biblioteca.admin/books");
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
      <h1>{formTitle}</h1>
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="ISBN"
        value={isbn}
        onChange={handleIsbnChange}
        error={!!isbnError}
        helperText={isbnError}
        inputProps={{ maxLength: 10 }}
        fullWidth
        sx={{ width: "100%" }}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Autori"
        value={authors}
        onChange={handleAuthorsChange}
        inputProps={{ maxLength: 100 }}
        fullWidth
        sx={{ width: "100%" }}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Titlu"
        value={title}
        onChange={handleTitleChange}
        inputProps={{ maxLength: 100 }}
        fullWidth
        sx={{ width: "100%" }}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Tip de carte"
        value={types}
        onChange={handleGenreChange}
        inputProps={{ maxLength: 20 }}
        fullWidth
        sx={{ width: "100%" }}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="An"
        value={year}
        onChange={handleYearChange}
        error={!!yearError}
        helperText={yearError}
        inputProps={{ maxLength: 4 }}
        fullWidth
        sx={{ width: "100%" }}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Descriere"
        value={description}
        onChange={handleDescriptionChange}
        inputProps={{ maxLength: 150 }}
        multiline
        rows={4}
        fullWidth
        sx={{ width: "100%" }}
      />
      {formError && (
        <p
          style={{
            color: "#D32F2F",
            margin: "0px 0px 0",
            fontSize: "0.68rem",
            fontFamily: "sans-serif",
          }}
        >
          Va rog sa completati corect toate campurile inainte de salvare.
        </p>
      )}
      {!!buttonLabel && (
        <>
          <Button
            variant="contained"
            onClick={handleSaveClick}
            disabled={!isFormValid() || isReadonly}
            sx={{
              width: "40%",
              maxWidth: "200px",
            }}
          >
            {buttonLabel}
          </Button>

          <Button
            variant="outlined"
            onClick={handleCancelClick}
            sx={{ width: "40%", maxWidth: "200px" }}
          >
            Cancel
          </Button>
        </>
      )}
    </Box>
  );
};

export default BookForm;
