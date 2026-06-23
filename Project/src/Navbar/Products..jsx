import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import FoodCard from "../components/Card.jsx";
import FoodData from "../data/ProductData.js";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/CategorySlice";
import { setSearch } from "../redux/slices/SearchSlice";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import ItemCart from "../components/ItemCard.jsx";



const ITEMS_PER_PAGE = 100;

const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Product = () => {
      const cartItems = useSelector((state) => state.cart.cart);
    
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [shuffleSeed, setShuffleSeed] = useState(0); // 👈 triggers re-shuffle

  const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);


  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

//   useEffect( () =>{
//     // toast.success("Here is show the all Products");
//     toast.success("Welcome to Product Page 🛍️");
//   })

    const toastShown = useRef(false); 
    useEffect(()=>{
        if(!toastShown.current) {
            toast.success("Welcome to Products Page " );
            // toast.info("Here are all the products");
            toastShown.current=true;
        }
    },[]);

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
  }, [category, search, sortBy, shuffleSeed]); // 👈 shuffle cards  in deps

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
    setShuffleSeed(0); // 👈 reset shuffle on clear too yes
  };

  return (
    <>
      {/*   this is a toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      {/* Food Items Grid */}
      <h1 className="bg-black  p-3 text-emerald-700">Here is show all the products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 p-5 bg-black">
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
      <div className="border-b border-gray-300"><Footer/></div>
       
      

     
    </>
  );
};

export default Product;
