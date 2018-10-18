const Model = require('../models/user.model');

exports.list = function (req, res) {
	let handle = function (err, models) {
        if (err) return next(err);
        res.send(models);
    };
	
	if (req.query.limit) {
		Model.find(handle).limit(parseInt(req.query.limit));
	} else {
		Model.find(handle);
	}
};

exports.show = function (req, res) {
	Model.findById(req.params.id, function (err, model) {
        if (err) return next(err);
        res.send(model);
    })
};

exports.create = function (req, res) {
    let user = new Model(req.body.model);

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send(user);
    })
};

exports.update = function (req, res) {
	Model.findByIdAndUpdate(req.params.id, {$set: req.body.model}, function (err, model) {
        if (err) return next(err);
        res.send(model);
    });
};

exports.delete = function (req, res) {
	Model.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send(req.params.id);
    })
};