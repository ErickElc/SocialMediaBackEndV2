const express = require("express");
const userController = require("../controllers/userController");



const router = express.Router();



router.get("/", (req, res)=>{
        res.status(200).send("Bem vindo há api!");
    })
    .get('/users/user/:id', userController.listOneUser)
    .get('/users/all', userController.listAllUsers)
    .post('/users/cadastrar', userController.registerUser)
    .post('/users/login', userController.loginUser)
    .put('/users/recover-password', userController.recoverPassword)
    .put('/users/update/:id', userController.editUserData)
    .put('/users/habilitar', userController.habilitarPerfil)
    .delete('/users/remove/:id', userController.deleteUser)

module.exports = router;
