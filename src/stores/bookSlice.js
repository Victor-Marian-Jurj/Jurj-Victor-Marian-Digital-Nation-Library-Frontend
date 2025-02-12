import { createSlice } from "@reduxjs/toolkit";

//action = {type: "setBooks", payload: {books: ["book1"]}}

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

export default bookSlice.reducer;
export const { setBooks } = bookSlice.actions;
