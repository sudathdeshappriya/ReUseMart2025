import React from "react";
import "../css/ItemCard.css";



function ItemCard({ item, onClick }) {
  function favouriteCart(e) {
    e.stopPropagation(); // prevents triggering parent onClick
    alert("Added!");
  }

  

  return (
    <div className="item-card" onClick={onClick} style={{ cursor: "pointer" }}>
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
      </div>
    </div>
  );
}

export default ItemCard;

