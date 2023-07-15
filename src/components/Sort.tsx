import React from "react";
import styles from "../styles/Sort.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {SortOption_TYPE, M_TYPE} from "../types/types"
import {
  filterSelector,
  setSortOptions,
  setSortBlockVisible,
} from "../redux/slices/filterSlice";

const Sort: React.FC = React.memo(
  () => {
    const dispatch = useDispatch();
    const sortBlockRef = React.useRef<HTMLDivElement>(null);
    const { SORT_OPTIONS, sortOptions, sortBlockVisible } =
    useSelector(filterSelector);
    const changeItem = (index: number) => {
      dispatch(
        setSortOptions({
          propertyValue: SORT_OPTIONS[index].propertyValue,
          name: SORT_OPTIONS[index].name,
        })
      );
      dispatch(setSortBlockVisible(!sortBlockVisible));
    };
    //click outside
    React.useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        const _event = event as M_TYPE
        if (sortBlockRef.current && !_event.composedPath().includes(sortBlockRef.current))
          dispatch(setSortBlockVisible(false));
      };
  
      document.body.addEventListener("click", handleClick);
      return () => document.body.removeEventListener("click", handleClick);
    }, [dispatch]); 
    
    return (
      <div ref={sortBlockRef} className={styles.sortBlock}>
        <b>Сортировка по: </b>
        <span
          onClick={() => dispatch(setSortBlockVisible(!sortBlockVisible))}
          className={styles.currentItem}
        >
          {sortOptions.name}
        </span>
        {sortBlockVisible ? (
          <ul className={styles.itemBlock}>
            {SORT_OPTIONS.map((item:SortOption_TYPE, index: number) => (
              <li onClick={() => changeItem(index)} key={index}>
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    );
  }
)

export default Sort;
