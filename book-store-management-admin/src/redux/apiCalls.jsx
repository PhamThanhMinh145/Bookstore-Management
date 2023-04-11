import { publicRequest, userRequest } from "../requestMethod";

import {
  addBookFailure, addBookStart,
  addBookSuccess, deleteBookFailure,
  deleteBookStart,
  deleteBookSuccess,
  getBookFailure,
  getBookStart,
  getBookSuccess, updateBookFailure, updateBookStart,
  updateBookSuccess
} from "./bookRedux";

export const getBooks = async (dispatch) => {
    dispatch(getBookStart());
    try {
      const res = await publicRequest.get("Book/Get");
      dispatch(getBookSuccess(res.data));
    } catch (err) {
      dispatch(getBookFailure());
    }
  };

  export const deleteBook = async (id, dispatch) => {
    dispatch(deleteBookStart());
    try {
      const res = await userRequest.delete(`Book/Delete/${id}`);
      dispatch(deleteBookSuccess(id));
    } catch (err) {
      dispatch(deleteBookFailure());
    }
  };

  export const updateBook = async (id, book, dispatch) => {
    dispatch(updateBookStart());
    try {
      // update
       const res = await userRequest.put(`Book/Update/${id}`, book)
      dispatch(updateBookSuccess({id, book}));
    } catch (err) {
      dispatch(updateBookFailure());
    }
  };

  export const addBook = async (book, dispatch) => {
    dispatch(addBookStart());
    try {
      const res = await userRequest.post(`Book/Create`, book );
      dispatch(addBookSuccess(res.data));
    } catch (err) {
      dispatch(addBookFailure());
    }
  };

  // export const addExcel = async (file, dispatch) => {
  //   dispatch(addBookStart());
  //   try {
  //     const res = await userRequest.post(`Book/Import`, file );
  //     dispatch(addBookSuccess(res.data));
  //   } catch (err) {
  //     dispatch(addBookFailure());
  //   }
  // };


  