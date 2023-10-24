import { BOOK_READER_TYPES } from "../constants/book-reader-types";

export const geBookReaderType = (book) => {
  if (!book) return null;
  const { formats } = book;

  if (formats[BOOK_READER_TYPES.html]) {
    return BOOK_READER_TYPES.html;
  } else if (formats[BOOK_READER_TYPES.pdf]) {
    return BOOK_READER_TYPES.pdf;
  }
  return BOOK_READER_TYPES.txt;
};

export const transformHtmlUrl = (url1) => {
  const pattern = /\/ebooks\/(\d+)\.html\.images/;
  const match = url1.match(pattern);
  if (match) {
    const number = match[1];
    return `https://www.gutenberg.org/cache/epub/${number}/pg${number}-images.html`;
  }
  return null; // Return null if the transformation is not possible
};
