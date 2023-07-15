import React from "react";
import styles from "../styles/Error.module.scss";

const Error:React.FC = () => {
  return (
    <section className={styles.error}>
      <h2>Oops</h2>
      <p>
        К сожалению, не удалось получить пиццы. <br /> Попробуйте повторить
        попытку позже.
      </p>
    </section>
  );
};

export default Error;
