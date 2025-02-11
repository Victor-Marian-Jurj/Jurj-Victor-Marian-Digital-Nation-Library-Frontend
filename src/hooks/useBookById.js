import { useEffect, useState } from "react";
import { getBookById } from "../service/BookService";

export const useBookById = (bookId) => {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getBook = async () => {
      try {
        setIsLoading(true);
        const book = await getBookById(bookId);
        setBook(book);
        setIsError(false);
      } catch (e) {
        console.error(e);
        setIsError(e);
      } finally {
        setIsLoading(false);
      }
    };

    getBook();
  }, [bookId]);

  return { book: book, isLoading, isError };
};
