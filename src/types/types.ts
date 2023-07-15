export type SORT_OPTIONS_TYPE = {
  name: string;
  propertyValue: 'rating' | 'price' | 'title';
}

export type SortOption_TYPE = {
  name: string;
  propertyValue: string;
}

export type CartEmpty_TYPE = {
  queryString: string;
}

export type CartItem__TYPE = {
  id: string;
  dough: string;
  title: string;
  imageUrl: string;
  price: number;
  size: number;
  amount: number;
    selectedOptions: {
      title: string;
      img: string;
      id: number;
      price: number;
      active: boolean;
      index: number
    }[] 
}

export type Pagination_TYPE = {
  currentPage: number
}

export type PizzaCollection_TYPE = {
  searchDelay: (value: string) => void
}

export type PizzaItem_TYPE = {
  category?: number;
  id: string;
  imageUrl: string;
  price: number;
  rating?: number;
  sizes: number[];
  title: string;
  types: number[];
  selectedOptions: {
    title: string;
    img: string;
    id: number;
    price: number;
    active: boolean;
    index: number
  }[] 
}

export type M_TYPE = MouseEvent & {
  path: Node[];
}

export type SelectedOptions_TYPE = {
  title: string;
  img: string;
  id: number;
  price: number;
  active: boolean;
  index: number
}

export type ExtraOptions_TYPE = {
  title: string;
  img: string;
  id: number;
  price: number;
  active: boolean;
}

export type ChangeCartItems_TYPE = {
  id: string;
  size: number;
  dough: string;
  selectedOptions:SelectedOptions_TYPE[];
}

export type FetchPizzaArgs_TYPE = {
  category: string,
  options: string;
  search: string;
  currentPage: number;
}

