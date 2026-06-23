import { createSlice } from "@reduxjs/toolkit";
import { SiQt } from "react-icons/si";

const CreateSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    orders:[],
    wishlist: [],
  },
  reducers: {
    // addToCart: (state, action) => {
    //   const existingItem = state.cart.find(
    //     (item) => item.id === action.payload.id
    //   );
    //   if (existingItem) {
    //     state.cart = state.cart.map((item) =>
    //       item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
    //     );
    //   } else {
    //     state.cart.push(action.payload);
    //   }
    // },
    addToWishlist: (state, action) => {
  const exists = state.wishlist.find(
    (item) => item.id === action.payload.id
  );

  if (!exists) {
    state.wishlist.push(action.payload);
  }
},

removeFromWishlist: (state, action) => {
  state.wishlist = state.wishlist.filter(
    (item) => item.id !== action.payload.id
  );
},

    addToCart: (state, action) => {
  const existingItem = state.cart.find(
    (item) => item.id === action.payload.id
  );

  if (existingItem) {
    state.cart = state.cart.map((item) =>
      item.id === action.payload.id
        ? { ...item, qty: item.qty + 1 }
        : item
    );
  } else {
    state.cart.push({
      ...action.payload,
      qty: 1,
    });
  }
},
placeOrder: (state, action) => {
  state.orders.push({
    ...action.payload,
    qty: 1,
  });
},
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id != action.payload.id);
    },
    incrementQty: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
    },
    decrementQty: (state, action) => {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id && item.qty > 1
           ? {...item, qty: item.qty - 1 }
            : item
        );
    },
     clearCart: (state) => {
      state.cart = [];
    },
  },
});
export const { addToCart,placeOrder,addToWishlist, removeFromCart,incrementQty,decrementQty , clearCart} = CreateSlice.actions;
export default CreateSlice.reducer;
