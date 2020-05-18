import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./routing/history.jsx";
import Test from "./components/test";
import ProductsList from "./components/productsList";
import Preview from "./components/preview";
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/products/:id" component={Preview}></Route>
        {/* <Route exact path="/products/create" component={ProductCreation}></Route> */}
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/products/:id/edit" component={Test} />
      </Switch>
    </Router>
  );
}

export default App;
