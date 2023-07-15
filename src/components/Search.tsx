import React from "react";
import "../styles/Search.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { filterSelector, setTextForInput } from "../redux/slices/filterSlice";
import {PizzaCollection_TYPE} from "../types/types"

type SearchProps = PizzaCollection_TYPE

const Search: React.FC<SearchProps> = ({ searchDelay }) => {
  const dispatch = useDispatch()
  const {textForInput} = useSelector(filterSelector)
  
  const onChangeInput = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTextForInput(event.target.value))
    searchDelay(event.target.value);
  },[])
  
  return (
    <div>
      <input
        value={textForInput}
        onChange={(event) => onChangeInput(event)}
        type="text"
        placeholder="Искать по названию"
      />
    </div>
  );
};

export default Search;
