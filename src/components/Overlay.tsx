import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Navigation.module.scss";

import {
  filterSelector,
  setCategoryIndex,
  setCurrentPage,
} from "../redux/slices/filterSlice";

type OverlayProps = {
  showMenuMobile: () => void;
};

const Overlay: React.FC<OverlayProps> = ({ showMenuMobile }) => {
  const dispatch = useDispatch();
  const { categories, categoryIndex } = useSelector(filterSelector);

  const clickOnCategory = (index: number) => {
    dispatch(setCategoryIndex({ index }));
    dispatch(setCurrentPage({ value: 1 }));
    showMenuMobile();
  };

  return (
    <div className="overlay">
      <nav>
        <ul className="overlay__container">
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
    </div>
  );
};

export default Overlay;
