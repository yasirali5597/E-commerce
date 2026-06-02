import React, { useEffect, useState, useRef } from "react";
import FoodData from "../data/FoodData.js";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices/CategorySlice.jsx";

const CategoryMenu = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);

  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.category);

  // Generate unique categories with count
  const listUniqueCategories = () => {
    const categoryMap = new Map();
    FoodData.forEach((food) => {
      const cat = food.category;
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
    });
    setCategories(Array.from(categoryMap.entries())); // [ [category, count], ... ]
  };

  // Scroll to selected category smoothly
  useEffect(() => {
    if (scrollRef.current) {
      const activeBtn = scrollRef.current.querySelector(".active-category");
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    listUniqueCategories();
  }, []);

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    onCategorySelect?.(category);
  };

  const handleClear = () => {
    ``;
    dispatch(setCategory("All"));
    setSearchTerm("");
  };

  return (
    <div className="w-full sticky top-0 bg-black z-10 pb-3">
      {/* Heading */}
      <h3 className="text-xl font-semibold mt-2 px-4 text-emerald-500">
        Discover Amazing Products 🛍️
      </h3>

      {/* Category List */}
      <div
        ref={scrollRef}
        className="px-4 my-5 flex gap-3 overflow-x-auto scroll-smooth py-2 scrollbar-hide"
      >
        {/* All Button */}
        <button
          onClick={handleClear}
          className={`px-4 py-2 font-bold rounded-lg whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
            selectedCategory === "All"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black hover:bg-green-500 hover:text-white"
          }`}
        >
          All
        </button>

        {/* Categories */}
        {categories
          .filter(([category]) =>
            category.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(([category, count], index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 font-bold rounded-lg whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                selectedCategory === category
                  ? "bg-green-500 text-white"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              {category}

              <span
                className={`ml-1 text-xs ${
                  selectedCategory === category
                    ? "text-green-100"
                    : "text-gray-300"
                }`}
              >
                ({count})
              </span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default CategoryMenu;