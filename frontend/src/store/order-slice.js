import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    order(state, action) {
      const orderedProducts = action.payload;
      const index = state.orders.findIndex(
        (item) => item._id === orderedProducts._id
      );

      const existingOrder = state.orders[index];

      let updatedOrder;

      if (existingOrder) {
        const updatedItem = {
          ...existingOrder,
        };
        updatedOrder = [...state.orders];
        updatedOrder[index] = updatedItem;
        state.orders = updatedOrder;
      } else {
        updatedOrder = state.orders.push(orderedProducts);
      }
    },
    clearOrder(state) {
      state.orders = [];
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
