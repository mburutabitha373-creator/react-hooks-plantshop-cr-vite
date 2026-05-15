import React from "react";

function PlantCard({ plant, onToggleStock }) {
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button type="button" onClick={() => onToggleStock(plant.id)}>
        {plant.inStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
