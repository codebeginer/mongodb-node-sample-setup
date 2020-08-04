var express = require('express');
var router = express.Router();


router.use('/',function(req, res, next){
	next();
})

router.post('/', function(req, res, next) {

	return new Promise((resolve,reject) => {
		// STEP:1 Validates the parameters received from the client
		helper.validateParameters(['email','password','login_type'],req.body,function(error){
			if(error){
				reject(error);
			}else{
				resolve(req.body);
			}
		})
	})
	.then(body => {
		return new Promise((resolve,reject) => {
			switch (body.login_type) {
				case 'staff':
						var StaffModel = helper.getModel('staffs');
						StaffModel.findOne({
							email:body.email,
							password:helper.password(body.password)
						})
						.then((document) => {
							if(document){
								resolve(document);
							}else{
								reject(lang('AUTHENTICATION_FAILED'));
							}
						})
						.catch(error => {
							reject(error.toString());
						})
					break;
				case 'customer' :
						var UserModel = helper.getModel('users');
						UserModel.findOne({
							email:body.email,
							password:helper.password(body.password)
						})
						.then((document) => {
							if(document){
								resolve(document);
							}else{
								reject(lang('AUTHENTICATION_FAILED'));
							}
						})
						.catch(error => {
							reject(error.toString());
						})
					break;
				default:
					JLog("The login_type parameter which is required got empty value in the API request.")
					reject(lang('BAD_REQUEST'));
					break;
			}
		})
	})
	.then(document => {
		return new Promise((resolve,reject) => {

			// check if the account is active or suspended or user do not have activated it.
			switch (document.status) {
				case 'active':
						resolve(document);
					break;
				case 'registered':
						reject(lang("REQ_ACTIVATION"));
					break;
				case 'suspended':
						reject(lang("ACCOUNT_SUSPENDED"));
				default:
						reject(lang('INTERNAL_SERVER_ERROR'));
					break;
			}
		})
	})
	.then(document => {

		// generate the token and send it to the client side.
		return new Promise((resolve,reject) => {

			var jwt = require('jsonwebtoken');

			var expiresIn = 60*60*60; 
			var token = jwt.sign({ 
				user_id : document._id,
				designation : document.designation,
				access_roles : document.access_roles
			}, config.secrete_key,{expiresIn:expiresIn});
			resolve(token);
		})
	})
	.then(token => {
		res.json({message : 'Authentication successful!',data : {access_token:token}})
	})
	.catch(error => {
		res.json({message : error,data : []});
	})
});

module.exports = router;
