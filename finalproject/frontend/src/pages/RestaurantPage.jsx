// App.js converted to RestaurantPage.jsx:-

import { useState } from "react";
import Filters from "../components/Restaurant/Filters";
import RestaurantCard from "../components/Restaurant/RestaurantCard";

// import Menu from "./Menu";
import "../components/Restaurant/RestaurantPage.css";
import Navbar from "../components/Navbar/Navbar";

const RestaurantPage = () => {
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [sortOption, setSortOption] = useState("featured");
  const [filters, setFilters] = useState({});

  const updateRestaurantCount = (count) => {
    setRestaurantCount(count);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const values = prev[category] || [];
      const newValues = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];

      const updated = { ...prev, [category]: newValues };

      if (newValues.length === 0) {
        delete updated[category];
      }

      return updated;
    });
  };

  return (
    <>
      <Navbar />
      <main>
        <Filters
          selectedFilters={filters}
          onFilterChange={handleFilterChange}
        />
        <div className="main-content">
          <h1>
            Top Restaurants in <i>India</i>
          </h1>
          <div className="type">
            <p>Number of results: {restaurantCount}</p>
            <p>
              <label htmlFor="sort-select">Sort by: </label>
              <select
                id="sort-select"
                name="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="rating">Rating</option>
              </select>
            </p>
          </div>
          <RestaurantCard
            updateRestaurantCount={updateRestaurantCount}
            sortOption={sortOption}
            filters={filters}
          />
        </div>
      </main>
    </>
  );
};

export default RestaurantPage;
