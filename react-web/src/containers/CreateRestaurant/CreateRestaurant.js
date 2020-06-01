import React, { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./CreateRestaurant.module.css";
import * as restaurantActions from "../../store/actions/restaurants";

const CreateRestaurant = (props) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch();

  const createRestaurantHandler = () => {
    if (name !== "" && desc !== "") {
      dispatch(restaurantActions.createRestaurant(name, desc, props.history));
    }
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>Create New Restaurant</div>
      <div>
        <div className={classes.FormGroup}>
          <div className={classes.Label}>Name</div>
          <div className={classes.ControlDiv}>
            <input
              className={classes.Control}
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
        </div>
        <div className={classes.FormGroup}>
          <div className={classes.Label}>Description</div>
          <div className={classes.ControlDiv}>
            <textarea
              className={classes.Control}
              value={desc}
              rows="6"
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            />
          </div>
        </div>
        <div className={classes.FormGroup}>
          <div className={classes.Label}></div>
          <div className={classes.ControlDiv}>
            <button
              className={classes.Btn}
              type="submit"
              onClick={createRestaurantHandler}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;
