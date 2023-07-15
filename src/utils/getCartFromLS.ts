export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  
  if (data) return JSON.parse(data);
  else return [];
};
