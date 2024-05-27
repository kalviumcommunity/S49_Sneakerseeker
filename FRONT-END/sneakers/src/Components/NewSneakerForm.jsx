// NewSneakerForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
function NewSneakerForm() {

    const username = cookies.get('username')
    const [formData, setFormData] = useState({
        sneakerName: '',
        price: '',
        color: '',
        rating: '',
        review: '',
        created_by: username
    });
    const  navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/sneakers', formData)
            .then(response => {
                console.log('Sneaker created successfully:', response.data);
                // You can redirect or perform any other action upon successful creation
                navigate('/home')
            })
            .catch(error => {
                console.error('Error creating sneaker:', error);
            });
    };

    return (
        <div>
            <h2>Add New Sneaker</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                <label>
                    Sneaker Name:
                    <input type="text" name="sneakerName" value={formData.sneakerName} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="text" name="price" value={formData.price} onChange={handleChange} />
                </label>
                <label>
                    Color:
                    <input type="text" name="color" value={formData.color} onChange={handleChange} />
                </label>
                <label>
                    Rating:
                    <input type="text" name="rating" value={formData.rating} onChange={handleChange} />
                </label>
                <label>
                    Review:
                    <textarea name="review" value={formData.review} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default NewSneakerForm;
