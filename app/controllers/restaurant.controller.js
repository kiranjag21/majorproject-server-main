const { response } = require('express');
const db = require('../models')
const Reastaurant = db.restaurant;
const Rating = db.Rating;
const Dish = db.dish;
const Op = db.Sequelize.Op
const order_placed = db.order_placed;
exports.findRatings = (req, res) => {
  Rating.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving restaurant.',
      })
    })
}


exports.findRestaurant = (req, res) => {
  let id = req.params.id
  Reastaurant
    .findOne({ where: { restId: id } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log('Error while find restaurant : ', err)
    })
}

exports.findAllRestaurants = (req, res) => {
  Reastaurant.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving restaurant.',
      })
    })
}
exports.findDish = (req, res) => {
  let id = req.params.id

  Dish
    .findAll({ where: { restId: id } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log('Error while find dishes : ', err)
    })
}


exports.fetchPastOrders = (req, res) => {
  let userId = req.params.id

  order_placed.findAll({
    where: { userId: userId }
  })
    .then(data => {
      res.send(data);
    })
    .catch((err) => {
      console.log('Error while find user : ', err)
    })
}
exports.addOrder = (req, res) => {
  console.log(req.body);

  order_placed.create({ orderId: req.body.orderInfo.uniqueId, deliveryUserId: req.body.dId, deliveryUserName: req.body.name, restId: req.body.orderInfo.restId, restName: req.body.orderInfo.restName, restAddress: req.body.orderInfo.restAddress, userId: req.body.orderInfo.userId, userAddress: req.body.orderInfo.userAddress, total: req.body.orderInfo.total, dishes: JSON.stringify(req.body.orderInfo.dishes) })
    .then(response1 => {
      res.send(response1);
    })
    .catch(error => console.log(error))

}

exports.setRating = (req, res) => {
  let restId = req.params.id
  console.log(req.body);

  Rating.create({ restId: restId, userId: req.body.userId, ratings: req.body.rating })
    .then(response1 => {
      res.send(response1);
    })
    .catch(error => console.log(error))

}

exports.findRestRatings=(req,res) => {
  let id = req.params.id
  Rating.findOne({ where: { restId: id } })
  .then((data)=>{
    res.send(data)
    console.log(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving restaurant\'s rating.',
      })
  })
}