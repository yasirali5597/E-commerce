// import { useSelector } from "react-redux";

// const Cart = () => {
//   const cartItems = useSelector((state) => state.cart.cart);

//   return (
//     <div>
//       <h1>Cart Items</h1>

//       {cartItems.length === 0 ? (
//         <p>Cart is Empty</p>
//       ) : (
//         cartItems.map((item) => (
//           <div key={item.id} className="border p-3 mb-2">
//             <img src={item.img} alt={item.name} width="100" />
//             <h2>{item.name}</h2>
//             <p>₹{item.price}</p>
//             <p>Qty: {item.qty}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Cart;


import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  const handleToast=()=>{
    // toast.info("please go add to Cart Icon")
    toast.info("Please go to the Dashboard and click the Cart icon to place your order.");
  }

  return (
    
    <div className="min-h-screen bg-black ">
      <div className="w-full mx-auto">
      <Navbar/>
        <h1 className="text-3xl font-bold text-center mb-8 mt-4 text-white p-1">
          Shopping Cart 🛒
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-black  rounded-xl shadow-md p-10 text-center ">
            <h2 className="text-2xl font-semibold text-gray-700">
              Your Cart is Empty <span>{"  " }</span>!
            </h2>
            <p className="text-white mt-4">
              Your cart is waiting. Add some products and enjoy shopping.
            </p>
          </div>
        ) : (
          <div className="space-y-4 p-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center gap-4 hover:shadow-lg transition border border-emerald-700"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-bold text-white">
                    {item.name}
                  </h2>

                  <p className="text-green-600 font-semibold text-lg mt-2">
                    ₹{item.price}
                  </p>

                  <p className="text-gray-500 mt-1">
                    Quantity: {item.qty}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <p className="font-bold text-lg">
                    ₹{item.price * item.qty}
                  </p>

                  {/* <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                    Remove
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="bg-black rounded-xl shadow-md p-6 mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Total</h2>
              <div className="w-[400px] border border-gray-400 "></div>

              <h2 className="text-2xl font-bold text-green-600">
                ₹
                {cartItems.reduce(
                  (total, item) => total + item.price * item.qty,
                  0
                )}
              </h2>
            </div>

            <button 
            onClick={handleToast}
            className="w-full mt-4 bg-gray-600 hover:bg-gray-800 text-black py-3 rounded-lg font-semibold transition border ">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;