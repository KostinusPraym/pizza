import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles/Navigation.module.scss";
import { filterSelector, setCategoryIndex, setCurrentPage } from "../redux/slices/filterSlice";

const Navigation: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const {categories, categoryIndex } = useSelector(filterSelector)

  const clickOnCategory = (index: number) => {
    dispatch(setCategoryIndex({ index }));
    dispatch(setCurrentPage({value: 1}));
  }

  return (
    <nav>
      <ul className={styles.categoryList}>
        {categories.map((item: string, index: number) => {
          return (
            <li
              key={item}
              className={`${styles.categoryItem} ${
                categoryIndex === index ? styles.active : ""
              }`}
              onClick={() => clickOnCategory(index)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </nav>
  );
})

export default Navigation;
