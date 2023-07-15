import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import styles from "../styles/Header.module.scss";
import { cartSelector } from "../redux/slices/cartSlice";
import { CartItem__TYPE } from "../types/types";
import { totalPrice } from "../utils/totalPrice";

const Header: React.FC = () => {
  const isMounted = React.useRef(false);
  const { pathname } = useLocation();
  const { cartItems } = useSelector(cartSelector);

  const amountOrders = cartItems.reduce(
    (sum: number, curr: CartItem__TYPE) => sum + curr.amount,
    0
  );
  
// save orders in LocalStorage
  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cartItems);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [amountOrders, cartItems]);

  return (
    <header className={styles.header}>
      <div className={styles.headerMain}>
        <a href="/">
          <img className={styles.logo} src="/images/logo.png" alt="logotype" />
        </a>
        <div>
          <h3 className={styles.title}>Pizza</h3>
          <p>
            Developed by{" "}
            <a
              href="https://github.com/KostinusPraym"
              target="-blank"
              rel="noreferrer"
              style={{ color: "#fe5f1e" }}
            >
              Kostya
            </a>
          </p>
        </div>
      </div>
      {pathname !== "/cart" && (
        <Link to="cart" className={styles.cartElem}>
          <span>{totalPrice(cartItems)} руб.</span>
          <div className={styles.cartButton}>
            <img src="/images/icons/cart.svg" alt="cart" />
            <span className={styles.cartOrderCounter}>{amountOrders}</span>
          </div>
        </Link>
      )}
    </header>
  );
};

export default Header;
