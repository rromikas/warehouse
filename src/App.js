import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./routing/history.jsx";
import ProductsList from "./components/productsList";
import Preview from "./components/preview";
import LandingPage from "./components/landingPage";
import ProductCreation from "./components/productCreation";
import ProductEdition from "./components/productEdition";
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          exact
          path="/products/create"
          component={ProductCreation}
        ></Route>
        <Route exact path="/products/:id" component={Preview}></Route>
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/products/:id/edit" component={ProductEdition} />
      </Switch>
    </Router>
  );
}

export default App;
