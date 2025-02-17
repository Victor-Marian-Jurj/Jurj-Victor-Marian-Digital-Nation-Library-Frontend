import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import BookItem from "./BookItem";
import "../../styles/BooksList.css";
import { getBooks as getBooks } from "../../service/BookService";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import BookPDFButton from "./BookPDFButton"; // Import GeneratePDFButton component
import { styled } from "@mui/system"; // Import styled from @mui/system or @mui/material/styles

const Container = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px", // Adjust the gap between items
  alignItems: "center", // Align items vertically
  marginBottom: "20px", // Add bottom margin for separation
});

const BooksList = () => {
  const [authorsFilterOptions, setAuthorsFilterOptions] = useState([""]);
  const [books, setBooks] = useState([]);
  const [authorsFilter, setAuthorsFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [typesFilter, setTypesFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [isbnFilter, setIsbnFilter] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]); // State variable to hold filtered Book data
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("title");
  //

  const updateAuthorsFilterOptions = () => {
    const distinctAuthors = getDistinctValues("Autori");
    setAuthorsFilterOptions(["All", ...distinctAuthors]);
  };

  const updateYearFilterOptions = () => {
    const distinctYears = getDistinctValues("An");
    setAuthorsFilterOptions(["All", ...distinctYears]);
  };

  const fetchBookData = async () => {
    try {
      const response = await getBooks();
      const booksData = response.book;
      // Sort books alphabetically by title
      const sortedBooks = booksData.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA.localeCompare(titleB);
      });

      setBooks(sortedBooks);
      setFilteredBooks(sortedBooks);
      // Update rating and name filter options after fetching Book data
      updateAuthorsFilterOptions();
      updateTypesFilterOptions();
      updateYearFilterOptions();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Update rating and name filter options whenever Books data changes
    updateAuthorsFilterOptions();
    updateTypesFilterOptions();
    updateYearFilterOptions();
  }, [books]); // Run when Books data changes

  useEffect(() => {
    if (titleFilter !== "") {
      updateAuthorsFilterOptions({ title: titleFilter });
      updateTypesFilterOptions({ title: titleFilter });
      updateYearFilterOptions({ title: titleFilter });
    } else {
      // If location is not selected, use all available ratings and names
      updateAuthorsFilterOptions();
      updateTypesFilterOptions();
      updateYearFilterOptions();
    }
  }, [titleFilter]); // Run when location filter changes

  // Add this function to update name filter options
  const updateTypesFilterOptions = (options = {}) => {
    // Get distinct values based on the current filter settings and location
    const distinctTypes = getDistinctValues("Tip de carte", options);
    setAuthorsFilterOptions(["All", ...distinctTypes]);
  };

  //

  useEffect(() => {
    const filtered = books.filter((book) =>
      book[searchCriteria].toLowerCase().includes(searchTerm.toLowerCase())
    );

    /// Sort filtered books alphabetically by title
    const sortedFilteredBooks = filtered.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return titleA.localeCompare(titleB);
    });

    setFilteredBooks(sortedFilteredBooks);
  }, [searchTerm, searchCriteria, books]);

  useEffect(() => {
    if (titleFilter !== "") {
      updateAuthorsFilterOptions({ title: titleFilter });
      updateTypesFilterOptions({ title: titleFilter });
      updateYearFilterOptions({ title: titleFilter });
    } else {
      // If location is not selected, use all available ratings and names
      updateAuthorsFilterOptions();
      updateTypesFilterOptions();
      updateYearFilterOptions();
    }
  }, [titleFilter]); // Run when location filter changes

  useEffect(() => {
    // Update rating filter options whenever Books data changes
    updateAuthorsFilterOptions();
  }, [books]); // Run when Books data changes

  useEffect(() => {
    fetchBookData();
    updateAuthorsFilterOptions();
    updateYearFilterOptions();
    // Update rating filter options for all Books
  }, []); // Run once on component mount

  const getDistinctValues = (key, options = {}) => {
    // Destructure the location option
    const { title } = options;

    // Filter Books based on the location
    const filteredBooks = books.filter(
      (book) => !title || book.title.includes(title)
    );

    // Get distinct values based on the filtered Books
    const distinctValues = [...new Set(filteredBooks.map((book) => book[key]))];

    // Sort the distinct values
    return distinctValues.sort((a, b) => {
      if (typeof a === "string" || typeof b === "string") {
        return a.localeCompare(b);
      } else {
        return a - b;
      }
    });
  };

  const getFilteredBooks = () => {
    return books
      .filter(
        (book) =>
          (!titleFilter || book.title.includes(titleFilter)) &&
          (!authorsFilter || book.authors.includes(authorsFilter)) &&
          (!typesFilter || book.types.includes(typesFilter)) &&
          (!isbnFilter || book.isbn.toString() === isbnFilter) &&
          (!yearFilter || book.year == yearFilter)
      )
      .sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA.localeCompare(titleB);
      });
  };

  const handleTitleChange = (selectedTitle) => {
    setTitleFilter(selectedTitle);
  };

  const handleAuthorsChange = (selectedAuthors) => {
    setAuthorsFilter(selectedAuthors === "All" ? "" : selectedAuthors);
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [books, titleFilter, authorsFilter, typesFilter, isbnFilter, yearFilter]);

  const applyFilters = () => {
    setFilteredBooks(getFilteredBooks());
  };

  return (
    <div>
      <Typography variant="h5" sx={{ color: "#3f51b5" }}>
        Filtrează carte
      </Typography>
      <Container sx={{ backgroundColor: "white", color: "black" }}>
        <TextField
          label="Titlul"
          value={titleFilter}
          onChange={(e) => handleTitleChange(e.target.value)}
          select
          sx={{ width: "145px" }}
        >
          <MenuItem value="">All</MenuItem>
          {getDistinctValues("title").map((title) => (
            <MenuItem key={title} value={title}>
              {title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Autori"
          value={authorsFilter}
          onChange={(e) => handleAuthorsChange(e.target.value)}
          select
          sx={{ width: "130px" }}
        >
          <MenuItem value="">All</MenuItem>

          {getDistinctValues("authors").map((authors) => (
            <MenuItem key={authors} value={authors}>
              {authors}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Tip carte"
          value={typesFilter}
          onChange={(e) => setTypesFilter(e.target.value)}
          select
          sx={{ width: "130px" }}
        >
          <MenuItem value="">All</MenuItem>
          {getDistinctValues("types").map((types) => (
            <MenuItem key={types} value={types}>
              {types}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="An"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          select
          sx={{ width: "85px" }}
        >
          <MenuItem value="">All</MenuItem>
          {getDistinctValues("year").map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Cod ISBN"
          value={isbnFilter}
          onChange={(e) => setIsbnFilter(e.target.value)}
          select
          sx={{ width: "120px" }}
        >
          <MenuItem value="">All</MenuItem>
          {getDistinctValues("isbn").map((isbn) => (
            <MenuItem key={isbn} value={isbn}>
              {isbn}
            </MenuItem>
          ))}
        </TextField>
        <BookPDFButton getFilteredBooks={getFilteredBooks} />
        {/*  */}
        <div>
          <Typography variant="h5" sx={{ color: "#3f51b5", mb: 2 }}>
            Caută carte
          </Typography>
          <Container>
            <TextField
              select
              label="Caută după"
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              sx={{ width: "100px" }}
            >
              <MenuItem value="title">Titlul</MenuItem>
              <MenuItem value="authors">Autori</MenuItem>
              <MenuItem value="types">Tip carte</MenuItem>
            </TextField>
            <TextField
              // label={`Caută după ${searchCriteria}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "300px" }}
            />
          </Container>
        </div>
        {/*  */}
      </Container>

      <Divider
        sx={{ backgroundColor: "#3f51b5", height: "2px", marginY: "20px" }}
      />
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: "4rem" }}>
        {books.length === 0 ? (
          <Box className="center-flex-container">
            <CircularProgress />
          </Box>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookItem book={book} key={book.isbn} onGetBooks={fetchBookData} />
          ))
        ) : (
          <Typography>Nu s-au gasit cărți</Typography>
        )}
      </Stack>
    </div>
  );
};
export default BooksList;
