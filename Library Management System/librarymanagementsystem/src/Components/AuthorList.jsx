import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState('');

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get('https://localhost:7229/api/Authors');
                console.log('API Response:', response.data); 
                
                if(Array.isArray(response.data)){
                    setAuthors(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setAuthors([]); 
                }
            } catch (error) {
                console.error('Error fetching authors:', error);
                setAuthors([]); 
            }
        };

        fetchAuthors();
    }, []);

    const addAuthor = async () => {
        try {
            await axios.post('/api/authors', { name: newAuthor });
            setNewAuthor('');
            
            const response = await axios.get('/api/authors');
            console.log('Updated API Response after adding:', response.data); 
            if(Array.isArray(response.data)){
                setAuthors(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('Error adding author:', error);
        }
    };

    return (
        <div>
            <h2>Authors</h2>
            <ul>
                {Array.isArray(authors) && authors.length > 0 ? (
                    authors.map(author => (
                        <li key={author.id}>{author.name}</li>
                    ))
                ) : (
                    <li>No authors available.</li> 
                )}
            </ul>
            <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="New Author Name"
            />
            <button onClick={addAuthor}>Add Author</button>
        </div>
    );
};

export default AuthorList;