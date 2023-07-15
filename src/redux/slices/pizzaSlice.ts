import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  PizzaItem_TYPE,
  SelectedOptions_TYPE,
  ExtraOptions_TYPE,
  FetchPizzaArgs_TYPE,
} from "../../types/types";

export const fetchPizza = createAsyncThunk<
  PizzaItem_TYPE[],
  FetchPizzaArgs_TYPE
>(
  "pizza/fetchPizza",
  async ({ category, options, search, currentPage }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://64984a0d9543ce0f49e1d8b9.mockapi.io/pizza?${search}&page=${currentPage}&limit=12&${category}${options}`
      );

      if (res.statusText) return res.data;
      else new Error();
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error,",
}

interface pizzaSliceState {
  items: PizzaItem_TYPE[];
  doughArr: string[];
  status: Status;
  selectedOptions: SelectedOptions_TYPE[];
  extraOptions: ExtraOptions_TYPE[];
  IdCard: string;
  mobileMenu: boolean;
}

const initialState: pizzaSliceState = {
  items: [],
  doughArr: ["Тонкое", "Традиционное"],
  status: Status.LOADING, // loading | success | error
  selectedOptions: [],
  extraOptions: [
    {
      id: 1,
      title: "Огурчики",
      price: 20,
      img: "/images/extraOptions/cucumbers.png",
      active: false,
    },
    {
      id: 2,
      title: "Красный лук",
      price: 20,
      img: "/images/extraOptions/red-onion.png",
      active: false,
    },
    {
      id: 3,
      title: "Моцарелла",
      price: 30,
      img: "/images/extraOptions/mozzarella.png",
      active: false,
    },
    {
      id: 4,
      title: "Острый халапеньо",
      price: 20,
      img: "/images/extraOptions/jalapeno.png",
      active: false,
    },
    {
      id: 5,
      title: "Томаты",
      price: 20,
      img: "/images/extraOptions/tomato.png",
      active: false,
    },
    {
      id: 6,
      title: "Ананасы",
      price: 30,
      img: "/images/extraOptions/pineapple.png",
      active: false,
    },
  ],
  IdCard: "",
  mobileMenu: false,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setSelectedOptions(state, action: PayloadAction<SelectedOptions_TYPE>) {
      const index = action.payload.index;
      state.extraOptions[index].active = !state.extraOptions[index].active;

      const someObj = state.selectedOptions.some(
        (item) => item.id === action.payload.id
      );
      if (!someObj) state.selectedOptions.push(action.payload);
      else
        state.selectedOptions = state.selectedOptions.filter(
          (item) => item.id !== action.payload.id
        );
    },
    setIdCard(state, action: PayloadAction<string>) {
      state.IdCard = action.payload
    },
    setMobileMenu(state, action: PayloadAction<boolean>){
      state.mobileMenu = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(
      fetchPizza.fulfilled,
      (state, action: PayloadAction<PizzaItem_TYPE[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});
export const pizzaSelector = (state: RootState) => state.pizza;
export default pizzaSlice.reducer;
export const { setSelectedOptions, setIdCard, setMobileMenu } = pizzaSlice.actions;
