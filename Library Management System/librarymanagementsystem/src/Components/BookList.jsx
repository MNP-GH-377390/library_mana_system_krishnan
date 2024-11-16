import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', authorId: '', categoryId: '', publicationYear: '' });
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]); 
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await axios.get('/api/authors');
            if (Array.isArray(response.data)) {
                setAuthors(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
                setAuthors([]);
            }
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const addBook = async () => {
        if (newBook.title && newBook.authorId && newBook.categoryId) {
            try {
                await axios.post('/api/books', newBook);
                setNewBook({ title: '', authorId: '', categoryId: '', publicationYear: '' });
                fetchBooks(); 
            } catch (error) {
                console.error('Error adding book:', error);
            }
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchAuthors();
        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Books</h2>
            {Array.isArray(books) ? books.map(book => (
                <div key={book.id}>
                    <h4>{book.title} (by {book.author.name}, Category: {book.category.name})</h4>
                    <p>{book.description}, Published: {book.publicationYear}</p>
                </div>
            )) : (
                <p>No books available.</p>
            )}
            <h3>Add New Book</h3>
            <input
                type="text"
                placeholder="Book Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <select
                value={newBook.authorId}
                onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}
            >
                <option value="">Select Author</option>
                {Array.isArray(authors) ? authors.map(author => (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )) : <option>No authors available</option>}
            </select>
            <select
                value={newBook.categoryId}
                onChange={(e) => setNewBook({ ...newBook, categoryId: e.target.value })}
            >
                <option value="">Select Category</option>
                {Array.isArray(categories) ? categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                )) : <option>No categories available</option>}
            </select>
            <input
                type="text"
                placeholder="Publication Year"
                value={newBook.publicationYear}
                onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })}
            />
            <button onClick={addBook}>Add Book</button>
        </div>
    );
};

export default BookList;