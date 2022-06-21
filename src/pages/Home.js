import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    const response = axios(
      `https://www.googleapis.com/books/v1/volumes?q=${search}+inauthor&${search}+intitle&key=AIzaSyDmujINbp32tw3Nqts0hw-IuZk46HiHZp8`
    );

    response.then((res) => {
      if (response.data === undefined) {
        setResults([]);
      }
      if (response) {
        setResults(res.data.items);
        setLoading(false);
      }
    });
  
  };
  console.log(results);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div >
      <input
        placeholder="Search any book or author..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="inputBtn" onClick={handleSearch}>Search</button>
        {!results && <h1>No results found</h1>}
      {!loading &&
        results !== undefined &&
        results.map((book) => {
          return (
            <div key={book.id} className="card d-inline-block my-5 mx-2" style={{width: "20rem", height: "30rem"}}>
              <img src={book.volumeInfo.imageLinks.smallThumbnail !== undefined ? book.volumeInfo.imageLinks.smallThumbnail : "https://www.makliftsan.com.tr/mp-include/uploads/images/no-foto.jpg"} className="card-img-top" alt="..." style={{width:"20rem", height: "20rem"}} />
              <hr />
              <div className="card-body">
                <h5 className="card-title">{book.volumeInfo.title}</h5>
                <p className="card-text">
                    <Link to={`/${book.id}`}>Details</Link>
                </p>
                
                
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
