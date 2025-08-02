import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/ViewItem.css"; // Assuming you have a CSS file for styling
import { AppContent } from "../context/AppContext";

const ViewItem = () => {
  const { id } = useParams(); // 🔍 extract item ID from URL
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const { userData } = useContext(AppContent)
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/api/items/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Item not found");
        return res.json();
      })
      .then((data) => setItem(data))
      .catch((err) => {
        console.error("Error fetching item:", err);
        setError("Failed to load item.");
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!item) return <p>Loading...</p>;

  console.log("Fetched Item:", item.imageUrl);

  return (
    <div className="item-view">
      <button className="close-btn" onClick={() => navigate(-1)}>✖</button>
      <div className="item-image">
        <img src={`http://localhost:4000/${item.imageUrl}`} alt={item.itemName} />
      </div>
      <div className="item-details">
        <h2>{item.itemName}</h2>
        <p><strong className="category">Category:</strong> {item.category}</p>
        <p className="price">$ {item.price}</p>
        <p><strong className="contact">Contact Now:</strong> {item.contact}</p>
        <p><strong className="location">Location:</strong> {item.location}</p>
        <p><strong className="condition">Condition:</strong> {item.condition}</p>
        <div className="item-actions">
{ userData && userData.role === 'user' && (
                    <button className="favourite-btn" onClick={() => alert("Added to favourites!")}>Add to Favourites</button>
                    )}
{ userData && userData.role === 'admin' && (
                    <button className="delete-btn" onClick={() => alert("Item is deleted!")}>Delete Item</button>
                    )}




      </div>
        
      </div>
      <div className="item-description"> <h3>Description</h3> <p>{item.description}</p> </div>
      
    </div>


  );
};

export default ViewItem;
