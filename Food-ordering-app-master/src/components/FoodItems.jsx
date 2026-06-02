// import React, { useState, useMemo } from "react";
// import FoodCard from "./FoodCard";
// import FoodData from "../data/FoodData.js";
// import toast, { Toaster } from "react-hot-toast";
// import { useSelector, useDispatch } from "react-redux";
// import { setCategory } from "../redux/slices/CategorySlice";
// import { setSearch } from "../redux/slices/SearchSlice";

// const ITEMS_PER_PAGE = 8;

// const FoodItems = () => {
//   const dispatch = useDispatch();
//   const category = useSelector((state) => state.category.category);
//   const search = useSelector((state) => state.search.search);
//   const [sortBy, setSortBy] = useState("");
//   const [page, setPage] = useState(1);

//   // Favorites stored in local state (you can extend to redux/localStorage)
//   const [favorites, setFavorites] = useState(() => {
//     // Load from localStorage or start empty
//     const saved = localStorage.getItem("favorites");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Toggle favorite handler
//   const toggleFavorite = (id) => {
//     setFavorites((prev) => {
//       const isFav = prev.includes(id);
//       const newFavs = isFav ? prev.filter((fid) => fid !== id) : [...prev, id];
//       localStorage.setItem("favorites", JSON.stringify(newFavs)); // persist favorites
//       return newFavs;
//     });
//   };

//   const handleToast = (name) => {
//     toast.success(`${name} added to cart successfully!`, {
//       position: "top-center",
//       duration: 2000,
//     });
//   };

//   // useMemo to avoid recalculating on every render
//   const filteredAndSortedFood = useMemo(() => {
//     let filteredFood = FoodData.filter((food) => {
//       if (category === "All") {
//         return food.name.toLowerCase().includes(search.toLowerCase());
//       } else {
//         return (
//           category === food.category &&
//           food.name.toLowerCase().includes(search.toLowerCase())
//         );
//       }
//     });

//     if (sortBy === "price-asc") {
//       filteredFood.sort((a, b) => a.price - b.price);
//     } else if (sortBy === "price-desc") {
//       filteredFood.sort((a, b) => b.price - a.price);
//     } else if (sortBy === "rating-desc") {
//       filteredFood.sort((a, b) => b.rating - a.rating);
//     }

//     return filteredFood;
//   }, [category, search, sortBy]);

//   // Pagination logic
//   const pageCount = Math.ceil(filteredAndSortedFood.length / ITEMS_PER_PAGE);
//   const currentPageItems = filteredAndSortedFood.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE,
//   );

//   const clearFilters = () => {
//     dispatch(setCategory("All"));
//     dispatch(setSearch(""));
//     setSortBy("");
//     setPage(1);
//   };

//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />

//       {/* Controls */}
//       <div className="flex flex-col sm:flex-row justify-between items-center p-5 gap-4">
//         <select
//           value={sortBy}
//           onChange={(e) => {
//             setSortBy(e.target.value);
//             setPage(1);
//           }}
//           className="p-2 border rounded-md shadow-md"
//           aria-label="Sort food items"
//         >
//           <option value="">Sort By</option>
//           <option value="price-asc">Price: Low to High</option>
//           <option value="price-desc">Price: High to Low</option>
//           <option value="rating-desc">Rating: High to Low</option>
//         </select>

//         <button
//           onClick={clearFilters}
//           className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-800 transition-colors"
//           aria-label="Clear all filters"
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* Item count */}
//       <div className="px-5 text-gray-700 font-semibold mb-2">
//         Showing {filteredAndSortedFood.length} item
//         {filteredAndSortedFood.length !== 1 ? "s" : ""}
//       </div>

//       {/* Food Items Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-5">
//         {currentPageItems.length > 0 ? (
//           currentPageItems.map((food) => (
//             <div
//               key={food.id}
//               className="transform hover:scale-105 transition-transform duration-300 relative"
//             >
//               <FoodCard
//                 id={food.id}
//                 name={food.name}
//                 price={food.price}
//                 img={food.img}
//                 desc={food.desc}
//                 rating={food.rating}
//                 handleToast={handleToast}
//               />
//               {/* Favorite toggle button */}
//               <button
//                 onClick={() => toggleFavorite(food.id)}
//                 className={`absolute top-2 right-2 text-2xl ${
//                   favorites.includes(food.id) ? "text-red-500" : "text-gray-300"
//                 } hover:text-red-600 transition-colors`}
//                 aria-label={
//                   favorites.includes(food.id)
//                     ? "Remove from favorites"
//                     : "Add to favorites"
//                 }
//               >
//                 ❤
//               </button>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full flex flex-col items-center justify-center mt-10">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-20 w-20 text-gray-700 mb-4 animate-pulse"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9 14l2-2 4 4m6-6a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <h2 className="text-xl font-semibold text-gray-800">
//               No items found matching your criteria.
//             </h2>
//           </div>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {pageCount > 1 && (
//         <div className="flex justify-center gap-3 my-5">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           {[...Array(pageCount)].map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setPage(idx + 1)}
//               className={`px-3 py-1 rounded ${
//                 page === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               {idx + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
//             disabled={page === pageCount}
//             className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default FoodItems;






import React, { useState, useMemo, useCallback } from "react";
import FoodCard from "./FoodCard";
import FoodData from "../data/FoodData.js";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/CategorySlice";
import { setSearch } from "../redux/slices/SearchSlice";

const ITEMS_PER_PAGE = 8;

// Fisher-Yates shuffle — returns a new shuffled array
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FoodItems = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [shuffleSeed, setShuffleSeed] = useState(0); // 👈 triggers re-shuffle

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      const newFavs = isFav ? prev.filter((fid) => fid !== id) : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const handleToast = (name) => {
    toast.success(`${name} added to cart successfully!`, {
      position: "top-center",
      duration: 2000,
    });
  };

  // 👇 Refresh handler — ye button se refresh ho raha hai 
   
  // const handleRefresh = useCallback(() => {
  //   setShuffleSeed((prev) => prev + 1);
  //   setPage(1);
  // }, []);

  const filteredAndSortedFood = useMemo(() => {
    let filteredFood = FoodData.filter((food) => {
      if (category === "All") {
        return food.name.toLowerCase().includes(search.toLowerCase());
      } else {
        return (
          category === food.category &&
          food.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    });

    // 👇 Shuffle first, then sort (sort overrides shuffle if selected)
    filteredFood = shuffleArray(filteredFood);

    if (sortBy === "price-asc") {
      filteredFood.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filteredFood.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      filteredFood.sort((a, b) => b.rating - a.rating);
    }

    return filteredFood;
  }, [category, search, sortBy, shuffleSeed]); // 👈 shuffleSeed in deps

  const pageCount = Math.ceil(filteredAndSortedFood.length / ITEMS_PER_PAGE);
  const currentPageItems = filteredAndSortedFood.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const clearFilters = () => {
    dispatch(setCategory("All"));
    dispatch(setSearch(""));
    setSortBy("");
    setPage(1);
    setShuffleSeed(0); // 👈 reset shuffle on clear too
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-5 gap-4 bg-black">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
          className="p-2  rounded-md shadow-md bg-gray-500 font-bold "
          aria-label="Sort food items"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>

        <div className="flex gap-3">
          {/* 👇 Refresh Button */}
          {/* <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-700 transition-colors flex items-center gap-2"
            aria-label="Shuffle food items"
          >
            🔀 Refresh
          </button> */}

          <button
            onClick={clearFilters}
            className="py-2 text-xs px-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-800 transition-colors"
            aria-label="Clear all filters"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Item count */}
      <div className="px-5 text-gray-700 font-semibold mb-2 bg-black ">
        Showing {filteredAndSortedFood.length} item
        {filteredAndSortedFood.length !== 1 ? "s" : ""}
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-5 bg-black">
        {currentPageItems.length > 0 ? (
          currentPageItems.map((food) => (
            <div
              key={food.id}
              className="transform hover:scale-105 transition-transform duration-300 relative"
            >
              <FoodCard
                id={food.id}
                name={food.name}
                price={food.price}
                img={food.img}
                desc={food.desc}
                rating={food.rating}
                handleToast={handleToast}
              />
              <button
                onClick={() => toggleFavorite(food.id)}
                className={`absolute top-2 right-2 text-2xl ${
                  favorites.includes(food.id) ? "text-red-500" : "text-gray-300"
                } hover:text-red-600 transition-colors`}
                aria-label={
                  favorites.includes(food.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                ❤
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center mt-10 bg-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-700 mb-4 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 14l2-2 4 4m6-6a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800">
              No items found matching your criteria.
            </h2>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center gap-3 my-5 bg-black ">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(pageCount)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                page === idx + 1 ? "bg-blue-500 text-white" : "bg-black text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default FoodItems;