import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SORT_OPTIONS_TYPE } from "../../types/types";

interface filterSliceState  {
  textForInput: string;
  textForSearch: string;
  sortBlockVisible: boolean;
  sortOptions: {
    propertyValue: string;
    name: string;
  };
  SORT_OPTIONS: SORT_OPTIONS_TYPE[];
  categories: string[];
  categoryIndex: number;
  categoryTitle: string;
  currentPage: number;
}

const initialState : filterSliceState = {
  textForInput: "",
  textForSearch: "",
  sortBlockVisible: false,
  sortOptions: { name: "По популярности", propertyValue: "rating"},
  SORT_OPTIONS: [
    { name: "По популярности", propertyValue: "rating" },
    { name: "По цене", propertyValue: "price" },
    { name: "По алфовиту", propertyValue: "title" },
  ],
  categories: [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ],
  categoryIndex: 0,
  categoryTitle: "Все",
  currentPage: 1,
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryIndex(state, action: PayloadAction<{index: number}>) {
      state.categoryIndex = action.payload.index;
      state.categoryTitle = state.categories[action.payload.index];
    },
    setCurrentPage(state, action:PayloadAction<{value: number}>) {
      state.currentPage = action.payload.value;
    },
    setSortOptions(state,
       action:PayloadAction<{ propertyValue: string; name: string;}>) {
      state.sortOptions = action.payload;
    },
    setSortBlockVisible(state, action:PayloadAction<boolean>) {
      state.sortBlockVisible = action.payload;
    },
    setTextForInput(state, action:PayloadAction<string>) {
      state.textForInput = action.payload;
    },
    setTextForSearch(state, action:PayloadAction<string>) {
      state.textForSearch = action.payload;
    },
    setFilters(state, action) {
      state.sortOptions = action.payload.select;
      state.categoryIndex = Number(action.payload.category);
      state.currentPage = Number(action.payload.page);
      state.categoryTitle = state.categories[action.payload.category];
    },
  },
});


export const filterSelector = (state: RootState) => state.filter;

export const {
  setCategoryIndex,
  setCurrentPage,
  setSortOptions,
  setFilters,
  setSortBlockVisible,
  setTextForInput,
  setTextForSearch,
} = filterSlice.actions;
export default filterSlice.reducer;
