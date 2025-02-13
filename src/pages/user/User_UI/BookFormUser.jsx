import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Function to validate year input
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
  // Input fields state
  const [title, setTitle] = useState(book?.title || "");
  const [authors, setAuthors] = useState(book?.authors || "");
  const [isbn, setIsbn] = useState(book?.isbn || "");
  const [year, setYear] = useState(book?.year || ""); // Set initial value for year
  const [types, setGenre] = useState(book?.types || ""); // Set initial value for genre
  const [description, setDescription] = useState(book?.description || "");

  // Validation states
  const [isbnError, setIsbnError] = useState("");
  const [yearError, setYearError] = useState("");
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate();

  // ISBN Validation (only digits and hyphens, max 13 characters)
  const handleIsbnChange = (event) => {
    const value = event.target.value.replace(/[^0-9-]/g, "").slice(0, 13); // Allow only digits and hyphens
    setIsbn(value);

    if (value.length !== 20 && value.length > 0) {
      setIsbnError("ISBN trebuie sa fie 20 de caractere.");
    } else {
      setIsbnError("");
    }
  };

  // Authors Validation (only letters)
  const handleAuthorsChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z ]/g, "").slice(0, 100); // Allow only letters and spaces
    setAuthors(value);
  };

  // Title Validation (only letters and numbers)
  const handleTitleChange = (event) => {
    const value = event.target.value
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .slice(0, 100); // Allow only letters, numbers, and spaces
    setTitle(value);
  };

  // Genre Validation (only letters)
  const handleGenreChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 20); // Allow only letters
    setGenre(value);
  };

  // Year Validation (must be a valid 4-digit year)
  const handleYearChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 4); // Only digits, max 4 characters
    setYear(value);

    if (!isValidYear(value)) {
      setYearError("Maxim 4-digit, interval (1800-2025).");
    } else {
      setYearError("");
    }
  };

  // Description Validation (max length 500 characters)
  const handleDescriptionChange = (event) => {
    const value = event.target.value.slice(0, 500); // Max length of 500
    setDescription(value);
  };

  // Save button click handler
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
      // Pass all the fields (including year) to the onSaveBook callback
      onSaveBook(isbn, authors, title, types, year, description);
    }
  };

  // Form validity check
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
    navigate("/biblioteca/books");
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

      {/* ISBN Field */}
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="ISBN"
        value={isbn}
        onChange={handleIsbnChange}
        error={!!isbnError}
        helperText={isbnError}
        inputProps={{ maxLength: 20 }}
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
      {/* Title Field */}
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
      {/* Genre Field */}
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
      {/* Year Field */}
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
        sx={{ width: "100%" }} // Ensures it aligns with other fields
      />
      {/* Description Field */}
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
        sx={{ width: "100%" }} // Ensures it aligns with other fields
      />

      {/* Error handling for form */}
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

      {/* Save and Cancel buttons */}
      {!!buttonLabel && (
        <>
          <Button
            variant="contained"
            onClick={handleSaveClick}
            disabled={!isFormValid() || isReadonly}
            sx={{
              width: "40%", // Full width for consistency
              maxWidth: "200px", // Maximum width as needed
            }}
          >
            {buttonLabel}
          </Button>

          <Button
            variant="outlined"
            onClick={handleCancelClick}
            sx={{ width: "40%", maxWidth: "200px" }} // Full width and maximum width as needed
          >
            Cancel
          </Button>
        </>
      )}
    </Box>
  );
};

export default BookForm;
