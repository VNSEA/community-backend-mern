const Model = require('../models/user.model');
const jwtWebToken = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

exports.login = function (req, res) {
	let requestModel = req.body.model;
	if (requestModel) {
		Model.findOne({email: requestModel.email, password: requestModel.password}, function (err, model) {
	        if (err) return next(err);
	        
	        if (model) {
		        delete model.password;
		        let token = jwtWebToken.sign(JSON.stringify(model), jwtConfig.SECRET);
		        
		        res.send({
		        	success: true,
		        	token: token
		        });
	        } else {
	        	res.send({
	        		success: false,
	        	});
	        }
	    })
	} else {
		res.send({
			success: false
		});
	}
};

exports.register = function (req, res) {
    let user = new Model(req.body.model);

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        
        res.send({
        	success: true
        });
    })
};

exports.resetPassword = function (req, res) {
};