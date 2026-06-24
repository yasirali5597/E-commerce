// import { useEffect, useState } from "react";

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const data =
//       JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(data);
//   }, []);

//   return (
//     <div>
//       {wishlist.map((item) => (
//         <div key={item.id}>
//           <h2>{item.name}</h2>
//           <p>₹{item.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Wishlist;

// import { useEffect, useState } from "react";

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("wishlist")) || [];

//     setWishlist(data);
//   }, []);

//   return (
//     <div>
//       {wishlist.map((item) => (
//         <div key={item.id}>
//           <h2>{item.name}</h2>
//           <p>₹{item.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Wishlist;



// import { useEffect, useState } from "react";
// import FoodData from "../data/ProductData";

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);

  // useEffect(() => {
  //   const favoriteIds =
  //     JSON.parse(localStorage.getItem("wishlist")) || [];

  //   const wishlistProducts = FoodData.filter((item) =>
  //     favoriteIds.includes(item.id)
  //   );

  //   setWishlist(wishlistProducts);
  // }, []);


//   useEffect(() => {
//   const favoriteIds =
//     JSON.parse(localStorage.getItem("wishlist")) || [];

//   console.log("Favorite IDs:", favoriteIds);
// console.log("Type of first ID:", typeof favoriteIds[0]);
//   console.log("FoodData IDs:", FoodData.map(item => item.id));

//   const wishlistProducts = FoodData.filter((item) =>
//     favoriteIds.includes(item.id)
//   );

//   console.log("Wishlist Products:", wishlistProducts);

//   setWishlist(wishlistProducts);
// }, []);


//   return (
//     <div>
//       {wishlist.map((item) => (
//         <div key={item.id}>
//           <h2>{item.name}</h2>
//           <p>₹{item.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Wishlist;



import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import Footer from "../components/footer";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const removefromWishlist=(id)=>{
    toast.error("Item deleted");
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const updatedWishlist = wishlist.filter((item) => item.id !== id);

  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  console.log(JSON.parse(localStorage.getItem("wishlist")));
  console.log("After:", updatedWishlist);
    setWishlist(updatedWishlist);
  }

  useEffect(() => {
  const loadWishlist = () => {
    const data =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  };

  loadWishlist();

  window.addEventListener("wishlistUpdated", loadWishlist);

  return () => {
    window.removeEventListener(
      "wishlistUpdated",
      loadWishlist
    );
  };
}, []);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    console.log("Wishlist Data:", data);

    setWishlist(data);
  }, []);

  return (
    <div className="bg-black">
    <Navbar/>
      <div className=" bg-black  ">
      <h1 className="text-3xl font-bold mb-8 text-white mt-5">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  {wishlist.length === 0 ? (
    <p className="text-red-600 font-bold  text-xl ">No items in wishlist</p>
  ) : (
    wishlist.map((item) => (
      <div
        key={item.id}
        className="bg-gray-700 shadow-md rounded-lg p-4 border hover:shadow-lg transition"
      >
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-40 object-cover rounded-md"
        />

        <h2 className="text-lg font-semibold mt-3">
          {item.name}
        </h2>
        <p className="text-sm ml-1 mt-3 mb-4">{item.desc}</p>

        <p className="text-green-600 font-bold mt-2">
          ₹{item.price}
        </p>

        <button
        onClick={() => removefromWishlist(item.id)}
         className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Remove
        </button>
      </div>
    ))
  )}
</div>

    <div className="border-b "></div>
    </div>
    <Footer/>
    </div>
  );
};

export default Wishlist;