export const LOAD_RESTAURANTS = "LOAD_RESTAURANTS";
export const CREATE_RESTAURANT = "CREATE_RESTAURANT";
export const DELETE_RESTAURANT = "DELETE_RESTAURANT";

export const loadRestaurants = () => {
  console.log("load Restaurants method");
  return (dispatch) => {
    fetch("http://localhost:5000/restaurants")
      .then((response) => response.json())
      .then((resData) => {
        dispatch({
          type: LOAD_RESTAURANTS,
          resList: resData.data,
        });
      });
  };
};

export const createRestaurant = (name, desc, history) => {
  return (dispatch) => {
    fetch("http://localhost:5000/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: desc,
      }),
    })
      .then((response) => response.json())
      .then((resData) => {
        history.push("/");
        dispatch({
          type: CREATE_RESTAURANT,
        });
      });
  };
};

export const deleteRestaurant = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:5000/restaurants/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        dispatch({
          type: DELETE_RESTAURANT,
          id: id,
        });
      });
  };
};
