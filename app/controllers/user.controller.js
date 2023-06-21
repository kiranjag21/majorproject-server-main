const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const bcrypt=require('bcrypt');
// Create and Save a new User
const salt = bcrypt.genSaltSync(10);

exports.create= (req, res) => {
   // Validate request
   console.log(req.body)
  //  if (!req.body.username) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }
   const hash = bcrypt.hashSync(req.body.password,salt);
    const user = {
    Username: req.body.username,
    Address:req.body.address,
    EmailId: req.body.email_id,
    Password:hash,
    };
    console.log(user)
  // Save User in the database
     Users.create(user)
    .then(data => {
      console.log(data);
      res.send(data);
    })

};



exports.f=async (req,res)=>{
   const email_id=req.body.emailId;
   console.log(email_id);
   const pass=req.body.password;
   console.log(pass);
  await Users.findOne({ where:{EmailId:email_id}}).then(data=>{
    console.log(data);   
    bcrypt.compare(pass, data.Password, function(err, result) {
        if (result) {
            result == true;
            console.log(result);
            res.send(data);       
        }
        else{
            
            console.log("password dont match");
            console.log(result);
            res.send('fail');
        }
          });
      
}
).catch(err =>{
    if(err)
    {
        console.log(err);
    }
})
}


exports.findUser = (req, res) => {
  let id = req.params.id
  Users.findOne({
    where: { Uid: id}
  })
    .then(data => {
      console.log(data);
      res.send(data);
    })
  .catch(error => {
    console.log(error);
  })
}