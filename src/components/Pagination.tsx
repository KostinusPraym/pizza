import React from "react";
import ReactPaginate from "react-paginate";
import { setCurrentPage } from "../redux/slices/filterSlice";
import { useDispatch } from "react-redux";
import {Pagination_TYPE} from "../types/types"

import styles from "../styles/Pagination.module.scss";

type PaginationProps = Pagination_TYPE

const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
  const dispatch = useDispatch()

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="&#8594;"
      previousLabel="&#8592;"
      onPageChange={event => dispatch(setCurrentPage({value: event.selected + 1}))}
      pageRangeDisplayed={12}
      pageCount={3}
      renderOnZeroPageCount={null}
      className={styles.root}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
