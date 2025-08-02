import React, { useState } from "react";
import "../css/AddItem.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddItemForm() {
    const [formData, setFormData] = useState({
        itemName: "",
        category: "",
        price: "",
        contact: "",
        location: "",
        condition: "",
        description: ""
    });
    const navigate = useNavigate();

    const [image, setImage] = useState(null); // 🖼️ New image state

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleImageChange(e) {
        setImage(e.target.files[0]); // Only take 1 image for now
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        if (image) {
            data.append("image", image); // must match backend multer name
        }

        try {
            const response = await fetch("http://localhost:4000/api/add-item", {
    method: "POST",
    body: data,
    credentials: 'include'
});

            const result = await response.json();
            if (response.ok) {
                 // Redirect to home after successful submission
                toast.success("Item added successfully!");
                navigate("/");
                console.log("Submitted Item:", result.item);
                // Reset form
                setFormData({
                    itemName: "",
                    category: "",
                    price: "",
                    contact: "",
                    location: "",
                    condition: "",
                    description: ""
                });
                setImage(null);
            } else {
                alert("Error: " + result.error);
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred.");
        }

    }

    return (
        <div className="add-item-form">
            <button className="close-btn" onClick={() => navigate(-1)}>✖</button>
            <h2>Add E-Waste Item</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="itemName" placeholder="Item Name" value={formData.itemName} onChange={handleChange} required /><br />

                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC">PC</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Other">Other</option>
                </select><br />

                <input type="number" name="price" placeholder="Price (USD)" value={formData.price} onChange={handleChange} required /><br />
                <input type="text" name="contact" placeholder="Contact Details" value={formData.contact} onChange={handleChange} required /><br />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required /><br />

                <select name="condition" value={formData.condition} onChange={handleChange} required>
                    <option value="">Condition</option>
                    <option value="100%">100%</option>
                    <option value="90%">90%</option>
                    <option value="70%">70%</option>
                    <option value="50%">50%</option>
                    <option value="Below 50%">Below 50%</option>
                </select><br />

                <textarea name="description" placeholder="Additional Description" rows="3" value={formData.description} onChange={handleChange} /><br />

                <input type="file" name="image" accept="image/*" onChange={handleImageChange} required /><br /> {/* 🖼️ Image upload */}

                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}

export default AddItemForm;
