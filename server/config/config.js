const bcrypt = require('bcrypt');

//========================================
//                Port
//========================================
process.env.PORT = process.env.PORT || 3000;


//========================================
//                JsonWebToken
//========================================
process.env.TOKEN_EXPIRATION_TIME = 60*60*24; // Expires in 24 hs
process.env.SECRET = process.env.SECRET || "EurekaLabsChallenge";

//========================================
//    User Data (for testing pourpuse)
//========================================
let user = {
    id: "007",
    name: "Gustavo",
    email: "consugus@gmail.com",
    password: bcrypt.hashSync( "123456", 10 )
};
let users = [];
users.push(user);


module.exports = { users };
