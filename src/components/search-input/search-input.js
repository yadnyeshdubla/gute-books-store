import React, { useEffect, useMemo, useRef, useState } from "react";
import "./search-input.css";
import Search from "./../../assets/Search.svg";
import Cancel from "./../../assets/Cancel.svg";
import { debounce } from "lodash";

const DEBOUNCE_IN_MILIIS = 1_000;

const SearchInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const { value } = event?.target || {};
    setInputValue(value);
    onSearch(value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleInputChange, DEBOUNCE_IN_MILIIS);
  }, []);

  const clearInput = () => {
    setInputValue("");
    inputRef.current.value = "";
    onSearch("");
  };
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <div className={`input-container ${isFocused ? "active" : ""}`}>
      <img className="search-icon" alt="search" src={Search} />
      <input
        type="text"
        ref={inputRef}
        placeholder="Search"
        onChange={debouncedResults}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="custom-input"
      />
      <img
        className={`clear-icon ${inputValue ? "show" : "hide"}`}
        onClick={clearInput}
        src={Cancel}
        alt="cancel"
      />
    </div>
  );
};

export default SearchInput;
