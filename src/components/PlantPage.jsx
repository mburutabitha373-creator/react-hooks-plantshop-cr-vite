import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const PLANTS_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(PLANTS_URL)
      .then((res) => res.json())
      .then((data) => {
        const normalizedPlants = data.map((plant) => ({
          ...plant,
          inStock: plant.inStock ?? true,
        }));
        setPlants(normalizedPlants);
      })
      .catch((error) => {
        console.error("Error fetching plants:", error);
      });
  }, []);

  const handleAddPlant = (newPlant) => {
    const plantToPost = {
      name: newPlant.name,
      image: newPlant.image,
      price: newPlant.price,
    };

    return fetch(PLANTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantToPost),
    })
      .then((res) => res.json())
      .then((createdPlant) => {
        setPlants((prevPlants) => [
          ...prevPlants,
          { ...createdPlant, inStock: createdPlant.inStock ?? true },
        ]);
      })
      .catch((error) => {
        console.error("Error adding new plant:", error);
      });
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleToggleStock = (id) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
      )
    );
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <PlantList plants={filteredPlants} onToggleStock={handleToggleStock} />
    </main>
  );
}

export default PlantPage;
