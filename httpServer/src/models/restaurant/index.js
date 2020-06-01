const db  = require('../../config');

const getRestaurants = `SELECT id, name, description FROM restaurant`;
const createRestaurant = ({ name, description }) => `INSERT INTO restaurant (name, description) VALUES( '${name}',	'${description}')`;
const deleteRestaurant = (id) => `DELETE FROM restaurant WHERE ID = ${id}`;

const restaurant = {

    /**
     * For getting all restaurants information
     * 
     * @return {Array} List of restaurant info objects
     */
    get: async () => {
      return new Promise((resolve, reject) => {
        db.all(getRestaurants, [], (err, data) => {
          if (err) {
            console.log('Fetching restaurants info method failed', err.message);
            reject({
              message: 'Failed to get restaurants',
              err 
            });
          } else{
            resolve(data);
          }
        });
      })
    },

    /**
     * To create a new retaurant 
     * 
     * @param {object} data - new restaurant information
     * @return {Array} List of restaurant info objects
     */
    post: (newRestaurantInfo) => {
      return new Promise((resolve, reject) => {
        db.run(createRestaurant(newRestaurantInfo), [], (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      })
    },

    /**
     * TO delete a restaurant
     * 
     * @param object {id} restaurant id which we want to delete
     * @return Promise - deletion status
     */
    delete: ({ id, ...rest }) => {
      return new Promise((resolve, reject) => {
        if(!id) {
          reject({
            code: 404,
            message: "Id - Can't be Empty"
          })
        } else {
          db.all(deleteRestaurant(id), [], (err) => {
            if (err) {
              console.log('Restaurant Can not be deleted', err.message);
              reject(err);
            }
            resolve(id);
          });
        }
      });
    }
}

module.exports = restaurant;