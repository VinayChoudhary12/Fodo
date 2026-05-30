import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",

  initialState: [],

  reducers: {
    AddItem: (state, action) => {
      const existItem = state.find(
        (item) => item.id === action.payload.id
      );

      if (existItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      state.push(action.payload);
    },

    RemoveItem: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },

    IncrementQuantity: (state, action) => {
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    },

    decrementQuantity: (state, action) => {
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      );
    },
  },
});

export const {
  AddItem,
  RemoveItem,
  IncrementQuantity,
  decrementQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;