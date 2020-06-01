import {
  LOAD_RESTAURANTS,
  CREATE_RESTAURANT,
  DELETE_RESTAURANT,
} from "../actions/restaurants";

const initialState = {
  restaurants: [],
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESTAURANTS:
      return {
        ...state,
        restaurants: action.resList,
      };
    case CREATE_RESTAURANT:
      return state;
    case DELETE_RESTAURANT:
      const restsAfterDelete = state.restaurants.filter(
        (rest) => rest.id !== action.id
      );
      return {
        ...state,
        restaurants: restsAfterDelete,
      };
    default:
      return state;
  }
};

export default restaurantReducer;
