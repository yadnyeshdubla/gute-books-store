import { ACTIONS } from "./actions";

const initialState = {
  books: null,
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.BOOKS_PAGE:
      return {
        page: action.payload,
      };
    default:
      return state;
  }
};

export const getBooksPage = (state) => {
  return state.page;
};
