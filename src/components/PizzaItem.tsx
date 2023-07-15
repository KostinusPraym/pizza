import React from "react";
import styles from "../styles/PizzaItem.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, cartSelector } from "../redux/slices/cartSlice";
import { pizzaSelector } from "../redux/slices/pizzaSlice";
import { useLocation } from "react-router-dom";
import { PizzaItem_TYPE, CartItem__TYPE } from "../types/types";

type PizzaItemProps = PizzaItem_TYPE;

const PizzaItem: React.FC<PizzaItemProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
  selectedOptions = [],
}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { doughArr } = useSelector(pizzaSelector);
  const { cartItems } = useSelector(cartSelector);
  const [pricePizza, setPricePizza] = React.useState(price);
  const [optionsSectionOne, setOptionsSectionOne] = React.useState(types[0]);
  const [optionsSectionTwo, setOptionsSectionTwo] = React.useState(sizes[0]);

  const optionsPrice = selectedOptions.reduce(
    (sum, curr) => sum + curr.price,
    0
  );

  const amountOrders = cartItems
    .filter((item: CartItem__TYPE) => item.id === id)
    .reduce((sum: number, curr: CartItem__TYPE) => sum + curr.amount, 0);

  const clickForSelectSize = (index: number) => {
    setOptionsSectionTwo(sizes[index]);
    setPrice(index);
  };

  const setPrice = (index: number) => {
    switch (index) {
      case 0:
        return setPricePizza(price);
      case 1:
        return setPricePizza(price + 100);
      case 2:
        return setPricePizza(price + 230);
      case 3:
        return setPricePizza(price + 370);
    }
  };

  const addInCart = () => {
    if (pathname !== "/") {
      const order = {
        title,
        imageUrl,
        id,
        price: pricePizza + optionsPrice,
        dough: doughArr[optionsSectionOne],
        size: optionsSectionTwo,
        amount: 1,
        selectedOptions,
      };
      dispatch(addOrder(order));
    }
  };

  return (
    <>
      <div className={styles.pizzaItem}>
        <img width={290} height={290} src={imageUrl} alt="pizza" />
        <p className={styles.name}>{title}</p>
        <div className={styles.optionsBlock}>
          <div className={styles.optionsSection}>
            {types.map((item, index) => {
              return (
                <span
                  key={`${id}${item}`}
                  onClick={() => setOptionsSectionOne(types[index])}
                  className={`${styles.options} ${
                    optionsSectionOne === item ? styles.active : ""
                  } `}
                >
                  {doughArr[item]}
                </span>
              );
            })}
          </div>
          <div className={styles.optionsSection}>
            {sizes.map((item, index) => {
              return (
                <span
                  key={`${id}${item}`}
                  onClick={() => clickForSelectSize(index)}
                  className={`${styles.options} ${
                    optionsSectionTwo === item ? styles.active : ""
                  } `}
                >
                  {`${item} см`}
                </span>
              );
            })}
          </div>
        </div>
        <div className={styles.submitRow}>
          <span className={styles.price}>
            от {pricePizza + optionsPrice} руб.
          </span>
          <div onClick={addInCart} className={styles.buttonContainer}>
            <button className={styles.addButton}>Добавить</button>
            <svg
              className={styles.cross}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="#EB5A1E"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" />
            </svg>

            {amountOrders ? (
              <span className={styles.counterOrder}>{amountOrders}</span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PizzaItem;
