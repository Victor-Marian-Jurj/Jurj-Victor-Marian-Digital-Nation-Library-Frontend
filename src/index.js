import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BooksList from "./pages/book/BooksList";
import CreateBook from "./pages/book/CreateBook";
import ViewBook from "./pages/book/ViewBook";
import EditBook from "./pages/book/EditBook";
import { Provider } from "react-redux";
import store from "./stores/store";
import ViewBookUser from "./pages/user/User_UI/ViewBookUser";
import BooksListUser from "./pages/user/User_UI/BooksListUser";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/biblioteca.admin/books", element: <BooksList /> },
      { path: "/biblioteca.admin/books/create", element: <CreateBook /> },
      { path: "/biblioteca.admin/books/:bookId", element: <ViewBook /> },
      { path: "/biblioteca.admin/books/:bookId/edit", element: <EditBook /> },
      /////////////user////
      { path: "/biblioteca/books", element: <BooksListUser /> },
      { path: "/biblioteca/books/:bookId", element: <ViewBookUser /> },
    ],
  },
]);

//JSX
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
