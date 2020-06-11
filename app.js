require('dotenv').config();
const mongo = require('./database/config');
const express = require('express');
const app = express();
const user = require('./routes/users');
const admin = require('./routes/admin');
const bodyParser = require('body-parser');


app.use('/user',user);
app.use('/admin',admin);

module.exports = app;


