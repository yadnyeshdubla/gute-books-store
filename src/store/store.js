import { createStore, combineReducers } from "redux";
import { bookReducer } from "./book-reducer";

const rootReducer = combineReducers({
  books: bookReducer,
});

const store = createStore(rootReducer);

export default store;
