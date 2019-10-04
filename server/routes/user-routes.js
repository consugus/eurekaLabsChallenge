const express = require('express');
const app = express();
const { users } = require('../config/config');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const _ = require('underscore');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json


// =======================================
//       Devolver todos los usuarios
// =======================================
app.get( '/usuario', (req, res) => {

    let tmp = [];
    for( let i = 0 ; i < users.length ; i++ ){

        tmp.push({
            id: users[i].id,
            name: users[i].name,
            email: users[i].email
        });
    }

    res.json({
        message: "get usuarios",
        users: tmp
    });
});


// =======================================
//    Devolver un usuario, dado un ID
// =======================================
app.get('/usuario/:id', (req, res) => {

    let id = req.params.id;

    let user = new User();
    for (let i = 0 ; i < users.length ; i++){
        if( users[i].id === id ){
            user = _.pick(users[i], "id", "name", "email");

            res.json({
                message: "get usuarios by id",
                user
            });

        } else {
            res.json({
                message: "get usuarios by id",
                error: "No se ingresó un id válido"
            });
        }
    }

});


// =======================================
//       Agregar un usuario a la BD
// =======================================
app.post( '/usuario', (req, res) => {
    let body = req.body;
    let passwordHashed = bcrypt.hashSync(body.password, 10);
    let uniqueEmail = true;

    if( body.name && body.email && body.password ){

        for (let i = 0 ; i < users.length ; i++){
            if( users[i].email === body.email ){
                uniqueEmail = false;
            }
        }

        if (uniqueEmail) {

            let user = new User({
                name: body.name,
                email: body.email,
                password: passwordHashed
            });

            users.push(user);
            res.json({
                message: "post usuarios",
                user: _.pick(user, "id", "name", "email")
            });

        } else {
            res.json({
                message: "get usuarios by id",
                error: `Ya existe el email ${body.email} cargado`
            });
        }

    } else {
        res.json({
            message: "get usuarios by id",
            error: "El nombre, email y el password son obligatorios"
        });
    }

});


// =======================================
// Actualizar la información de un Usuario
// =======================================
app.put( '/usuario/:id', (req, res) => {
    let body = req.body;
    let id = req.params.id;
    let validUser = false;

    if( body.name && body.email && body.password ){

        passwordHashed = bcrypt.hashSync(body.password, 10);
        let user = new User();

        for( let i = 0 ; i < users.length ; i++ ){
            if( users[i].id === id ){

                users[i].name = body.name;
                users[i].email = body.email;
                users[i].password = passwordHashed;
                user = users[i];
                console.log(`usuario actualizado, ${JSON.stringify(user)}`);

                res.json({
                    message: "Actualizar usuario",
                    user: _.pick(user, "id", "name", "email")
                });
                validUser = true;
            }
        }

        if(!validUser){
            res.json({
                message: "Actualizar usuario",
                error: `El id ${id} no corresponde a un usuario válido`
            });
        }

    } else {
        res.json({
            message: "Actualizar usuario",
            error: "El nombre, email y el password son obligatorios"
        });
    }
});


// =======================================
//    Eliminado de un usuario
// =======================================
app.delete( '/usuario/:id', (req, res) => {

    let id = req.params.id;
    let validUser = false;

    let user = new User();
    for(let i = 0 ; i < users.length ; i++){
        if( users[i].id === id ){
            user = users[i];
            users.splice(i, 1);
            console.log(`usuario id: ${id} eliminado`);
            validUser = true;
        }
    }

    if(validUser){
        res.json({
            message: "delete usuarios",
            user: _.pick(user, "id", "name", "email")
        });
    } else {
        res.json({
            message: "Actualizar usuario",
            error: `El id ${id} no corresponde a un usuario válido`
        });
    }
});






module.exports = app;