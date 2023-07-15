import qs from "qs";
import React from "react";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { SortOption_TYPE } from "../types/types";

import { Status, fetchPizza, pizzaSelector, setMobileMenu } from "../redux/slices/pizzaSlice";
import {
  filterSelector,
  setFilters,
  setTextForSearch,
} from "../redux/slices/filterSlice";

import Sort from "../components/Sort";
import Error from "../components/Error";
import Pagination from "../components/Pagination";
import Navigation from "../components/Navigation";
import PizzaCollection from "../components/PizzaCollection";
import Overlay from "../components/Overlay";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { status, mobileMenu } = useSelector(pizzaSelector);
  const {
    categoryIndex,
    currentPage,
    sortOptions,
    SORT_OPTIONS,
    textForSearch,
  } = useSelector(filterSelector);

  const searchDelay = React.useCallback(
    debounce((str: string) => {
      dispatch(setTextForSearch(str));
    }, 350),
    [debounce]
  );

  // //get data with query string
  React.useEffect(() => {
    if (window.location.search) {
      const parseString = qs.parse(window.location.search.substring(1));
      const select = SORT_OPTIONS.find(
        (item: SortOption_TYPE) => item.propertyValue === parseString.options
      );
      dispatch(setFilters({ ...parseString, select }));
      isSearch.current = true;
    }
  }, [SORT_OPTIONS, dispatch]);

  // //get data
  React.useEffect(() => {
    if (!isSearch.current) getPizza();
    isSearch.current = false;
  }, [categoryIndex, sortOptions, currentPage, textForSearch]);

  //set query string
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        page: currentPage,
        category: categoryIndex,
        options: sortOptions.propertyValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryIndex, sortOptions, currentPage, textForSearch, navigate]);

  async function getPizza() {
    const category = categoryIndex ? `category=${categoryIndex}&` : "";
    const options = `sortBy=${sortOptions.propertyValue}&order=desc`;
    const search = textForSearch ? `search=${textForSearch}` : "";

    dispatch(
      fetchPizza({
        category,
        options,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  }

  const showMenuMobile = () => {
    dispatch(setMobileMenu(!mobileMenu))
  };

  if (status === Status.ERROR) return <Error />;
  return (
    <>
      {mobileMenu ? <Overlay showMenuMobile={showMenuMobile} /> : ""}
      <div className="homeContainer">
        {mobileMenu ? "" : <Navigation />}
        <Sort />
      </div>
      <PizzaCollection
        showMenuMobile={showMenuMobile}
        searchDelay={searchDelay}
      />
      <Pagination currentPage={currentPage} />
    </>
  );
};

export default Home;
