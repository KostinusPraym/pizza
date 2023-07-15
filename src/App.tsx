import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import PizzaCard from "./pages/PizzaCard";
import { pizzaSelector } from "./redux/slices/pizzaSlice";

const App = () => {
  const { mobileMenu } = useSelector(pizzaSelector);

  return (
    <div className={`container ${mobileMenu ? "fixed" : ""}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pizza/:id" element={<PizzaCard />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
