import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./RestaurantList.module.css";
import * as restaurantActions from "../../store/actions/restaurants";

const RestaurantsList = (props) => {
  const restaurantsList = useSelector((state) => state.restaurants.restaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect to LoadRestaurants");
    dispatch(restaurantActions.loadRestaurants());
  }, [dispatch]);

  const createClickHandler = () => {
    props.history.push("create");
  };

  const deleteClickHandler = (restaurant) => {
    dispatch(restaurantActions.deleteRestaurant(restaurant.id));
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>List of Restaurants</div>
      <div className={classes.CreateDiv}>
        <button
          type="submit"
          className={classes.Btn}
          onClick={createClickHandler}
        >
          Create
        </button>
      </div>
      <div className={classes.List}>
        {restaurantsList.length === 0 && (
          <div className={classes.NoListText}>No Restaurants Created</div>
        )}
        {restaurantsList.map((restaurant) => (
          <div key={restaurant.id} className={classes.Item}>
            <div>{restaurant.name}</div>
            <div>
              <button
                type="submit"
                className={classes.Btn}
                onClick={() => {
                  deleteClickHandler(restaurant);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsList;
