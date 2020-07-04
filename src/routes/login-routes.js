const express = require( 'express' );
const bcrypt = require( 'bcrypt' );
const { users } = require( '../config/config' );
const app = express();
const _ = require( 'underscore' );
const jwt = require( 'jsonwebtoken' );


// ================================================
//                      Login
// ================================================

app.post( '/login', ( req, res ) => {
    const body = req.body, emailValid = false;

    const len = users.length
    for(let i = 0 ; i < len; i++){
        if( users[ i ].email === body.email ){
            emailValid = true;
            user = users[ i ];
        }
    }

    if( !emailValid ){
        res.status( 400 ).json({
            ok: false,
            message: `${ body.email } is not registered`
        });
    } else {
        if( !bcrypt.compareSync( body.password, user.password )){
            return res.status( 400 ).json({
                ok: false,
                message: "Incorrect password "
            });
        }

        let token = jwt.sign( _.pick( user, "id", "name", "email" ), process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
        res.status( 200 ).json({
            ok: true,
            email: body.email,
            user: _.pick( user, "id", "name", "email" ),
            token
        });
    }


});


module.exports= app;