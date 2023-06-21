module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", users.create);
    router.post("/login",users.f);
    router.get('/user/:id', users.findUser);
    app.use('/api/users', router);

};