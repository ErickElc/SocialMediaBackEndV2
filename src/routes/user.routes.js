const express = require("express");
const userController = require("../controllers/userController");



const router = express.Router();



router.get("/", (req, res)=>{
        res.status(200).send("Bem vindo há api!");
    })
    .post('/cadastrar', userController.registerUser)
    .post('/login', userController.loginUser);

module.exports = router;
