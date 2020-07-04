require( './config/config' );
const colors = require( 'colors' );
const express = require( 'express' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const app = express();

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );


// ================================================
//                    Routes
// ================================================

app.use( require( './routes/routes' ) );



app.listen(process.env.PORT, () => {
    console.log( `Listening at ${ process.env.PORT }`.cyan );
});