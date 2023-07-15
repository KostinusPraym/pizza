import React from "react";
import { Link } from "react-router-dom";
import { CartEmpty_TYPE} from "../types/types";

import styles from "../styles/CartEmpty.module.scss";
type CartEmptyProps= CartEmpty_TYPE

const CartEmpty: React.FC<CartEmptyProps> = ({ queryString }) => {
  return (
    <>
      <div className={styles.emptyCart}>
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу. <br /> Для того, чтобы
          заказать пиццу, перейди на главную страницу.
        </p>
        <img
          width={300}
          height={255}
          src="/images/emptyCart.png"
          alt="Empty cart"
        />
        <Link to={`/?${queryString}`}>
          Вернуться назад
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
