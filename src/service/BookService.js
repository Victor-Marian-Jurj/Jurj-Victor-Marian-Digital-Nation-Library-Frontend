import axiosInstance from "../plugins/axiosConfig";

export const getBooks = async () => {
  const { data } = await axiosInstance.get("/books");
  return data;
};

export const getBookById = async (id) => {
  const { data } = await axiosInstance.get(`/books/${id}`);
  return data;
};

export const postBook = async (book) => {
  const { data } = await axiosInstance.post("/books", book);
  return data;
};

export const deleteBook = async (id) => {
  const { data } = await axiosInstance.delete(`/books/${id}`);
  return data;
};

export const patchBook = async (id, book) => {
  const { data } = await axiosInstance.patch(`/books/${id}`, book);
  return data;
};
