import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthorList from './Components/AuthorList';
import CategoryList from './Components/CategoryList';
import BookList from './Components/BookList';

function App() {
    return (
        <Router>
            <div>
                <h1>Library Management System</h1>
                <nav>
                    <Link to="/">Home</Link> <br></br>
                    <Link to="/authors">Authors</Link><br></br>
                    <Link to="/categories">Categories</Link><br></br>
                    <Link to="/books">Books</Link><br></br>
                </nav>
                <Routes>
                    <Route path="/authors" element={<AuthorList />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/books" element={<BookList />} />
                    <Route path="/" element={<h2>Welcome to the Library Management System</h2>} />
                    <Route path="*" element={<h2>404 Not Found</h2>} /> {}
                </Routes>
            </div>
        </Router>
    );
}

export default App;