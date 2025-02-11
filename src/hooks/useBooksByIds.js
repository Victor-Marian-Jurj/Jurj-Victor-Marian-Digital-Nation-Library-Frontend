import { useEffect, useState } from "react";
import { getBookById } from "../service/BookService";

export const useBooksByIds = (bookIds) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const bookPromises = bookIds.map((bookId) => getBookById(bookId));
        const booksData = await Promise.all(bookPromises);
        setBooks(booksData);
        setIsError(false);
      } catch (e) {
        console.error(e);
        setIsError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [bookIds]);

  return { books, isLoading, isError };
};
