
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FoodCard = ({ id, name, price, desc, img, rating, handletoast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);

  //  Fixed: Renamed and used the correct function name
  const handleOrderNow = () => {
    dispatch(addToCart({ id, name, price, img, rating, qty: 1 }));
    handletoast(`Order placed for ${name}`);
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    
    // Redirect to checkout page
    navigate("/checkout");
  };
}

  return (
    <div className="p-3 flex flex-col  rounded-lg shadow-xl hover:shadow-xl transition-shadow duration-300 w-full sm:w-[250px] bg-gray-700">
      <div className="w-full h-[150px] flex justify-center items-center overflow-hidden">
        <img
          src={img}
          alt="Products"
          className="w-auto h-full object-contain hover:scale-110 cursor-grab transition-transform duration-500 ease-in-out"
        />
      </div>

      <div className="text-sm flex justify-between items-center mt-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className="text-green-500 text-sm">₹{price}</span>
      </div>

      <div className="my-2">
        <p className="text-sm font-normal text-gray-300 ">
          {desc.slice(0, 30)}<span className="mr-3 text-xs cursor-pointer hover:text-black font-serif font-bold ">Details...</span>
        </p>
      </div>

      <div className="flex justify-between items-center mt-3">
        <span className="flex items-center">
          <AiFillStar className="mr-1 text-yellow-300" />
          <span className="text-sm">{rating}</span>
        </span>
         
      </div>

      {/* Buttons Section */}
      <div className="mt-3 flex justify-between gap-2">
        <button
          onClick={() => {
            dispatch(addToCart({ id, name, price, img, rating, qty: 1 }));
            handletoast(name);
          }}
          className="flex-1 p-2 text-sm font-semibold text-white bg-gray-600 hover:bg-green-600 rounded-lg transition-colors"
        >
          Add to Cart...
        </button>
        <button
          onClick={handleOrderNow}
          className="flex-1 p-2 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
