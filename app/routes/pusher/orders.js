var express = require('express');
var router = express.Router();
const db = require('../../models')
const nodemailer = require("nodemailer");
const History = db.History;

function findDeliveryPerson(users, oid) {
	// considering users sorted according to distance.
	// Apply sorting on users here.

	return users.find(user => !user.rejectList.includes(oid))

}
router.post('/', function (req, res, next) {

	const pusher = req.app.get('pusher');
	var users = req.app.get('users');
	var delivery = users[0];

	if (delivery !== undefined) {

		pusher.trigger(delivery.channel, 'order-event', req.body);
		res.send('wait');
	}
	else {

		pusher.trigger(req.app.get('currentCustomer'), 'not_availabel', 'sorry');
		res.send('DE Not Availabel !')
	}
});
router.post('/accept', (req, res, next) => {

	var currentCustomer = req.app.get('currentCustomer');
	const pusher = req.app.get('pusher');
	var DEName = req.body.name;
	var users = req.app.get('users');
	pusher.trigger(currentCustomer, 'order-accepted', DEName);

	res.send('On the way');
});

router.post('/pickup', (req, res, next) => {

	const pusher = req.app.get('pusher');

	// Trigger event to user-(specific) to notify order is accepted.
	pusher.trigger(req.app.get('currentCustomer'), 'order-pickup', 'hi pickup done');
	res.send('On the way');
});

router.post('/reject', (req, res, next) => {
	const pusher = req.app.get('pusher');

	// Adding orderId in reject List.
	var dId = req.body.dId;
	var users = req.app.get('users');
	const index = req.app.get('users').findIndex(t => t.channel === dId);
	req.app.get('users')[index].rejectList.push(req.body.orderInfo.uniqueId);
	var delivery = findDeliveryPerson(users, req.body.orderInfo.uniqueId);

	if (delivery !== undefined) {

		pusher.trigger(delivery.channel, 'order-event', req.body.orderInfo);
		res.send('wait');
	}
	else {
		pusher.trigger(req.app.get('currentCustomer'), 'not_availabel', 'sorry');
		res.send('DE Not Availabel !')
	}

})
router.post('/delivered', (req, res, next) => {

	const pusher = req.app.get('pusher');
	var currentCustomer = req.app.get('currentCustomer');

	History.create({
		deliveryUserID: req.body.dId,
		orderId: req.body.orderInfo.uniqueId,
		//userId: req.body.orderInfo.userId,
		userName: req.body.orderInfo.username,
		userAddress: req.body.orderInfo.userAddress,
		restName: req.body.orderInfo.restName,
		restAddress: req.body.orderInfo.restAddress,
	})
		.then((data) => {
			pusher.trigger(currentCustomer, 'order-delivered', req.body);
			//main(req.body);
			res.json(data);
		})
		.catch((error) => {
			console.log(error)
			res.end('Fail to record order');
		});
});

router.post('/disconnect', (req, res, next) => {
	var dId = req.body.dId;
	var users = req.app.get('users');


	// Deleting disconnected user from active list.
	users.splice(users.findIndex(user => user.channel == dId), 1)
	res.send('logout');
});

async function main(data) {

	const dishes = data.orderInfo.dishes.map(item => {
		return(
			`<li>${item.dishName} x ${item.quantity} price: ${item.price}</li>`
		);
	})
	const output = `
	<h2>You order summary</h2>
	<p>Restaurant Name: ${data.orderInfo.restName}</p>
	<h5>List of items</h5>
	<ul>
		${dishes}
	</ul>
	<h3>Total: ${data.orderInfo.total}</h3>
	<p>Thank you for using our app. </p>
`;


	let transporter = nodemailer.createTransport({
		host: "172.27.172.202",
		port: 25,
		secure: false, // true for 465, false for other ports
		auth: {
			user: 'CEL@evolvingsols.com', // generated ethereal user
			pass: 'Gmail#@5689', // generated ethereal password
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Foodiezz" CEL@evolvingsols.com', // sender address
		to: "kiranjag@cybage.com", // list of receivers
		subject: `Foodiezz-${data.orderInfo.uniqueId}`, // Subject line
		text: "Hello world?", // plain text body
		html: output, // html body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


}
module.exports = router;
