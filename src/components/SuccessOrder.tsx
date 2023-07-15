import React from "react";
import { CartEmpty_TYPE } from "../types/types";
import styles from "../styles/SuccessOrder.module.scss";

type SuccessOrderProps = CartEmpty_TYPE;

const SuccessOrder: React.FC<SuccessOrderProps> = ({ queryString }) => {
  return (
    <>
      <div className={styles.successOrder}>
        <h2>
          Заказ оформлен<span>😄</span>
        </h2>
        <p>
          С вами скоро свяжутся для уточнения деталей <br />(нет)
        </p>
        <img
          width={300}
          height={300}
          src="/images/successOrder.jpg"
          alt="success Order"
        />
        <a href={`/?${queryString}`}>
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
        </a>
      </div>
    </>
  );
};

export default SuccessOrder;
