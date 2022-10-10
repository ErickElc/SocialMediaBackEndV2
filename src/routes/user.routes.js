const express = require("express");
const userController = require("../controllers/userController");

// RF 01 - 08 

const router = express.Router();



router.get("/", (req, res)=>{
        res.status(200).send("Bem vindo há api!");
    })
    .get('/users/all', userController.listAllUsers) //RF (13)
    .get('/users/:id', userController.listOneUser) // RF (04)
    .post('/users/cadastrar', userController.registerUser) // RF (01)
    .post('/users/login', userController.loginUser) // RF (02)
    .put('/users/habilitar', userController.habilitarPerfil) // RF (06)
    .put('/users/recover/password', userController.recoverPassword) // RF (03)
    .put('/users/update/:id', userController.editUserData) // RF (05)
    .delete('/users/remove/:id', userController.deleteUser) // RF (07)

module.exports = router;
