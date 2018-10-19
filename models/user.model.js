const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    full_name: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 20, unique: true},
    password: {type: String, required: true, max: 20},
    avatar: {type: String}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);