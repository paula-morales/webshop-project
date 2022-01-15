import React from "react";
import "./App.scss";
import { Routes, Route, NavLink } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CartPage from "./pages/CartPage";
import { useSelector } from "react-redux";
import { cartSelector } from "./store/cart/selectors";
import "bootstrap-icons/font/bootstrap-icons.css";
function App() {
  const cart = useSelector(cartSelector);

  return (
    <div className="App">
      <nav className="navbar dark">
        <NavLink className="NavLink" to="/">
          Awesome webshop
        </NavLink>
        <NavLink className="NavLink" to="/cartpage">
          {cart.length} products in cart
        </NavLink>
      </nav>
      <Routes>
        <Route path="/cartpage" element={<CartPage />} />
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
