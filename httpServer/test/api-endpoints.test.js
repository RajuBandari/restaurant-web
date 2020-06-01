"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const server = require('..');

const difference = (a, b) => a.filter(x => !b.includes(x));

// Expected data
const restaurants = [
  {
    id: 1,
    name: "Fairouz",
    description: "Fairouz is an upscale, casual restaurant that showcases the ingredients, flavours, and recipes of authentic Middle Eastern cuisine. The environment is service-focused with elegant and modern touches.. The pita bread is also made fresh to order to guarantee the finest quality of fare. Fairouz prides itself on relationships with local farms and purveyors, which provide the restaurant with the freshest of ingredients."
  },
  {
    id: 2,
    name: "Fauna",
    description: "A lot of love went into designing the space. They spent 2 years designing, sourcing products, and renovating 425 Bank Street. They wanted to take the concept of using sustainable and local products into the design as well. They have worked with some amazing professionals, vendors, and producers including Linebox Studios who designed the space, Inter_ex our General Contractor, Interversion in Montreal who made all of the tables and banquette (in Drummondville, Quebec), the Modern Shop on Sussex who helped with their lights and downstairs tables, a Modern Space on Wellington helped them with their amazingly comfortable chairs and bar stools, Gusto Metalworks, who built their beautiful Zinc bar and Le Collectif Design who did an amazing job with their icons and branding. There are a ton of talented people around them and they have loved working with them to make fauna what it is. They also have a private room that is available and can seat 20 people"
  },
  {
    id: 3,
    name: "Rabbit Hole",
    description: "Housed in a 122-year-old building in the heart of Centretown, Rabbit Hole proudly serve up the city’s most creative cocktails in our modern yet historical venue.\nUpstairs, enjoy a hand-crafted libation from one of their talented mixologists, paired with fresh oysters served on the half-shell.  Downstairs, their intimate dining experience awaits as the original exposed stone walls provide the backdrop to this iconic space. Contemplate the existential circumstances of life or simply dine with a group of friends in one of their cozy booths alongside another full-serve bar."
  },
  {
    id: 4,
    name: "Lee",
    description: "Lee is a culinary destination, an irresistible combination of sensory pleasures. International Chef Susur Lee has devised a delectable palette of sharing style dishes, balancing the epicurean traditions of Asia with classical techniques of French cuisine."
  },
  {
    id: 5,
    name: "Montecito",
    description: "The restaurants' Farm-To-Table inspired California cuisine menu changes seasonally and highlights the very best in Canadian produce, meats, and seafood from both local purveyors as well as notable Canadian suppliers from coast to coast. Our bar features classic as well as craft cocktails using the finest in artisan spirits, mixers and seasonal fruits and vegetables. Our comprehensive wine list highlights producers and artisan winemakers from afar."
  }
];

// chai - API requests
const APIs = {
  get: () => {
    return new Promise((resolve, reject) => {
      chai.request(server)
        .get('/restaurants')
        .end((err, res) => {
            if(err) {
              reject(err);
            } else {
              resolve(res);
            }
        });
    });
  },

  post: (reqData) => {
    return new Promise((resolve, reject) => {
      chai.request(server)
        .post('/restaurants')
        .send(reqData)
        .end((err, res) => {
            if(err) {
              reject(err);
            } else {
              resolve(res);
            }
        });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      chai.request(server)
        .delete(`/restaurants/${id}`)
        .end((err, res) => {
            if(err) {
              reject(err);
            } else {
              resolve(res);
            }
        });
    });
  }
}

//test cases
describe('API - restaurants endpoints', () => {

  describe('Valid: success cases', () => {

    let restaurantIds;
    let newRestaurantId;

    it('GET /restaurants', async() => {
      const {
        status,
        body: {
          message,
          data
        }
      } = await APIs.get();
      status.should.be.eql(200);
      message.should.be.eql("Request successful");
      data.should.be.eql(restaurants);
      restaurantIds = new Set(data.map(({ id }) => id ));
    });

    it('POST /restaurants ', async() => {
      const {
        status,
        body: {
          message
        }
      } = await APIs.post({
        name: 'Aahar',
        description: "Indian restaurant located in churchill avenue."
      });

      status.should.be.eql(201);
      message.should.be.eql("Request successful");

      const {
        status: getStatus,
        body: {
          data: restaurantData
        }
      } = await APIs.get();
      getStatus.should.be.eql(200);
      const newRestaurantIds = new Set(restaurantData.map(({ id }) => id ));
      newRestaurantId = difference([...newRestaurantIds], [...restaurantIds]);
    });

    it('DELETE /restaurants/{id} ', async() => {
      const {
        status,
        body: {
          message
        }
      } = await APIs.delete(newRestaurantId);
      status.should.be.eql(200);
      message.should.be.eql("Request successful");
    });

  });

  describe('Invalid: error cases', () => {

    it('400: POST /restaurants -Invalid restaurant', async() => {
      const {
        status,
        body: {
          message
        }
      } = await APIs.post({
        name: 'AatestNamehar',
      });

      status.should.be.eql(400);
    });
    
    it('404: DELETE /restaurants/:{invalidId}', async() => {
      const {
        status,
        body: {
          message
        }
      } = await APIs.delete(-999);
      
      status.should.be.eql(404);
    });
  });
});