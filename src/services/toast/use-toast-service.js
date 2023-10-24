import React, { useState, createContext, useContext } from "react";
import "./use-toast-service.css"; // Import the CSS file for styling

const ToastContext = createContext();

const TOAST_TIME_IN_MILLIS = 3_000;

export const useToastService = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const newToast = { message, type, id: new Date().getTime() };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, TOAST_TIME_IN_MILLIS);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};
