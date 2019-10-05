const express = require('express');
const app = express();


// ================================================
//                     ROUTES
// ================================================
app.use( require('./user-routes') );
app.use( require('./alpha-vantage-routes') );
app.use( require('./login-routes') );






module.exports = app;