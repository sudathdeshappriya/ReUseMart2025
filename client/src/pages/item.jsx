import React from "react";
import "../css/ItemCard.css";
import { useNavigate, Link } from "react-router-dom";

function ItemCard({ item }) {


  const navigate = useNavigate();

  function favouriteCart(e) {
    e.stopPropagation();
    alert("Added!");
  }

  return (
    <div className="item-container">
    <div
      className="item-card"
      onClick={() => navigate(`/items/${item._id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="item-poster">
        <img src={item.url} alt={item.title} />
        <div className="item-overlay">
          <button className="favourite-button" onClick={favouriteCart}>
            +
          </button>
        </div>
      </div>
      <div className="item-info">
        <h3>{item.title}</h3>
        
        <Link to={`/items/${item._id}`}></Link>
      </div>

      <div className="item-price"><h2>${item.price}</h2></div>
      
    </div></div>
  );
}

export default ItemCard;
