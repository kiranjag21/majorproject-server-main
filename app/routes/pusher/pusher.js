var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/auth', function(req, res, next) {

  const pusher = req.app.get('pusher');
  var users = req.app.get('users');
  const socketId = req.body.socket_id;
  
  console.log(socketId);
  const channel = req.body.channel_name;
  console.log('channel-name ', channel)
  const presenseData = {
    user_id: socketId,
    name: "Kiran",
  };

  const auth = pusher.authenticate(socketId, channel, presenseData);

  let user1 = {
    channel: channel,
    busy: 0,
    rejectList: []
  }

  if(users.length == 0) {
    users.push(user1);
  }
  else if(!users.some(user => user.channel == channel) ){
    console.log('hiiii')
    
    users.push(user1);
 }
  console.log('in auth: ', users);
  res.send(auth);
});

module.exports = router;
