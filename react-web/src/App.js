import React from "react";

import { Route, Switch } from "react-router-dom";

import "./App.css";
import RestaurantList from "./containers/RestaurantsList/RestaurantsList";
import CreateRestaurant from "./containers/CreateRestaurant/CreateRestaurant";

function App() {
  return (
    <div>
      {/* className="App" */}
      <Switch>
        <Route path="/" exact component={RestaurantList} />
        <Route path="/create" exact component={CreateRestaurant} />
      </Switch>
    </div>
  );
}

export default App;
