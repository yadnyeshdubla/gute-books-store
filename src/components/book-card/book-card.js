import React from "react";
import "./book-card.css";

const BookCard = ({ book, onClick }) => {
  return (
    <div className="book-card" onClick={onClick} key={book.id}>
      <img
        className="poster"
        src={book?.formats?.["image/jpeg"]}
        alt={book?.title}
      />
      <div className="book-name">{book?.title?.toUpperCase()}</div>
      <div className="book-author">{book?.authors?.[0]?.name} </div>
    </div>
  );
};

export default BookCard;
