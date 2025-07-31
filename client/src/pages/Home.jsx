import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ItemCard from "./item";
import "../css/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);

  // Fetch items from backend on page load
  useEffect(() => {
    fetch("http://localhost:4000/api/items") 
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Navbar />
      </div>

      <div className="home">
        <div className="item-container">
          {items
            .filter((item) =>
              item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item) => (
              <ItemCard
                key={item._id}
                item={{
                  title: item.itemName,
                  url: `http://localhost:4000/${item.imageUrl}`,
                }}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
