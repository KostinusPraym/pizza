import React from "react";
import { useDispatch } from "react-redux";

import styles from "../styles/CartItem.module.scss";
import { addOrder, removeOrder, clearOrder } from "../redux/slices/cartSlice";
import {CartItem__TYPE} from "../types/types"
type CartItemProps = CartItem__TYPE

const CartItem: React.FC<CartItemProps> = ({
  id,
  dough,
  title,
  imageUrl,
  price,
  size,
  amount,
  selectedOptions,
}) => {

  const dispatch = useDispatch();
  const order = {
    title,
    imageUrl,
    id,
    price,
    dough,
    size,
    amount,
    selectedOptions,
  }

  const onClickPlus = () => {
    dispatch(addOrder(order));
  };

  const onClickMinus = () => {
    dispatch(removeOrder(order));
  };

  const onClickClearOrder = () => {
    dispatch(clearOrder(order));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.orderDetails}>
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <span>
            {dough}, {size}см.
          </span>
          <div>
            {selectedOptions.map((item) => (
              <p key={item.id} className={styles.options}>
                {item.title},{" "}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.orderAmount}>
        <button disabled={order.amount === 1} onClick={onClickMinus} className={styles.btnMinus}></button>
        <p>{amount}</p>
        <button  onClick={onClickPlus} className={styles.btnPlus}></button>
      </div>
      <div className={styles.orderPrice}>{price * amount} руб.</div>
      <img
      className={styles.removeOrder}
        style={{ cursor: "pointer" }}
        onClick={onClickClearOrder}
        src="/images/icons/remove.svg"
        alt="remove"
      />
    </div>
  );
};

export default CartItem;
