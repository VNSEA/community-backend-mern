const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContactMessageSchema = new Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 20},
    subject: {type: String, required: true, max: 200},
    message: {type: String, required: true, max: 1000}
});


// Export the model
module.exports = mongoose.model('ContactMessage', ContactMessageSchema);