import { createSlice } from "@reduxjs/toolkit";

export const BookSlice = createSlice({
  name: "book",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getBookStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    getBookSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },

    getBookFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Delete ALL
    deleteBookStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    deleteBookSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item.bookID === action.payload),
        1
      );
    },

    deleteBookFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //update ALL
    updateBookStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    updateBookSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item.bookID === action.payload.bookID)
      ] = action.payload.book;
    },

    updateBookFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

     //ADD
     addBookStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addBookSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addBookFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getBookStart,
  getBookSuccess,
  getBookFailure,
  deleteBookStart,
  deleteBookSuccess,
  deleteBookFailure,
  updateBookStart,
  updateBookSuccess,
  updateBookFailure,
  addBookStart,
  addBookSuccess,
  addBookFailure
} = BookSlice.actions;

export default BookSlice.reducer;
