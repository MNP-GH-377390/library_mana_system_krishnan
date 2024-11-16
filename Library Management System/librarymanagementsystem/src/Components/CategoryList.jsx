import React, { useEffect, useState } from 'react';


const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    const addCategory = async () => {
        if (newCategory) {
            await axios.post('/api/categories', { name: newCategory });
            setNewCategory('');
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        }
    };

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New Category Name"
            />
            <button onClick={addCategory}>Add Category</button>
        </div>
    );
};

export default CategoryList;