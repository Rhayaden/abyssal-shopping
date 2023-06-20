import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    myItems: [],
  },
  reducers: {
    addProduct(state, action) {
      const product = action.payload;

      const index = state.items.findIndex((item) => item._id === product._id);

      const existingItem = state.items[index];

      let updatedState;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
        };
        updatedState = [...state.items];
        updatedState[index] = updatedItem;
        state.items = updatedState;
      } else {
        updatedState = state.items.push(product);
      }
    },
    addMyProduct(state, action) {
      const product = action.payload;

      const index = state.myItems.findIndex((item) => item._id === product._id);

      const existingItem = state.myItems[index];

      let updatedState;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
        };
        updatedState = [...state.myItems];
        updatedState[index] = updatedItem;

        state.myItems = updatedState;
      } else {
        updatedState = state.myItems.push(product);
      }
    },
    editProduct(state, action) {
      const editProduct = action.payload;

      const index = state.items.findIndex(
        (item) => item._id === editProduct._id
      );
      const myIndex = state.myItems.findIndex(
        (item) => item._id === editProduct._id
      );

      let updatedList;
      let myUpdatedList;

      const updatedItem = {
        ...editProduct,
      };

      updatedList = [...state.items];
      myUpdatedList = [...state.myItems];

      updatedList[index] = updatedItem;
      myUpdatedList[myIndex] = updatedItem;

      state.items = updatedList;
      state.myItems = myUpdatedList;
    },
    deleteProduct(state, action) {
      const id = action.payload;
      state.myItems = state.myItems.filter((item) => item._id !== id);
      state.items = state.items.filter((item) => item._id !== id);
    },
    clearList(state) {
      state.items = [];
    },
    clearMyList(state) {
      state.myItems = [];
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
