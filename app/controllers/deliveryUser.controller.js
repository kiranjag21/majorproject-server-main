const db = require("../models");
const deliveryuser = db.deliveryuser;
const History = db.History;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const { response } = require("express");
const DeliveryRating = db.DeliveryRating;
// Create and Save a new User
const salt = bcrypt.genSaltSync(10);
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
// async function getAvgratingCust() {
//     const ratings = await db.sequelize.query("select restId, avg(rating) as avgrate from ratings group by restId", { type: QueryTypes.SELECT });
//     return ratings;
// }
// async function getAvgratingDel(id) {
//     const ratings = await db.sequelize.query("select * from deliveryrating", { type: QueryTypes.SELECT });
//     console.log(ratings)
//     return ratings;
// }
exports.addToHistory = (req, res) => {
    History.create({
        deliveryUserID: req.body.dId,
        //orderId: req.body.orderInfo.orderId,
        userName: req.body.orderInfo.username,
        userAddress: req.body.orderInfo.userAddress,
        restName: req.body.orderInfo.restName,
        restAddress: req.body.orderInfo.restAddress,
    })
        .then((data) => {
            //pusher.trigger(currentCustomer, 'order-delivered', data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error)
            res.end('Fail to record order');
        });
    //res.send(req.body);
}
exports.getAvgRateCust = (req, res) => {

    db.sequelize.query(`select a.*, avg(b.rating) as avgrate from restaurant a, ratings b where a.restId=b.restId group by restId`, { type: db.sequelize.QueryTypes.SELECT })
        .then(avgrate => {
            res.send(avgrate)
        }).catch((errors) => {
            res.send(errors);
        });


}
exports.getMonthAvgRating = (req, res) => {

    db.sequelize.query(`select month, avg(rating) as average from deliveryrating where delId=${req.params.id} group by month`, { type: db.sequelize.QueryTypes.SELECT })
        .then(avgrate => {
            res.send(avgrate)
        }).catch((errors) => {
            res.send(errors);
        });


}
exports.rateDelivery = (req, res) => {

    DeliveryRating.create({ dId: req.body.deliveryUserId, userId: req.body.userId, orderId: req.body.orderId, month: new Date().getMonth(), rating: req.body.rating })
        .then(response2 => {
            res.send(response2);
        })
        .catch((errors) => {
            res.end(errors);
        });

}
exports.getAvgRating = (req, res) => {

    db.sequelize.query(`select avg(rating) as avgrate from deliveryrating where delId=${req.params.id}`, { type: db.sequelize.QueryTypes.SELECT })
        .then(avgrate => {
            res.send(avgrate)
        }).catch((errors) => {
            res.send(errors);
        });


}

exports.getDeliveryHistory = (req, res) => {
    History.findAll({
        where: { deliveryUserID: req.params.id }

    })
        .then((data) => {
            //pusher.trigger(currentCustomer, 'order-delivered', data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error)
            res.end('Fail to fetch order');
        });
    //res.send(req.body);
}

exports.create = (req, res) => {
    // Validate request
    console.log(req.body)

    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = {
        Username: req.body.username,
        Address: req.body.address,
        EmailId: req.body.email_id,
        Password: hash,
    };
    console.log(user)
    // Save User in the database
    deliveryuser.create(user)
        .then(data => {
            console.log(data);
            res.send(data);
        })

};


exports.f = async (req, res) => {
    const email_id = req.body.emailId;
    console.log(email_id);
    const pass = req.body.password;
    console.log(pass);
    await deliveryuser.findOne({ where: { EmailId: email_id } }).then(data => {
        console.log(data);
        bcrypt.compare(pass, data.Password, function (err, result) {
            if (result) {
                result == true;
                console.log(result);
                res.send(data);
            }
            else {
                console.log("password dont match");
                console.log(result);
            }
        });

    }
    ).catch(err => {
        if (err) {
            console.log(err);
        }
    })
}
