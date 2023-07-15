import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem__TYPE } from "../../types/types";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { sortSelectedOptionsFn } from "../../utils/sortSelectedOptionsFn";

interface cartSliceState {
  cartItems: CartItem__TYPE[];
  orderIsSant: boolean;
}

const initialState: cartSliceState = {
  cartItems: getCartFromLS(),
  orderIsSant: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<CartItem__TYPE>) {
      const sortStr = sortSelectedOptionsFn(action.payload.selectedOptions);
      const sameObj = state.cartItems.find((item) => {
        const cartSortStr = item.selectedOptions
          .map((item) => item.id)
          .sort((a, b) => a - b)
          .join("");

        return (
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.dough === action.payload.dough &&
          sortStr === cartSortStr
        );
      });

      if (!sameObj) state.cartItems.push(action.payload);
      else sameObj.amount++;
    },
    removeOrder(state, action: PayloadAction<CartItem__TYPE>) {
      const sortStr = sortSelectedOptionsFn(action.payload.selectedOptions);

      const sameObj = state.cartItems.find((item) => {
        const cartSortStr = item.selectedOptions
          .map((item) => item.id)
          .sort((a, b) => a - b)
          .join("");

        return (
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.dough === action.payload.dough &&
          sortStr === cartSortStr
        );
      });

      if (sameObj) sameObj.amount--;
    },
    clearOrder(state, action: PayloadAction<CartItem__TYPE>) {
      const sortStr = sortSelectedOptionsFn(action.payload.selectedOptions);

      state.cartItems = state.cartItems.filter((item) => {
        const cartSortStr = item.selectedOptions
          .map((item) => item.id)
          .sort((a, b) => a - b)
          .join("");

        return !(
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.dough === action.payload.dough &&
          sortStr === cartSortStr
        );
      });
    },
    clearCart(state) {
      state.cartItems = [];
    },
    sendOrder(state) {
      state.cartItems = [];
      state.orderIsSant = true
    }
  },
});

export const cartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
export const { addOrder, removeOrder, clearOrder, clearCart, sendOrder } =
  cartSlice.actions;
