const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PinRouter = require('./Routes/Pin.routes');
const UserRouter = require('./Routes/Users.routes');
const cors = require('cors');

 dotenv.config();
 app.use(express.json());
 app.use(express.urlencoded({extended : false}));
 app.use(cors());

// Routers
app.use('/pin',PinRouter);
app.use('/user',UserRouter)


 module.exports = app;