import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const FilterByCategory = ({ setListProduct }) => {
  const cookies = new Cookies();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
  };

  async function handleData(category) {
    await axios.get("http://localhost:8080/api/categoria/" + category, { headers }).then((response) => {
      if (response.status === 200) {
        setListProduct(response.data);
      }
    });
  }

  function handleChange(event) {
    setSelectedCategory(event.target.value);
    handleData(event.target.value);
  }

  useEffect(() => {
    async function handleCategories() {
      await axios.get("http://localhost:8080/api/categorias", { headers }).then((response) => {
        if (response.status === 200) {
          setUniqueCategories(response.data);
        }
      });
    }
    handleCategories();
  }, []);

  return (
    <div className="categoryFilter">
      <label htmlFor="category" className="me-3">
        Filter by category
      </label>
      <select value={selectedCategory} onChange={handleChange}>
        <option value="all">All</option>
        {uniqueCategories.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterByCategory;
