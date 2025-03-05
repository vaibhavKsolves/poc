import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import the cart reducer

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add the cart slice to the store
  },
});

export default store;
