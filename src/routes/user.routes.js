const express = require("express");
const userController = require("../controllers/userController");



const router = express.Router();



router.get("/", (req, res)=>{
        res.status(200).send("Bem vindo há api!");
    })
    .get('/users/user/:id', userController.listOneUser)
    .post('/users/user-data', userController.UserData)
    .post('/users/cadastrar', userController.registerUser)
    .post('/users/login', userController.loginUser);

module.exports = router;
