import React from "react";
import "../../components/Restaurant/RestaurantPage.css";

const Filters = ({ selectedFilters, onFilterChange }) => {
  const filterOptions = {
    Place: ["Kolaghat", "Bijaywara"],
    "Restaurant type": [
      "Desi",
      "Chinese",
      "Bangali",
      "Punjabi",
      "Thali",
      "Cafe",
      "Thai",
      "Seafood",
    ],
    "Establishment type": [
      "Coffee & tea",
      "Bakeries",
      "Quick Snacks",
      "Home Delivery",
      "Thali",
      "Dessert",
      "Mocktail",
    ],
    Meals: ["Breakfast", "Brunch", "Lunch", "Dinner"],
    "Dietary restrictions": [
      "Vegetarian Friendly",
      "Vegan Options",
      "Halal",
      "Gluten-Free options",
      "Kosher",
    ],
    Open: ["Open now"],
  };

  return (
    <div className="search-criteria">
      {Object.entries(filterOptions).map(([category, options]) => (
        <div className="criteria" key={category}>
          <h4>{category}</h4>
          {options.map((option, index) => {
            const inputId = `${category}-${option}`
              .replace(/\s+/g, "-")
              .toLowerCase(); // Unique & safe ID
            return (
              <p key={option}>
                <input
                  type="checkbox"
                  id={inputId}
                  name={inputId}
                  checked={selectedFilters[category]?.includes(option) || false}
                  onChange={() => onFilterChange(category, option)}
                />{" "}
                <label htmlFor={inputId}>{option}</label>
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Filters;
