import React from "react";
import useBookService from "../../services/use-book-service";
import { useLocation, useNavigate } from "react-router-dom";
import BookCard from "../../components/book-card/book-card";
import "./books.css";
import Header from "../../components/header/header";
import SearchInput from "../../components/search-input/search-input";
import Back from "./../../assets/Back.svg";
import { geBookReaderType } from "../../utils/book-reader-util";
import useScrollService from "../../services/use-scroll-service";

const Books = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("topic");
  const { allResults, loading, loadNext, onSearch } = useBookService(topic);

  const onScroll = () => {
    if (loading) return;
    loadNext();
  };
  useScrollService(onScroll);

  const onSelectBook = (book) => {
    const bookReaderType = geBookReaderType(book);
    window.location = book?.formats?.[bookReaderType];
  };

  const back = () => {
    navigate(-1);
  };

  return (
    <div className="books-page">
      <Header className="sticky">
        <div className="heading">
          <img src={Back} alt="back" className="back-img" onClick={back} />
          <div className="topic">{topic}</div>
        </div>
        <SearchInput onSearch={onSearch} />
      </Header>
      <div className="book-grid">
        {allResults
          .sort((a, b) => a.id - b.id)
          .map((book, index) => (
            <BookCard
              book={book}
              key={index + book.id}
              onClick={() => onSelectBook(book)}
            ></BookCard>
          ))}
        {loading && "...Loading"}
        {allResults.length === 0 && !loading && "No books found"}
      </div>
    </div>
  );
};

export default Books;
