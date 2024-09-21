import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload(); // refresh page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Ritu's Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            {book.cover && book.cover}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <span>${book.price}</span>
            <div className="button-container">
              <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
              <button className="update">
                <Link
                  to={`/update/${book.id}`}
                  style={{ color: "inherit", textDecoration: "none", width: "100%" }}
                >
                  Update
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
            Add new book
        </Link>
    </button>

    </div>
  );
};

export default Books;
