// this block refers to creating has of the password
var password = (str = '') => {
	const crypto = require('crypto');

	const secret = config.secrete_key;
	const hash = crypto.createHmac('sha256', secret).update(str).digest('hex');
	return hash;
};


// this block refers to generating the object of the model
var getModel = (name = '') => {
	if(name.trim() == '')
	{
		throw(new Error('Model name is required!'));
	}

	var fs = require('fs');

	const path = require('path');

	if(!fs.existsSync(path.join(__dirname,'../','/models/',name.trim() + '.js'))){
		throw(new Error('No such model exists in the system!'))
	}

	return require(path.join(__dirname,'../','/models/',name.trim()));
}

// this block helpes to check if the parameters are present in the Request or not
var validateParameters = (required_params = [],params = [],cb) => {
	const util = require('util');
	if(required_params.length == 0 || params.length == 0)
	{
		cb(util.format(lang('MISSING_PARAMETERS'),required_params.join(',')))
	}else{
		var mp = [];
		required_params.forEach(el => {

			if(typeof(params[el]) == "undefined"){
				mp.push(el);
			}
		});

		if(mp.length > 0){
			cb(util.format(lang('MISSING_PARAMETERS'),mp.join(',')));
		}else{
			cb(null);
		}
	}
}

module.exports = {password,getModel,validateParameters};
