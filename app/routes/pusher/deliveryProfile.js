var express = require('express');
var router = express.Router();
const History = require(process.cwd()+'/app/models/deliveryExecutive/history');
/* GET users listing. */

router.get('/history/:id', function (req, res, next) {
    
    History.findAll({
        where: {deliveryUserID: req.params.id}
    })
    .then(result => {
        res.json(result);
    })
    .catch((error) => {
        console.log(error);
        res.end('error');
    });
});

module.exports = router;
