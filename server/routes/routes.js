const express = require('express');
const app = express();
const { users } = require('../config/config');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const _ = require('underscore');

app.use( require('./user-routes') );
app.use( require('./alpha-vantage-routes') );
app.use( require('./login-routes') );





module.exports = app;