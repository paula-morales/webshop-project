import React from "react";
import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CartPage from "./pages/CartPage";
import { useSelector } from "react-redux";
import { cartSelector } from "./store/cart/selectors";

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
      <Switch>
        <Route path="/cartpage" component={CartPage} />
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
