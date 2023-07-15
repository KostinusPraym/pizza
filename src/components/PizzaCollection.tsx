import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PizzaCollection_TYPE, PizzaItem_TYPE } from "../types/types";

import { pizzaSelector } from "../redux/slices/pizzaSlice";
import { filterSelector } from "../redux/slices/filterSlice";

import styles from "../styles/PizzaCollection.module.scss";
import PizzaItem from "./PizzaItem";
import Skeleton from "./Skeleton";
import Search from "./Search";

type PizzaCollectionProps = PizzaCollection_TYPE & {
  showMenuMobile: () => void
};

const PizzaCollection: React.FC<PizzaCollectionProps> = ({ searchDelay, showMenuMobile }) => {

  const { status, items: pizzaItems } = useSelector(pizzaSelector);
  const { categoryTitle: title } = useSelector(filterSelector);

  const skeletons = [...Array(12)].map((_, index) => <Skeleton key={index} />);
  const pizza = pizzaItems.map((item: PizzaItem_TYPE) => (
    <Link key={item.id} to={`pizza/${item.id}`}>
      <PizzaItem {...item} />
    </Link>
  ));
  return (
    <div>
      <div className={styles.titleGroup}>
        <h2 onClick={() => showMenuMobile()} className={styles.title}>
          {title}
        </h2>
        <Search searchDelay={searchDelay} />
      </div>
      <main className={styles.pizzaCollections}>
        {status === "loading" ? skeletons : pizza}
      </main>
    </div>
  );
};

export default PizzaCollection;
