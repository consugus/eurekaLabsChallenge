const express = require( 'express' );
const app = express();


// ================================================
//                     ROUTES
// ================================================

app.use ( require( './login-routes' ) );
app.use ( require( './items-routes' ) );







module.exports = app;