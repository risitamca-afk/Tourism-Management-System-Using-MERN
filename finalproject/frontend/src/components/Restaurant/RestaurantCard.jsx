import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../components/Restaurant/RestaurantPage.css";

const RestaurantCard = ({
  updateRestaurantCount = () => {},
  filters,
  sortOption,
  restaurants: propRestaurants,
}) => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (propRestaurants && propRestaurants.length > 0) {
      setRestaurants(propRestaurants);
      setFiltered(propRestaurants);
      updateRestaurantCount(propRestaurants.length);
    } else {
      const fetchRestaurants = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/restaurants/"
          );
          setRestaurants(response.data);
          setFiltered(response.data);
          updateRestaurantCount(response.data.length);
        } catch (error) {
          console.error("Error fetching restaurants:", error);
        }
      };
      fetchRestaurants();
    }
  }, [updateRestaurantCount, propRestaurants]);

  useEffect(() => {
    const applyFilters = () => {
      if (!filters || Object.keys(filters).length === 0) {
        let list = [...restaurants];

        // 👉 Sort if needed
        if (sortOption === "rating") {
          list.sort((a, b) => b.rating - a.rating);
        }

        setFiltered(list);
        updateRestaurantCount(list.length);
        return;
      }

      let filteredList = restaurants.filter((restaurant) => {
        return Object.entries(filters).every(([category, selected]) => {
          if (selected.length === 0) return true;

          switch (category) {
            case "Place":
              return selected.includes(restaurant.place);
            case "Restaurant type":
              return restaurant.types?.some((type) => selected.includes(type));
            case "Establishment type":
              return restaurant.establishments?.some((e) =>
                selected.includes(e)
              );
            case "Meals":
              return restaurant.meals?.some((meal) => selected.includes(meal));
            case "Online feature & Offers":
              return restaurant.features?.some((feat) =>
                selected.includes(feat)
              );
            case "Dietary restrictions":
              return restaurant.dietary?.some((diet) =>
                selected.includes(diet)
              );
            case "Open":
              return selected.includes("Open now")
                ? restaurant.open === true
                : true;
            default:
              return true;
          }
        });
      });

      // 👉 Sort if needed
      if (sortOption === "rating") {
        filteredList.sort((a, b) => b.rating - a.rating);
      }

      setFiltered(filteredList);
      updateRestaurantCount(filteredList.length);
    };

    applyFilters();
  }, [filters, restaurants, updateRestaurantCount, sortOption]);

  const Card = ({ restaurant }) => {
    return (
      <div className="cards1">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="details">
          <div className="left-details">
            <h2>{restaurant.name}</h2>
            <p style={{ color: "#0d38c4" }}>{restaurant.place}</p>
            <ul>
              {restaurant.features?.map((feat, i) => (
                <li key={i}>✓ {feat}</li>
              ))}
            </ul>
            <p>
              <i>Type:</i> {restaurant.type}
            </p>
          </div>
          <div className="right-details">
            <p>
              Rating: <span>{restaurant.rating}</span>
            </p>
            <p className="available">
              <i className="fa-solid fa-map-pin"></i>{" "}
              {restaurant.open ? "Open now" : "Closed"}
            </p>
            <button
              onClick={() =>
                navigate("/restaurantdetailspage", { state: { restaurant } })
              }
            >
              Book Table
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {filtered.length > 0 ? (
        filtered.map((restaurant, index) => (
          <Card key={index} restaurant={restaurant} />
        ))
      ) : (
        <p
          style={{ textAlign: "center", marginTop: "2rem", fontWeight: "bold" }}
        >
          No restaurants match the selected criteria.
        </p>
      )}
    </>
  );
};

export default RestaurantCard;
