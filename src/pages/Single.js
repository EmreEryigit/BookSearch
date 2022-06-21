import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const response = axios(
      `https://www.googleapis.com/books/v1/volumes/${id}&key=AIzaSyDmujINbp32tw3Nqts0hw-IuZk46HiHZp8`
    );

    response.then((res) => {
      if (response.data === undefined) {
        setBook({});
      }
      if (response) {
        setBook(res.data.items);
        setLoading(false);
      }
    });
  }, [book, id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  console.log(book)
  return (
    <div>
      {!loading  && book !== {} && (
        <>
          <h3>{book.volumeInfo.title}</h3>
          <h4>author: {book.authors.map(author => <div>{author}</div>)}</h4>
          <div>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
          </div>
          <div>
            <p>Total Pages:  {book.volumeInfo.pageCount}</p>
            <p>Published on : {book.volumeInfo.publishedDate} </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Single;
