module.exports = (app) => {
  const restaurant = require('../controllers/restaurant.controller')

  var router = require('express').Router()




  router.get('/', restaurant.findAllRestaurants)
  router.get('/:id', restaurant.findRestaurant)
  router.get('/findDish/:id', restaurant.findDish)
  router.get('/profile/:id', restaurant.fetchPastOrders)
  router.get('/rating',restaurant.findRatings)
  router.post('/rating/:id',restaurant.setRating)
  router.get('/rating/:id',restaurant.findRestRatings)
  router.post('/orders',restaurant.addOrder)
  app.use('/api/restaurants', router)
}