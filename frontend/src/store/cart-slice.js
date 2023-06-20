import { createSlice } from "@reduxjs/toolkit";
import { clearCart } from "../util/clear-cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    hasEnoughStock: true,
    prodQuantity: 1,
  },
  reducers: {
    addToCart(state, action) {
      const cartItem = action.payload;

      const updatedTotal = state.total + cartItem.price * cartItem.quantity;

      const index = state.items.findIndex((item) => item._id === cartItem._id);

      const existingItem = state.items[index];

      let updatedCart;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + cartItem.quantity,
        };
        updatedCart = [...state.items];
        updatedCart[index] = updatedItem;
        state.items = updatedCart;
        state.total = updatedTotal;
      } else {
        updatedCart = state.items.push(cartItem);
        state.total = updatedTotal;
      }
    },
    multipleQty(state, action) {
      const cartItem = action.payload;

      const index = state.items.findIndex((item) => item._id === cartItem._id);

      let updatedList;

      const updatedItem = {
        ...cartItem,
      };

      updatedList = [...state.items];

      updatedList[index] = updatedItem;

      state.items = updatedList;

      const totalList = state.items.map((item) => item.price * item.quantity);
      const updatedTotal = totalList.reduce((a, b) => {
        return a + b;
      });

      state.total = updatedTotal;
    },
    updateCart(state, action) {
      const updateCartProduct = action.payload;

      const index = state.items.findIndex(
        (item) => item._id === updateCartProduct._id
      );

      const selectedItemQty = state.items[index].quantity;

      let updatedList;

      const updatedItem = {
        ...updateCartProduct,
        quantity: selectedItemQty,
      };

      updatedList = [...state.items];
      updatedList[index] = updatedItem;

      state.items = updatedList;

      const itemPrices = state.items.map((item) => item.price * item.quantity);
      const newTotal = itemPrices.reduce((a, b) => +a + +b);

      state.total = newTotal;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id === id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotal = state.total - existingItem.price;
      let updatedItems;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== id);
        state.items = [...state.items];
        state.total = updatedTotal;

        clearCart();
      } else {
        existingItem.quantity--;
        const updatedItem = { ...existingItem, total: existingItem.total - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        state.items = updatedItems;
        state.total = updatedTotal;
      }
    },
    deleteFromCart(state, action) {
      const deletedItem = action.payload;

      const index = state.items.findIndex((item) => item._id === deletedItem);
      const existingItem = state.items[index];
      if (existingItem) {
        const updatedTotal =
          state.total - existingItem.price * existingItem.quantity;

        state.items = state.items.filter((item) => item._id !== deletedItem);
        state.total = updatedTotal;
      }
    },
    replaceCart(state, action) {
      const newCart = action.payload;
      state.items = newCart;
    },
    notEnoughStock(state) {
      state.hasEnoughStock = false;
    },
    enoughStock(state) {
      state.hasEnoughStock = true;
    },
    changeQty(state, action) {
      const qty = action.payload;
      state.prodQuantity = qty;
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;

      clearCart();
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
