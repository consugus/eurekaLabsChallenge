const express = require( 'express' );
const app = express();
const { users } = require( '../config/config' );
const _ = require( 'underscore' );
const { tokenVerify } = require( '../middlewares/authentication' );




// ================================================
//                   Get items
// ================================================
app.get( '/items', tokenVerify, ( req, res ) => {
    console.log( "llegó al getItems".green );
});









module.exports = app;