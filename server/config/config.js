const bcrypt = require('bcrypt');

//========================================
//                Port
//========================================
process.env.PORT = process.env.PORT || 3000;


//========================================
//             User Data
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
