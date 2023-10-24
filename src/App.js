import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import React from "react";
import Topics from "./pages/topics/topics";
import Books from "./pages/books/books";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastProvider } from "./services/toast/use-toast-service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Topics />,
  },
  {
    path: "/books",
    element: <Books />,
  },
]);

function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </Provider>
    </ToastProvider>
  );
}

export default App;
