const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

const app = express();

//config
const dbConfig = require('./config/db');
const jwtConfig = require('./config/jwt');

//setup mongodb conntection
const mongoose = require('mongoose');
let dev_db_url = dbConfig.DB;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//declare libs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(jwt({ secret: jwtConfig.SECRET}).unless({
	path: [
		'/auth/login',
		'/auth/register',
		'/auth/resetpassword',
		
		{ url: '/contactmessage', methods: ['POST']  }
		
		//{ url: '/user', methods: ['GET', 'PUT', 'POST', 'DELETE']  } //open for testing purpose
	]
}));

//import routes
const auth = require('./routes/auth.route');
const user = require('./routes/user.route');
const contactMessage = require('./routes/contactmessage.route');


//declare routes
app.use('/auth', auth);
app.use('/user', user);
app.use('/contactmessage', contactMessage);



let port = 4000;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});