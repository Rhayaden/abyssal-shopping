import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product-slice";
import cartSlice from "./cart-slice";
import orderSlice from "./order-slice";
import profileSlice from "./profile-slice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;
