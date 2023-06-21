module.exports = app => {
    const users = require("../controllers/deliveryUser.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", users.create);
    router.post("/login",users.f);
    router.post("/history/:id",users.addToHistory);
    router.get("/history/:id",users.getDeliveryHistory);
    router.post('/ratedelivery', users.rateDelivery)
    router.get('/delaverage/:id', users.getAvgRating)
    router.get('/delaverage/:id', users.getAvgRating)
    router.get('/delmonthavg/:id', users.getMonthAvgRating)
    router.get('/avgrating',users.getAvgRateCust)
    app.use('/api/deliveryusers', router);

};