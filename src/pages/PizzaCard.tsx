import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/PizzaCard.module.scss";
import { ExtraOptions_TYPE, PizzaItem_TYPE } from "../types/types";

import Error from "../components/Error";
import PizzaItem from "../components/PizzaItem";
import {
  pizzaSelector,
  setSelectedOptions,
  setIdCard,
} from "../redux/slices/pizzaSlice";

const PizzaCard: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pizza, setPizza] = React.useState<PizzaItem_TYPE>();
  const [error, setError] = React.useState(false);
  const { extraOptions, selectedOptions } = useSelector(pizzaSelector);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://64984a0d9543ce0f49e1d8b9.mockapi.io/pizza/${id}`
        );
        setPizza(data);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
    window.scrollTo(0, 60);
  }, [id]);

  React.useEffect(() => {
    dispatch(setIdCard(String(id)));
  }, [dispatch, id]);

  const handleClick = (index: number) => {
    dispatch(setSelectedOptions({ ...extraOptions[index], index }));
  };

  if (!pizza) return <></>;
  if (error) return <Error />;
  return (
    <div className={styles.pizzaCard}>
      <PizzaItem {...pizza} selectedOptions={selectedOptions} />
      <section className={styles.extraOptions}>
        {extraOptions.map((item: ExtraOptions_TYPE, index: number) => {
          return (
            <div
              onClick={() => handleClick(index)}
              key={item.title}
              className={`${styles.extraOption} ${
                item.active ? styles.active : ""
              }`}
            >
              <img
                className={styles.extraImg}
                width={70}
                height={70}
                src={item.img}
                alt={item.title}
              />
              <div>
                <h3>{item.title}</h3>
                <span>{item.price} руб.</span>
              </div>
              <img
                style={{ cursor: "pointer" }}
                src={
                  item.active
                    ? "/images/icons/done.svg"
                    : "/images/icons/plus.svg"
                }
                alt=""
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default PizzaCard;
