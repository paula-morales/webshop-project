import React from "react";
import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
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
        {cart.length} products in cart
      </nav>
      <Switch>
        <Route path="/cartpage" component={CartPage} />
        <Route exact path="/" component={Homepage} />
        <Route path="/productpage/:id" component={ProductPage} />
      </Switch>
    </div>
  );
}

export default App;
