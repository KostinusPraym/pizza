import { CartItem__TYPE } from "../types/types";

export const totalPrice = (item: CartItem__TYPE[]) => {
  const totalPrice = item.reduce(
    (sum: number, curr: CartItem__TYPE) => curr.price * curr.amount + sum,
    0
  );
  return totalPrice;
};
