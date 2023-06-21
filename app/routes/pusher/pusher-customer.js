var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/auth', function(req, res, next) {

  const pusher = req.app.get('pusher');
  var currentCustomer = req.app.get('currentCustomer');
  const socketId = req.body.socket_id;
  
  const channel = req.body.channel_name;
  const presenseData = {
    user_id: socketId,
    name: "Kiran",
  };

  const auth = pusher.authenticate(socketId, channel, presenseData);
  req.app.set('currentCustomer',channel)
  //currentCustomer = channel;
  console.log('user ',req.app.get('currentCustomer'))
  
  res.send(auth);
});

module.exports = router;
