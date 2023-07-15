import { SelectedOptions_TYPE } from "../types/types";

export const sortSelectedOptionsFn = (
  selectedOptions: SelectedOptions_TYPE[]
) => {
  return selectedOptions
    .map((item: SelectedOptions_TYPE) => item.id)
    .sort((a: number, b: number) => a - b)
    .join("");
};
