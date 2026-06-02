// import React, { useState } from "react";
// import ItemCart from "./ItemCard.jsx";
// import { FaWindowClose } from "react-icons/fa";
// import { FaShoppingCart } from "react-icons/fa";
// // import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import { FaShoppingCart } from "react-icons/fa";
// import { useSelector } from "react-redux";

// const Cart = () => {

// import { useSelector } from "react-redux";

// const cart = useSelector((state) => state.cart.cart);

// // const totalQty = cart.reduce(
// //   (total, item) => total + item.qty,
// //   0
// // );


//   const [activeCart, setActiveCart] = useState(false);
//   const cartItems = useSelector((state) => state.cart.cart);
//   const totalQty=cartItems.reduce((total,item)=>total+item.qty,0);
//   const totalAmount=cartItems.reduce((total,item)=>total+item.qty*item.price,0);
//   const navigate = useNavigate();



//   return (
//     <>
//       <div
//         className={`fixed right-0 top-0 w-full sm:w-[80vw] md:w-[50vw] lg:w-[20vw] h-full p-5 bg-black shadow-lg z-50 ${
//           activeCart ? "translate-x-0" : "translate-x-full"
//         } transition-all duration-500 z-50`}
//       >
//         <div className="flex justify-between items-center my-3  ">
//           <span className="text-lg md:text-xl font-bold text-gray-100">
//             My Order ! 
//           </span>
//           <FaWindowClose
//             onClick={() => {
//               setActiveCart(!activeCart);
//             }}
//             className="ml-auto text-2xl cursor-pointer p-1 rounded-md  border transition-colors text-white "
//           />
//         </div>
//         {cartItems.length>0? cartItems.map((food) => {
//           return (
//             <ItemCart
//               key={food.id}
//               id={food.id}
//               name={food.name}
//               price={food.price}
//               img={food.img}
//               qty={food.qty}
//             />
//           );
//           m;
//         }):<h2 className="text-center text-xl font-bold text-gray-100">Your cart is empty!</h2>}

//          {/* Cart items and content go here */}
//         <div className="absolute bottom-0 ">
//           <h3 className="font-semibold text-gray-100">Items :{totalQty}</h3>
//           <h3 className="font-semibold text-gray-100">Total Amount :{totalAmount}</h3>
//           <hr className="w-[90vw] lg:w-[18vw] my-2" />
//           <button onClick={()=> navigate("/success")} className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-[90vw] lg:w-[18vw] mb-5">
//             Checkout
//           </button>
//         </div>
//       </div>
//       {/* <FaShoppingCart
//         onClick={() => {
//           setActiveCart(!activeCart);
//         }}
//         className={`rounded-full bg-black text-white  shadow-md text-5xl p-3 fixed bottom-4 right-4 ${totalQty>0 && "animate-bounce delay-500 transition-all"}`}
//       /> */}

//       <div className="fixed bottom-4 right-4">
//   <FaShoppingCart
//     onClick={() => setActiveCart(!activeCart)}
//     className={`rounded-full bg-black text-white shadow-md text-5xl p-3 cursor-pointer
//       ${totalQty > 0 ? "animate-bounce" : ""}`}
//   />

//   {totalQty > 0 && (
//     <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
//       {totalQty}
//     </span>
//   )}
// </div>
    
//     </>
//   );
// };

// export default Cart;









import React, { useState } from "react";
import ItemCart from "./ItemCard.jsx";
import { FaWindowClose } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Cart = () => {

// const cartItems = useSelector((state) => state.cart.cart);

// const totalQty = cartItems.reduce(
//   (total, item) => total + (item.qty || 0),
//   0
// );

// const totalAmount = cartItems.reduce(
//   (total, item) => total + item.qty * item.price,
//   0
// );


  const [activeCart, setActiveCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const totalQty=cartItems.reduce((total,item)=>total+item.qty,0);
  const totalAmount=cartItems.reduce((total,item)=>total+item.qty*item.price,0);
  const navigate = useNavigate();



  return (
    <>
      <div
        className={`fixed right-0 top-0 w-full sm:w-[80vw] md:w-[50vw] lg:w-[20vw] h-full p-5 bg-black shadow-lg z-50 ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center my-3  ">
          <span className="text-lg md:text-xl font-bold text-gray-100">
            My Order ! 
          </span>
          <FaWindowClose
            onClick={() => {
              setActiveCart(!activeCart);
            }}
            className="ml-auto text-2xl cursor-pointer p-1 rounded-md  border transition-colors text-white "
          />
        </div>
        {cartItems.length>0? cartItems.map((food) => {
          return (
            <ItemCart
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              img={food.img}
              qty={food.qty}
            />
          );
          m;
        }):<h2 className="text-center text-xl font-bold text-gray-100">Your cart is empty!</h2>}

         {/* Cart items and content go here */}
        <div className="absolute bottom-0 ">
          <h3 className="font-semibold text-gray-100">Items :{totalQty}</h3>
          <h3 className="font-semibold text-gray-100">Total Amount :{totalAmount}</h3>
          <hr className="w-[90vw] lg:w-[18vw] my-2" />
          <button onClick={()=> navigate("/success")} className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-[90vw] lg:w-[18vw] mb-5">
            Checkout
          </button>
        </div>
      </div>
      {/* <FaShoppingCart
        onClick={() => {
          setActiveCart(!activeCart);
        }}
        className={`rounded-full bg-black text-white  shadow-md text-5xl p-3 fixed bottom-4 right-4 ${totalQty>0 && "animate-bounce delay-500 transition-all"}`}
      /> */}

      <div className="fixed bottom-4 right-4">
  <FaShoppingCart
    onClick={() => setActiveCart(!activeCart)}
    className={`rounded-full  bg-gray-600 text-white shadow-md text-5xl p-3 cursor-pointer
      ${totalQty > 0 ? "" : ""}`}
  />

  {totalQty > 0 && (
    <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
      {totalQty}
    </span>
  )}
</div>
    
    </>
  );
};

export default Cart;



// animate-bounce